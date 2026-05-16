package com.astraflow.project.service;

import com.astraflow.project.model.ChannelCategory;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ChannelCategoryService {

    List<ChannelCategory> findAll();

    Optional<ChannelCategory> findById(UUID id);

    List<ChannelCategory> findByTenantId(UUID tenantId);

    ChannelCategory save(ChannelCategory category);

    ChannelCategory update(UUID id, ChannelCategory category);

    void deleteById(UUID id);

    boolean existsByNameAndTenantId(String name, UUID tenantId);

    Optional<ChannelCategory> findByNameAndTenantId(String name, UUID tenantId);
}
