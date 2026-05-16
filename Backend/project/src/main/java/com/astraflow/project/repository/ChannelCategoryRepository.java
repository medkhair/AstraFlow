package com.astraflow.project.repository;

import com.astraflow.project.model.ChannelCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;
import java.util.Optional;

@Repository
public interface ChannelCategoryRepository extends JpaRepository<ChannelCategory, UUID> {

    List<ChannelCategory> findByTenantIdOrderBySortOrderAsc(UUID tenantId);

    boolean existsByNameAndTenantId(String name, UUID tenantId);

    Optional<ChannelCategory> findByNameAndTenantId(String name, UUID tenantId);
}
