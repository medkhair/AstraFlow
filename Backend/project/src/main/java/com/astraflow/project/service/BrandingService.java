package com.astraflow.project.service;

import com.astraflow.project.model.Branding;

import java.util.Optional;
import java.util.UUID;

public interface BrandingService {

    Optional<Branding> findById(UUID id);

    Optional<Branding> findByTenantId(UUID tenantId);

    Branding save(Branding branding);

    Branding update(UUID id, Branding branding);

    void deleteById(UUID id);
}
