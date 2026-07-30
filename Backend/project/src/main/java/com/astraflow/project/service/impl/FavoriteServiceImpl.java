package com.astraflow.project.service.impl;

import com.astraflow.project.dto.response.FavoriteResponse;
import com.astraflow.project.model.Favorite;
import com.astraflow.project.repository.ChannelRepository;
import com.astraflow.project.repository.ClientRepository;
import com.astraflow.project.repository.FavoriteRepository;
import com.astraflow.project.service.FavoriteService;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.astraflow.project.dto.request.FavoriteRequest;


import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional(readOnly = true)
public class FavoriteServiceImpl implements FavoriteService {

    @Autowired
    private FavoriteRepository favoriteRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private ChannelRepository channelRepository;

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
    	favorite.setCreatedAt(LocalDateTime.now());
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

	@Override
	public List<FavoriteResponse> findAllFavoritesByClientId(UUID clientId) {
        List<Favorite> favorites = favoriteRepository.findByClientId(clientId);
        return favorites.stream()
                .map(favorite -> new FavoriteResponse(favorite.getId(), favorite.getClient().getId(), favorite.getChannel().getId(), favorite.getCreatedAt()))
                .toList();
	}

	@Override
    @Transactional
	public FavoriteResponse create(FavoriteRequest favorite) {
        var client = clientRepository.findById(favorite.getClientId())
                .orElseThrow(() -> new EntityNotFoundException(
                        "Client not found with id: " + favorite.getClientId()));

        System.out.println("Client found: " + client.getUsername());

        var channel = channelRepository.findById(favorite.getChannelId())
                .orElseThrow(() -> new EntityNotFoundException(
                        "Channel not found with id: " + favorite.getChannelId()));

        System.out.println("Channel found: " + channel.getName());

        Favorite entity = new Favorite();
        entity.setClient(client);
        entity.setChannel(channel);

        Favorite savedFavorite = save(entity);

        System.out.println("Favorite created with id: " + savedFavorite.getId());

        return new FavoriteResponse(
                savedFavorite.getId(),
                savedFavorite.getClient().getId(),
                savedFavorite.getChannel().getId(),
                savedFavorite.getCreatedAt()
        );
    }
}
