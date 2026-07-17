package com.astraflow.project.payment.stripe;


import com.stripe.Stripe;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import com.stripe.model.Event;
import com.stripe.model.PaymentIntent;
import com.stripe.model.Refund;
import com.stripe.net.Webhook;
import com.stripe.param.PaymentIntentCreateParams;
import com.stripe.param.RefundCreateParams;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import com.astraflow.project.dto.request.CreatePaymentIntentRequest;
import com.astraflow.project.dto.response.PaymentIntentResponse;
import com.astraflow.project.model.Client;
import com.astraflow.project.model.Payment;
import com.astraflow.project.model.Plan;
import com.astraflow.project.model.Subscription;
import com.astraflow.project.model.enums.PaymentMethod;
import com.astraflow.project.model.enums.PaymentStatus;
import com.astraflow.project.model.enums.SubscriptionStatus;
import com.astraflow.project.repository.StripePaymentEventLedgerRepository;
import com.astraflow.project.service.ClientService;
import com.astraflow.project.service.PaymentService;
import com.astraflow.project.service.PlanService;
import com.astraflow.project.service.SubscriptionService;

import java.time.LocalDate;

@Service
public class StripePaymentService {

    @Value("${stripe.secret-key}")
    private String secretKey;

    @Value("${stripe.webhook-secret}")
    private String webhookSecret;

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private SubscriptionService subscriptionService;

    @Autowired
    private StripePaymentEventLedgerRepository ledgerRepository;

    @Autowired
    private PlanService planService;

    @Autowired
    private ClientService clientService;

    @PostConstruct
    public void init() {
        Stripe.apiKey = secretKey;
    }

    /**
     * Creates a Stripe PaymentIntent for the given subscription and persists a PENDING
     * Payment record. Returns the client_secret needed by the frontend to confirm payment.
     */
    @Transactional
    public PaymentIntentResponse createPaymentIntent(CreatePaymentIntentRequest request) throws StripeException {
        Plan plan = planService.findById(request.planId())
                .orElseThrow(() -> new IllegalArgumentException("Plan not found: " + request.planId()));
        clientService.findById(request.clientId())
                .orElseThrow(() -> new IllegalArgumentException("Client not found: " + request.clientId()));

        BigDecimal price = plan.getPrice();
        String currency = (request.currency() != null && !request.currency().isBlank())
                ? request.currency().toLowerCase()
                : "usd";
        long amountInCents = price.multiply(BigDecimal.valueOf(100)).longValue();

        Client client = clientService.findById(request.clientId()).orElseThrow(
                () -> new IllegalArgumentException("Client not found: " + request.clientId()));

        String stripeCustomerId = client.getStripeCustomerId();
        if (stripeCustomerId == null) {
            com.stripe.model.Customer customer = com.stripe.model.Customer.create(
                com.stripe.param.CustomerCreateParams.builder()
                    .setEmail(client.getEmail())
                    .setName(client.getFullName())
                    .build()
            );
            stripeCustomerId = customer.getId();
            client.setStripeCustomerId(stripeCustomerId);
            clientService.update(client.getId(), client);
        }

        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount(amountInCents)
                .setCurrency(currency)
                .setCustomer(stripeCustomerId)         // ← attach to customer
                .setSetupFutureUsage(PaymentIntentCreateParams.SetupFutureUsage.OFF_SESSION) // ← save for later
                .putMetadata("planId", plan.getId().toString())
                .putMetadata("clientId", request.clientId().toString())
                .build();

        PaymentIntent paymentIntent = PaymentIntent.create(params);

        Payment payment = Payment.builder()
                .amount(price)
                .currency(currency.toUpperCase())
                .method(PaymentMethod.STRIPE)
                .status(PaymentStatus.PENDING)
                .transactionId(paymentIntent.getId())
                .build();
        paymentService.save(payment);

        return new PaymentIntentResponse(
                paymentIntent.getClientSecret(),
                paymentIntent.getId(),
                price,
                currency.toUpperCase());
    }

