package com.astraflow.project.payment.stripe;

import com.astraflow.project.dto.CreatePaymentIntentRequest;
import com.astraflow.project.dto.PaymentIntentResponse;
import com.astraflow.project.model.Payment;
import com.astraflow.project.model.Subscription;
import com.astraflow.project.model.enums.PaymentMethod;
import com.astraflow.project.model.enums.PaymentStatus;
import com.astraflow.project.repository.StripePaymentEventLedgerRepository;
import com.astraflow.project.service.PaymentService;
import com.astraflow.project.service.SubscriptionService;
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
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

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
        Subscription subscription = subscriptionService.findById(request.subscriptionId())
                .orElseThrow(() -> new IllegalArgumentException("Subscription not found: " + request.subscriptionId()));

        BigDecimal price = subscription.getPlan().getPrice();
        String currency = (request.currency() != null && !request.currency().isBlank())
                ? request.currency().toLowerCase()
                : "usd";
        long amountInCents = price.multiply(BigDecimal.valueOf(100)).longValue();

        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount(amountInCents)
                .setCurrency(currency)
                .putMetadata("subscriptionId", subscription.getId().toString())
                .setAutomaticPaymentMethods(
                        PaymentIntentCreateParams.AutomaticPaymentMethods.builder()
                                .setEnabled(true)
                                .build())
                .build();

        PaymentIntent paymentIntent = PaymentIntent.create(params);

        Payment payment = Payment.builder()
                .subscription(subscription)
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
        paymentService.findByTransactionId(pi.getId()).ifPresent(payment -> {
            payment.setStatus(PaymentStatus.COMPLETED);
            payment.setPaidAt(LocalDateTime.now());
            paymentService.save(payment);
        });
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
}
