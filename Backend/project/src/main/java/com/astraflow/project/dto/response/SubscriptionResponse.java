package com.astraflow.project.dto.response;

import com.astraflow.project.model.enums.SubscriptionStatus;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
public class SubscriptionResponse {

    private UUID id;
    private UUID clientId;
    private UUID planId;
    private SubscriptionStatus status;
    private LocalDate startDate;
    private LocalDate endDate;
    private LocalDate trialEndDate;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

	public SubscriptionResponse(UUID id, UUID clientId, UUID planId, SubscriptionStatus status, LocalDate startDate, LocalDate endDate, LocalDate trialEndDate, LocalDateTime createdAt, LocalDateTime updatedAt) {
		this.id = id;
		this.clientId = clientId;
		this.planId = planId;
		this.status = status;
		this.startDate = startDate;
		this.endDate = endDate;
		this.trialEndDate = trialEndDate;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}

	public UUID getId() {
		return id;
	}
	public void setId(UUID id) {
		this.id = id;
	}
	public UUID getClientId() {
		return clientId;
	}
	public void setClientId(UUID clientId) {
		this.clientId = clientId;
	}
	public UUID getPlanId() {
		return planId;
	}
	public void setPlanId(UUID planId) {
		this.planId = planId;
	}
	public SubscriptionStatus getStatus() {
		return status;
	}
	public void setStatus(SubscriptionStatus status) {
		this.status = status;
	}
	public LocalDate getStartDate() {
		return startDate;
	}
	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}
	public LocalDate getEndDate() {
		return endDate;
	}
	public void setEndDate(LocalDate endDate) {
		this.endDate = endDate;
	}
	public LocalDate getTrialEndDate() {
		return trialEndDate;
	}
	public void setTrialEndDate(LocalDate trialEndDate) {
		this.trialEndDate = trialEndDate;
	}
	public LocalDateTime getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}
	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}
	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}
    
    public static Builder builder() {
		return new Builder();
	}

	public static class Builder {
		private UUID id;
		private UUID clientId;
		private UUID planId;
		private SubscriptionStatus status;
		private LocalDate startDate;
		private LocalDate endDate;
		private LocalDate trialEndDate;
		private LocalDateTime createdAt;
		private LocalDateTime updatedAt;

		public Builder id(UUID id) {
			this.id = id;
			return this;
		}

		public Builder clientId(UUID clientId) {
			this.clientId = clientId;
			return this;
		}

		public Builder planId(UUID planId) {
			this.planId = planId;
			return this;
		}

		public Builder status(SubscriptionStatus status) {
			this.status = status;
			return this;
		}

		public Builder startDate(LocalDate startDate) {
			this.startDate = startDate;
			return this;
		}

		public Builder endDate(LocalDate endDate) {
			this.endDate = endDate;
			return this;
		}

		public Builder trialEndDate(LocalDate trialEndDate) {
			this.trialEndDate = trialEndDate;
			return this;
		}

		public Builder createdAt(LocalDateTime createdAt) {
			this.createdAt = createdAt;
			return this;
		}

		public Builder updatedAt(LocalDateTime updatedAt) {
			this.updatedAt = updatedAt;
			return this;
		}

		public SubscriptionResponse build() {
			return new SubscriptionResponse(id, clientId, planId, status, startDate, endDate, trialEndDate, createdAt,
					updatedAt);
		}

	}
    
}
