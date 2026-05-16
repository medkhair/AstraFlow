package com.astraflow.project.service;

import com.astraflow.project.model.Channel;
import com.astraflow.project.model.enums.ChannelStatus;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ChannelService {

    List<Channel> findAll();

    Optional<Channel> findById(UUID id);

    List<Channel> findByTenantId(UUID tenantId);

    List<Channel> findByTenantIdAndStatus(UUID tenantId, ChannelStatus status);

    List<Channel> findByCategoryId(UUID categoryId);

    Channel save(Channel channel);

    Channel update(UUID id, Channel channel);

    void deleteById(UUID id);

    boolean existsByTenantIdAndStreamUrl(UUID tenantId, String streamUrl);

    boolean existsByTenantIdAndName(UUID tenantId, String name);

    
}
