package com.astraflow.project.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

import com.astraflow.project.model.enums.PaymentMethod;
import com.astraflow.project.model.enums.PaymentStatus;

@Data
@Builder
@NoArgsConstructor
public class PaymentResponse {

    private UUID id;
    private UUID subscriptionId;
    private BigDecimal amount;
    private String currency;
    private PaymentMethod method;
    private PaymentStatus status;
    private String transactionId;
    private LocalDateTime paidAt;

    public PaymentResponse(UUID id2, UUID subscriptionId2, BigDecimal amount2, String currency2, PaymentMethod method2,
			PaymentStatus status2, String transactionId2, LocalDateTime paidAt2) {
                this.id = id2;
                this.subscriptionId = subscriptionId2;
                this.amount = amount2;
                this.currency = currency2;
                this.method = method2;
                this.status = status2;
                this.transactionId = transactionId2;
                this.paidAt = paidAt2;
	}

	public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private UUID id;
        private UUID subscriptionId;
        private BigDecimal amount;
        private String currency;
        private PaymentMethod method;
        private PaymentStatus status;
        private String transactionId;
        private LocalDateTime paidAt;
        
        

        public UUID getId() {
			return id;
		}

		public void setId(UUID id) {
			this.id = id;
		}

		public UUID getSubscriptionId() {
			return subscriptionId;
		}

		public void setSubscriptionId(UUID subscriptionId) {
			this.subscriptionId = subscriptionId;
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

		public Builder id(UUID id) {
            this.id = id;
            return this;
        }

        public Builder subscriptionId(UUID subscriptionId) {
            this.subscriptionId = subscriptionId;
            return this;
        }

        public Builder amount(BigDecimal amount) {
            this.amount = amount;
            return this;
        }

        public Builder currency(String currency) {
            this.currency = currency;
            return this;
        }

        public Builder method(PaymentMethod method) {
            this.method = method;
            return this;
        }

        public Builder status(PaymentStatus status) {
            this.status = status;
            return this;
        }

        public Builder transactionId(String transactionId) {
            this.transactionId = transactionId;
            return this;
        }

        public Builder paidAt(LocalDateTime paidAt) {
            this.paidAt = paidAt;
            return this;
        }

        public PaymentResponse build() {
            return new PaymentResponse(id, subscriptionId, amount, currency, method, status, transactionId, paidAt);
        }
    }
}