    /**
     * Validates the Stripe webhook signature, enforces idempotency via the ledger,
     * then dispatches the event to the appropriate handler.
     */
    @Transactional
    public void handleWebhookEvent(String payload, String sigHeader) {
        Event event;
        try {
            event = Webhook.constructEvent(payload, sigHeader, webhookSecret);
        } catch (SignatureVerificationException e) {
            throw new IllegalArgumentException("Invalid Stripe webhook signature", e);
        }

        // Idempotency guard — skip events already recorded in the ledger
        if (ledgerRepository.existsByStripeEventId(event.getId())) {
            return;
        }

        String status = "SUCCESS";
        try {
            switch (event.getType()) {
                case "payment_intent.succeeded" -> {
                    PaymentIntent pi = deserialize(event, PaymentIntent.class);
                    handlePaymentIntentSucceeded(pi);
                }
                case "payment_intent.payment_failed" -> {
                    PaymentIntent pi = deserialize(event, PaymentIntent.class);
                    handlePaymentIntentFailed(pi);
                }
                case "charge.refunded" -> {
                    Charge charge = deserialize(event, Charge.class);
                    handleChargeRefunded(charge);
                }
                default -> status = "SKIPPED";
            }
        } catch (RuntimeException e) {
            saveEventToLedger(event, payload, "FAILED");
            throw e;
        }

        saveEventToLedger(event, payload, status);
    }

    /**
     * Issues a Stripe refund for the given internal payment ID and marks it REFUNDED.
     */
    @Transactional
    public void refundPayment(UUID paymentId) throws StripeException {
        Payment payment = paymentService.findById(paymentId)
                .orElseThrow(() -> new IllegalArgumentException("Payment not found: " + paymentId));

        if (payment.getTransactionId() == null || payment.getTransactionId().isBlank()) {
            throw new IllegalStateException("Payment has no associated Stripe transaction ID");
        }

        RefundCreateParams params = RefundCreateParams.builder()
                .setPaymentIntent(payment.getTransactionId())
                .build();
        Refund.create(params);

        payment.setStatus(PaymentStatus.REFUNDED);
        paymentService.save(payment);
    }

    // ── Private event handlers ────────────────────────────────────────────────

    private void handlePaymentIntentSucceeded(PaymentIntent pi) {
        
        String planIdStr = pi.getMetadata().get("planId");
        String clientIdStr = pi.getMetadata().get("clientId");
        String subscriptionIdStr = pi.getMetadata().get("subscriptionId");

        if (planIdStr == null || clientIdStr == null) return;

        Plan plan = planService.findById(UUID.fromString(planIdStr)).orElse(null);
        Client client = clientService.findById(UUID.fromString(clientIdStr)).orElse(null);

        if (plan == null || client == null) return;

        if (pi.getPaymentMethod() != null) {
            client.setStripePaymentMethodId(pi.getPaymentMethod());
            clientService.update(client.getId(), client);
        }

        if (subscriptionIdStr != null) {
            // Renewal — extend existing subscription
            subscriptionService.findById(UUID.fromString(subscriptionIdStr)).ifPresent(sub -> {
                sub.setEndDate(sub.getEndDate().plusDays(sub.getPlan().getDurationDays()));
                subscriptionService.save(sub);
            });
            paymentService.findByTransactionId(pi.getId()).ifPresent(payment -> {
                payment.setStatus(PaymentStatus.COMPLETED);
                payment.setPaidAt(LocalDateTime.now());
                paymentService.save(payment);
            });
        } else {
            // First payment — create new subscription
            Subscription subscription = new Subscription();
            subscription.setClient(client);
            subscription.setPlan(plan);
            subscription.setStatus(SubscriptionStatus.ACTIVE);
            subscription.setStartDate(LocalDate.now());
            subscription.setEndDate(LocalDate.now().plusDays(plan.getDurationDays()));
            subscription.setTenant(client.getTenant());
            subscriptionService.save(subscription);

            paymentService.findByTransactionId(pi.getId()).ifPresent(payment -> {
                payment.setSubscription(subscription);
                payment.setStatus(PaymentStatus.COMPLETED);
                payment.setPaidAt(LocalDateTime.now());
                paymentService.save(payment);
            });
        }
    }

    private void handlePaymentIntentFailed(PaymentIntent pi) {
        paymentService.findByTransactionId(pi.getId()).ifPresent(payment -> {
            payment.setStatus(PaymentStatus.FAILED);
            paymentService.save(payment);
        });
    }

    private void handleChargeRefunded(Charge charge) {
        String paymentIntentId = charge.getPaymentIntent();
        if (paymentIntentId != null) {
            paymentService.findByTransactionId(paymentIntentId).ifPresent(payment -> {
                payment.setStatus(PaymentStatus.REFUNDED);
                paymentService.save(payment);
            });
        }
    }

    private void saveEventToLedger(Event event, String payload, String status) {
        String previousHash = ledgerRepository.findTopByOrderByProcessedAtDesc()
                .map(StripePaymentEventLedger::getHash)
                .orElse("GENESIS");
        String hash = computeHash(event.getId(), event.getType(), payload, status, previousHash);
        ledgerRepository.save(StripePaymentEventLedger.builder()
                .stripeEventId(event.getId())
                .eventType(event.getType())
                .payload(payload)
                .processedAt(LocalDateTime.now())
                .status(status)
                .previousHash(previousHash)
                .hash(hash)
                .build());
    }

