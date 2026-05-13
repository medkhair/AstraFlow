package com.astraflow.project.service;

import com.astraflow.project.model.Favorite;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface FavoriteService {

    List<Favorite> findByClientId(UUID clientId);

    Optional<Favorite> findByClientIdAndChannelId(UUID clientId, UUID channelId);

    boolean isFavorite(UUID clientId, UUID channelId);

    Favorite save(Favorite favorite);

    void deleteByClientIdAndChannelId(UUID clientId, UUID channelId);

    void deleteById(UUID id);
}
