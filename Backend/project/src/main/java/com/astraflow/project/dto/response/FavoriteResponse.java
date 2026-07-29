package com.astraflow.project.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
public class FavoriteResponse {

    private UUID id;
    private UUID clientId;
    private UUID channelId;
    private LocalDateTime createdAt;
    
    
	public FavoriteResponse(UUID id, UUID clientId, UUID channelId, LocalDateTime createdAt) {
		super();
		this.id = id;
		this.clientId = clientId;
		this.channelId = channelId;
		this.createdAt = createdAt;
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
	public UUID getChannelId() {
		return channelId;
	}
	public void setChannelId(UUID channelId) {
		this.channelId = channelId;
	}
	public LocalDateTime getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public static Builder builder() {
		return new Builder();
	}

	public static class Builder{
		
		private UUID id;
		private UUID clientId;
		private UUID channelId;
		private LocalDateTime createdAt;

		public Builder id(UUID id) {
			this.id = id;
			return this;
		}

		public Builder clientId(UUID clientId) {
			this.clientId = clientId;
			return this;
		}

		public Builder channelId(UUID channelId) {
			this.channelId = channelId;
			return this;
		}

		public Builder createdAt(LocalDateTime createdAt) {
			this.createdAt = createdAt;
			return this;
		}

		public FavoriteResponse build() {
			return new FavoriteResponse(id, clientId, channelId, createdAt);
		}
	}
    
    
    
}