    private static String computeHash(String stripeEventId, String eventType,
                                      String payload, String status, String previousHash) {
        try {
            String input = stripeEventId + "|" + eventType + "|" + payload + "|" + status + "|" + previousHash;
            byte[] hashBytes = MessageDigest.getInstance("SHA-256")
                    .digest(input.getBytes(StandardCharsets.UTF_8));
            StringBuilder sb = new StringBuilder(64);
            for (byte b : hashBytes) {
                sb.append(String.format("%02x", b));
            }
            return sb.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException("SHA-256 not available", e);
        }
    }

    /**
     * Walks every ledger entry in insertion order and re-computes each SHA-256 hash,
     * verifying it matches the stored value and that the chain links are intact.
     *
     * @return {@code true} if the ledger is untampered, {@code false} if any record
     *         has been altered or the chain has been broken.
     */
    public boolean verifyChainIntegrity() {
        List<StripePaymentEventLedger> entries = ledgerRepository.findAllByOrderByProcessedAtAsc();
        String expectedPreviousHash = "GENESIS";
        for (StripePaymentEventLedger entry : entries) {
            if (!expectedPreviousHash.equals(entry.getPreviousHash())) {
                return false;
            }
            String expectedHash = computeHash(
                    entry.getStripeEventId(), entry.getEventType(),
                    entry.getPayload(), entry.getStatus(), entry.getPreviousHash());
            if (!expectedHash.equals(entry.getHash())) {
                return false;
            }
            expectedPreviousHash = entry.getHash();
        }
        return true;
    }

    @SuppressWarnings("unchecked")
    private static <T extends com.stripe.model.StripeObject> T deserialize(Event event, Class<T> type) {
        return (T) event.getDataObjectDeserializer()
                .getObject()
                .orElseGet(() -> {
                    try {
                        return event.getDataObjectDeserializer().deserializeUnsafe();
                    } catch (com.stripe.exception.StripeException e) {
                        throw new IllegalStateException(
                                "Failed to deserialize " + type.getSimpleName() + " (API version mismatch?)", e);
                    }
                });
    }

    @Transactional
    public void payMounthlySubscription(Subscription subscription) throws StripeException {
        if (subscription.getStatus() != SubscriptionStatus.ACTIVE) {
            throw new IllegalStateException("Subscription is not active: " + subscription.getId());
        }

        Plan plan = subscription.getPlan();
        BigDecimal price = plan.getPrice();
        String currency = "usd"; // Assuming USD for simplicity
        long amountInCents = price.multiply(BigDecimal.valueOf(100)).longValue();

        Client client = subscription.getClient();
        if (client.getStripeCustomerId() == null || client.getStripePaymentMethodId() == null) {
            throw new IllegalStateException("Client does not have Stripe customer/payment method IDs: " + client.getId());
        }

        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount(amountInCents)
                .setCurrency(currency)
                .setCustomer(client.getStripeCustomerId())         // ← stored on Client
                .setPaymentMethod(client.getStripePaymentMethodId()) // ← stored on Client
                .setConfirm(true)                                  // ← charge immediately
                .setOffSession(true)                               // ← no user present
                .putMetadata("planId", plan.getId().toString())
                .putMetadata("clientId", subscription.getClient().getId().toString())
                .putMetadata("subscriptionId", subscription.getId().toString())
                .build();
        PaymentIntent paymentIntent = PaymentIntent.create(params);

        Payment payment = Payment.builder()
                .amount(price)
                .currency(currency.toUpperCase())
                .method(PaymentMethod.STRIPE)
                .status(PaymentStatus.PENDING)
                .transactionId(paymentIntent.getId())
                .subscription(subscription)
                .build();
        payment.setTenant(client.getTenant());
        paymentService.save(payment);
    }

    @Scheduled(cron = "0 0 0 * * ?") // Every day at midnight
    public void processMonthlySubscriptions() {
        List<Subscription> activeSubscriptions = subscriptionService.findByStatus(SubscriptionStatus.ACTIVE);
        for (Subscription subscription : activeSubscriptions) {
            if (subscription.getEndDate().isBefore(LocalDate.now())) {
                try {
                    payMounthlySubscription(subscription);
                } catch (StripeException e) {
                    // Log the error and continue processing other subscriptions
                    System.err.println("Failed to process payment for subscription " + subscription.getId() + ": " + e.getMessage());
                }
            }
        }
    }
}
