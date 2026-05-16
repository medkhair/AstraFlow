package com.astraflow.project.repository;

import com.astraflow.project.model.Channel;
import com.astraflow.project.model.enums.ChannelStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ChannelRepository extends JpaRepository<Channel, UUID> {

    List<Channel> findByTenantId(UUID tenantId);

    List<Channel> findByTenantIdAndStatus(UUID tenantId, ChannelStatus status);

    List<Channel> findByCategoryId(UUID categoryId);

    List<Channel> findByTenantIdOrderByChannelNumberAsc(UUID tenantId);

    boolean existsByTenantIdAndStreamUrl(UUID tenantId, String streamUrl);

    boolean existsByTenantIdAndName(UUID tenantId, String name);
}
