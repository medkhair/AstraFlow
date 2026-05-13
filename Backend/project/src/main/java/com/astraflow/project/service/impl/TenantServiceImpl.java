package com.astraflow.project.service.impl;

import com.astraflow.project.model.Tenant;
import com.astraflow.project.model.enums.TenantStatus;
import com.astraflow.project.repository.TenantRepository;
import com.astraflow.project.service.TenantService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional(readOnly = true)
public class TenantServiceImpl implements TenantService {

    @Autowired
    private TenantRepository tenantRepository;

    @Override
    public List<Tenant> findAll() {
        return tenantRepository.findAll();
    }

    @Override
    public Optional<Tenant> findById(UUID id) {
        return tenantRepository.findById(id);
    }

    @Override
    public Optional<Tenant> findBySubdomain(String subdomain) {
        return tenantRepository.findBySubdomain(subdomain);
    }

    @Override
    public Optional<Tenant> findByCustomDomain(String customDomain) {
        return tenantRepository.findByCustomDomain(customDomain);
    }

    @Override
    public List<Tenant> findByStatus(TenantStatus status) {
        return tenantRepository.findByStatus(status);
    }

    @Override
    @Transactional
    public Tenant save(Tenant tenant) {
        return tenantRepository.save(tenant);
    }

    @Override
    @Transactional
    public Tenant update(UUID id, Tenant tenant) {
        tenantRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Tenant not found with id: " + id));
        tenant.setId(id);
        return tenantRepository.save(tenant);
    }

    @Override
    @Transactional
    public void deleteById(UUID id) {
        tenantRepository.deleteById(id);
    }
}
