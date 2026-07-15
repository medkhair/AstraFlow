package com.astraflow.project.model;

import com.astraflow.project.model.enums.PaymentMethod;
import com.astraflow.project.model.enums.PaymentStatus;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(
        name = "payments",
        indexes = {
                @Index(name = "idx_payment_subscription", columnList = "subscription_id"),
                @Index(name = "idx_payment_transaction_id", columnList = "transaction_id"),
                @Index(name = "idx_payment_status", columnList = "status")
        }
)
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(updatable = false, nullable = false)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subscription_id", nullable = true)
    private Subscription subscription;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal amount;

    @Column(nullable = false, length = 10)
    private String currency;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private PaymentMethod method;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private PaymentStatus status;

    @Column(name = "transaction_id", unique = true, length = 255)
    private String transactionId;

    private LocalDateTime paidAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tenant_id")
    private Tenant tenant;

	public UUID getId() {
		return id;
	}

	public void setId(UUID id) {
		this.id = id;
	}

	public Subscription getSubscription() {
		return subscription;
	}

	public void setSubscription(Subscription subscription) {
		this.subscription = subscription;
	}

	public BigDecimal getAmount() {
		return amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	public String getCurrency() {
		return currency;
	}

	public void setCurrency(String currency) {
		this.currency = currency;
	}

	public PaymentMethod getMethod() {
		return method;
	}

	public void setMethod(PaymentMethod method) {
		this.method = method;
	}

	public PaymentStatus getStatus() {
		return status;
	}

	public void setStatus(PaymentStatus status) {
		this.status = status;
	}

	public String getTransactionId() {
		return transactionId;
	}

	public void setTransactionId(String transactionId) {
		this.transactionId = transactionId;
	}

	public LocalDateTime getPaidAt() {
		return paidAt;
	}

	public void setPaidAt(LocalDateTime paidAt) {
		this.paidAt = paidAt;
	}

    public Tenant getTenant() {
        return tenant;
    }

    public void setTenant(Tenant tenant) {
        this.tenant = tenant;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static final class Builder {
        private UUID id;
        private Subscription subscription;
        private BigDecimal amount;
        private String currency;
        private PaymentMethod method;
        private PaymentStatus status;
        private String transactionId;
        private LocalDateTime paidAt;

        private Builder() {}

        public Builder id(UUID id) { this.id = id; return this; }
        public Builder subscription(Subscription subscription) { this.subscription = subscription; return this; }
        public Builder amount(BigDecimal amount) { this.amount = amount; return this; }
        public Builder currency(String currency) { this.currency = currency; return this; }
        public Builder method(PaymentMethod method) { this.method = method; return this; }
        public Builder status(PaymentStatus status) { this.status = status; return this; }
        public Builder transactionId(String transactionId) { this.transactionId = transactionId; return this; }
        public Builder paidAt(LocalDateTime paidAt) { this.paidAt = paidAt; return this; }

        public Payment build() {
            Payment payment = new Payment();
            payment.id = this.id;
            payment.subscription = this.subscription;
            payment.amount = this.amount;
            payment.currency = this.currency;
            payment.method = this.method;
            payment.status = this.status;
            payment.transactionId = this.transactionId;
            payment.paidAt = this.paidAt;
            return payment;
        }
    }
}
