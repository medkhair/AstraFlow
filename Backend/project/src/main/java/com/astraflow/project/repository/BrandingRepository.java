package com.astraflow.project.repository;

import com.astraflow.project.model.Branding;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface BrandingRepository extends JpaRepository<Branding, UUID> {

    Optional<Branding> findByTenantId(UUID tenantId);

    boolean existsByTenantId(UUID tenantId);
}
