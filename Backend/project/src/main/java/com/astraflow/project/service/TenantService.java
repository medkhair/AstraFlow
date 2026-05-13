package com.astraflow.project.service;

import com.astraflow.project.model.Tenant;
import com.astraflow.project.model.enums.TenantStatus;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TenantService {

    List<Tenant> findAll();

    Optional<Tenant> findById(UUID id);

    Optional<Tenant> findBySubdomain(String subdomain);

    Optional<Tenant> findByCustomDomain(String customDomain);

    List<Tenant> findByStatus(TenantStatus status);

    Tenant save(Tenant tenant);

    Tenant update(UUID id, Tenant tenant);

    void deleteById(UUID id);
}
