package com.astraflow.project.mapper;

import com.astraflow.project.dto.request.FavoriteRequest;
import com.astraflow.project.dto.response.FavoriteResponse;
import com.astraflow.project.model.Channel;
import com.astraflow.project.model.Client;
import com.astraflow.project.model.Favorite;

public class FavoriteMapper {

    public static FavoriteResponse toResponse(Favorite favorite) {
        if (favorite == null) {
            return null;
        }

        return FavoriteResponse.builder()
                .id(favorite.getId())
                .clientId(favorite.getClient().getId())
                .channelId(favorite.getChannel().getId())
                .createdAt(favorite.getCreatedAt())
                .build();
    }

    public static Favorite toEntity(FavoriteRequest request, Client client, Channel channel) {
        if (request == null) {
            return null;
        }

        Favorite favorite = new Favorite();
        favorite.setClient(client);
        favorite.setChannel(channel);
        return favorite;
    }
    
 
}