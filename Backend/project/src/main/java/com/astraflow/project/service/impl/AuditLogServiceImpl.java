package com.astraflow.project.service.impl;

import com.astraflow.project.model.AuditLog;
import com.astraflow.project.repository.AuditLogRepository;
import com.astraflow.project.service.AuditLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional(readOnly = true)
public class AuditLogServiceImpl implements AuditLogService {

    @Autowired
    private AuditLogRepository auditLogRepository;

    @Override
    public Page<AuditLog> findByTenantId(UUID tenantId, Pageable pageable) {
        return auditLogRepository.findByTenantId(tenantId, pageable);
    }

    @Override
    public Optional<AuditLog> findById(UUID id) {
        return auditLogRepository.findById(id);
    }

    @Override
    public List<AuditLog> findByUserId(UUID userId) {
        return auditLogRepository.findByUserId(userId);
    }

    @Override
    public List<AuditLog> findByTenantIdAndEntity(UUID tenantId, String entity) {
        return auditLogRepository.findByTenantIdAndEntity(tenantId, entity);
    }

    @Override
    @Transactional
    public AuditLog save(AuditLog auditLog) {
        return auditLogRepository.save(auditLog);
    }
}
