package com.astraflow.project.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FavoriteRequest {

    private UUID clientId;
    private UUID channelId;
    
    
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
    
    
    
}
