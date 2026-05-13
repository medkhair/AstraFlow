package com.astraflow.project.repository;

import com.astraflow.project.model.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, UUID> {

    List<Favorite> findByClientId(UUID clientId);

    Optional<Favorite> findByClientIdAndChannelId(UUID clientId, UUID channelId);

    boolean existsByClientIdAndChannelId(UUID clientId, UUID channelId);

    void deleteByClientIdAndChannelId(UUID clientId, UUID channelId);
}
