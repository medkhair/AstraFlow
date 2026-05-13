package com.astraflow.project.repository;

import com.astraflow.project.model.Tenant;
import com.astraflow.project.model.enums.TenantStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface TenantRepository extends JpaRepository<Tenant, UUID> {

    Optional<Tenant> findBySubdomain(String subdomain);

    Optional<Tenant> findByCustomDomain(String customDomain);

    List<Tenant> findByStatus(TenantStatus status);

    boolean existsBySubdomain(String subdomain);

    boolean existsByCustomDomain(String customDomain);
}
