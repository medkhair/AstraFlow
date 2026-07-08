package com.astraflow.project.mapper;

import com.astraflow.project.dto.request.FavoriteRequest;
import com.astraflow.project.dto.response.FavoriteResponse;
import com.astraflow.project.model.Channel;
import com.astraflow.project.model.Client;
import com.astraflow.project.model.Favorite;

public class FavoriteMapper {
/*
    private FavoriteMapper() {
    }

    public static Favorite toFavorite(FavoriteRequest request) {
        if (request == null) {
            return null;
        }
        Favorite favorite = new Favorite();
        if (request.getClientId() != null) {
            Client client = new Client();
            client.setId(request.getClientId());
            favorite.setClient(client);
        }
        if (request.getChannelId() != null) {
            Channel channel = new Channel();
            channel.setId(request.getChannelId());
            favorite.setChannel(channel);
        }
        return favorite;
    }

    public static FavoriteResponse toFavoriteResponse(Favorite favorite) {
        if (favorite == null) {
            return null;
        }
        return FavoriteResponse.builder()
                .id(favorite.getId())
                .clientId(favorite.getClient() != null ? favorite.getClient().getId() : null)
                .channelId(favorite.getChannel() != null ? favorite.getChannel().getId() : null)
                .createdAt(favorite.getCreatedAt())
                .build();
    }
    
 */
}