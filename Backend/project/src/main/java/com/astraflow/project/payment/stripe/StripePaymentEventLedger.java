package com.astraflow.project.payment.stripe;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(
        name = "stripe_payment_event_ledger",
        indexes = {
                @Index(name = "idx_stripe_event_id", columnList = "stripe_event_id"),
                @Index(name = "idx_stripe_ledger_processed_at", columnList = "processed_at")
        }
)
@Getter
@NoArgsConstructor
public class StripePaymentEventLedger {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(updatable = false, nullable = false)
    private UUID id;

    @Column(name = "stripe_event_id", unique = true, nullable = false, updatable = false)
    private String stripeEventId;

    @Column(nullable = false, updatable = false)
    private String eventType;

    @Column(columnDefinition = "TEXT", updatable = false)
    private String payload;

    @Column(nullable = false, updatable = false)
    private LocalDateTime processedAt;

    /** Processing outcome: SUCCESS, FAILED, or SKIPPED (unhandled event type). */
    @Column(nullable = false, length = 20, updatable = false)
    private String status;

    /** SHA-256 hash of the previous ledger entry ("GENESIS" for the first record). */
    @Column(nullable = false, length = 64, updatable = false)
    private String previousHash;

    /** SHA-256(stripeEventId | eventType | payload | status | previousHash). */
    @Column(nullable = false, length = 64, updatable = false)
    private String hash;
    
    

    public UUID getId() {
		return id;
	}

	public void setId(UUID id) {
		this.id = id;
	}

	public String getStripeEventId() {
		return stripeEventId;
	}

	public void setStripeEventId(String stripeEventId) {
		this.stripeEventId = stripeEventId;
	}

	public String getEventType() {
		return eventType;
	}

	public void setEventType(String eventType) {
		this.eventType = eventType;
	}

	public String getPayload() {
		return payload;
	}

	public void setPayload(String payload) {
		this.payload = payload;
	}

	public LocalDateTime getProcessedAt() {
		return processedAt;
	}

	public void setProcessedAt(LocalDateTime processedAt) {
		this.processedAt = processedAt;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getPreviousHash() {
		return previousHash;
	}

	public void setPreviousHash(String previousHash) {
		this.previousHash = previousHash;
	}

	public String getHash() {
		return hash;
	}

	public void setHash(String hash) {
		this.hash = hash;
	}

	public static Builder builder() {
        return new Builder();
    }

    public static final class Builder {
        private String stripeEventId;
        private String eventType;
        private String payload;
        private LocalDateTime processedAt;
        private String status;
        private String previousHash;
        private String hash;

        private Builder() {}

        public Builder stripeEventId(String stripeEventId) { this.stripeEventId = stripeEventId; return this; }
        public Builder eventType(String eventType) { this.eventType = eventType; return this; }
        public Builder payload(String payload) { this.payload = payload; return this; }
        public Builder processedAt(LocalDateTime processedAt) { this.processedAt = processedAt; return this; }
        public Builder status(String status) { this.status = status; return this; }
        public Builder previousHash(String previousHash) { this.previousHash = previousHash; return this; }
        public Builder hash(String hash) { this.hash = hash; return this; }

        public StripePaymentEventLedger build() {
            StripePaymentEventLedger entity = new StripePaymentEventLedger();
            entity.stripeEventId = this.stripeEventId;
            entity.eventType = this.eventType;
            entity.payload = this.payload;
            entity.processedAt = this.processedAt;
            entity.status = this.status;
            entity.previousHash = this.previousHash;
            entity.hash = this.hash;
            return entity;
        }
    }
}
