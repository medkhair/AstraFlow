package com.astraflow.project.service.impl;

import com.astraflow.project.model.Branding;
import com.astraflow.project.repository.BrandingRepository;
import com.astraflow.project.service.BrandingService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BrandingServiceImpl implements BrandingService {

    private final BrandingRepository brandingRepository;

    @Override
    public Optional<Branding> findById(UUID id) {
        return brandingRepository.findById(id);
    }

    @Override
    public Optional<Branding> findByTenantId(UUID tenantId) {
        return brandingRepository.findByTenantId(tenantId);
    }

    @Override
    @Transactional
    public Branding save(Branding branding) {
        return brandingRepository.save(branding);
    }

    @Override
    @Transactional
    public Branding update(UUID id, Branding branding) {
        brandingRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Branding not found with id: " + id));
        branding.setId(id);
        return brandingRepository.save(branding);
    }

    @Override
    @Transactional
    public void deleteById(UUID id) {
        brandingRepository.deleteById(id);
    }
}
