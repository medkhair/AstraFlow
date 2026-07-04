package com.astraflow.project.payment.stripe;

import com.astraflow.project.dto.request.CreatePaymentIntentRequest;
import com.astraflow.project.dto.response.PaymentIntentResponse;
import com.stripe.exception.StripeException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/stripe")
public class StripePaymentController {

    @Autowired
    private StripePaymentService stripePaymentService;

    /**
     * Creates a Stripe PaymentIntent for a subscription.
     * The returned {@code clientSecret} is passed to the frontend Stripe.js to confirm payment.
     *
     * POST /api/v1/stripe/create-payment-intent
     * Body: { "subscriptionId": "<uuid>", "currency": "usd" }
     */
    @PostMapping("/create-payment-intent")
    public ResponseEntity<PaymentIntentResponse> createPaymentIntent(
            @RequestBody CreatePaymentIntentRequest request) throws StripeException {
        return ResponseEntity.ok(stripePaymentService.createPaymentIntent(request));
    }

    /**
     * Issues a full refund for an existing payment.
     *
     * POST /api/v1/stripe/refund/{paymentId}
     */
    @PostMapping("/refund/{paymentId}")
    public ResponseEntity<Void> refund(@PathVariable UUID paymentId) throws StripeException {
        stripePaymentService.refundPayment(paymentId);
        return ResponseEntity.ok().build();
    }

    /**
     * Verifies the cryptographic hash chain of the entire payment event ledger.
     * Returns {@code true} if every record is intact, {@code false} if tampering is detected.
     *
     * GET /api/v1/stripe/ledger/verify
     */
    @GetMapping("/ledger/verify")
    public ResponseEntity<Boolean> verifyLedger() {
        return ResponseEntity.ok(stripePaymentService.verifyChainIntegrity());
    }
}
