package com.astraflow.project.payment.stripe;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Receives and processes Stripe webhook events.
 * This endpoint is excluded from JWT authentication because Stripe authenticates
 * requests using its own HMAC signature (verified inside StripePaymentService).
 *
 * Register this URL in your Stripe Dashboard:
 *   https://dashboard.stripe.com/webhooks → Add endpoint → /api/v1/stripe/webhook
 *
 * Recommended events to subscribe to:
 *   - payment_intent.succeeded
 *   - payment_intent.payment_failed
 *   - charge.refunded
 */
@RestController
@RequestMapping("/api/v1/stripe")
public class StripeWebhookController {

    @Autowired
    private StripePaymentService stripePaymentService;

    @PostMapping(value = "/webhook", consumes = "application/json")
    public ResponseEntity<String> webhook(
            @RequestBody String payload,
            @RequestHeader("Stripe-Signature") String sigHeader) {
        try {
            stripePaymentService.handleWebhookEvent(payload, sigHeader);
            return ResponseEntity.ok("OK");
        } catch (IllegalArgumentException e) {
            // Invalid signature or bad request — return 400 so Stripe retries
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            // Return 500 so Stripe retries; don't let Spring redirect to /error (JWT-secured → 401)
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }
}
