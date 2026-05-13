package com.astraflow.project.service.impl;

import com.astraflow.project.model.Channel;
import com.astraflow.project.model.enums.ChannelStatus;
import com.astraflow.project.repository.ChannelRepository;
import com.astraflow.project.service.ChannelService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ChannelServiceImpl implements ChannelService {

    private final ChannelRepository channelRepository;

    @Override
    public List<Channel> findAll() {
        return channelRepository.findAll();
    }

    @Override
    public Optional<Channel> findById(UUID id) {
        return channelRepository.findById(id);
    }

    @Override
    public List<Channel> findByTenantId(UUID tenantId) {
        return channelRepository.findByTenantIdOrderByChannelNumberAsc(tenantId);
    }

    @Override
    public List<Channel> findByTenantIdAndStatus(UUID tenantId, ChannelStatus status) {
        return channelRepository.findByTenantIdAndStatus(tenantId, status);
    }

    @Override
    public List<Channel> findByCategoryId(UUID categoryId) {
        return channelRepository.findByCategoryId(categoryId);
    }

    @Override
    @Transactional
    public Channel save(Channel channel) {
        return channelRepository.save(channel);
    }

    @Override
    @Transactional
    public Channel update(UUID id, Channel channel) {
        channelRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Channel not found with id: " + id));
        channel.setId(id);
        return channelRepository.save(channel);
    }

    @Override
    @Transactional
    public void deleteById(UUID id) {
        channelRepository.deleteById(id);
    }
}
