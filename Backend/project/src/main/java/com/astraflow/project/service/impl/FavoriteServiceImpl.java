package com.astraflow.project.service.impl;

import com.astraflow.project.model.Favorite;
import com.astraflow.project.repository.FavoriteRepository;
import com.astraflow.project.service.FavoriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FavoriteServiceImpl implements FavoriteService {

    private final FavoriteRepository favoriteRepository;

    @Override
    public List<Favorite> findByClientId(UUID clientId) {
        return favoriteRepository.findByClientId(clientId);
    }

    @Override
    public Optional<Favorite> findByClientIdAndChannelId(UUID clientId, UUID channelId) {
        return favoriteRepository.findByClientIdAndChannelId(clientId, channelId);
    }

    @Override
    public boolean isFavorite(UUID clientId, UUID channelId) {
        return favoriteRepository.existsByClientIdAndChannelId(clientId, channelId);
    }

    @Override
    @Transactional
    public Favorite save(Favorite favorite) {
        return favoriteRepository.save(favorite);
    }

    @Override
    @Transactional
    public void deleteByClientIdAndChannelId(UUID clientId, UUID channelId) {
        favoriteRepository.deleteByClientIdAndChannelId(clientId, channelId);
    }

    @Override
    @Transactional
    public void deleteById(UUID id) {
        favoriteRepository.deleteById(id);
    }
}
