package com.astraflow.project.service;

import com.astraflow.project.model.AuditLog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface AuditLogService {

    Page<AuditLog> findByTenantId(UUID tenantId, Pageable pageable);

    Optional<AuditLog> findById(UUID id);

    List<AuditLog> findByUserId(UUID userId);

    List<AuditLog> findByTenantIdAndEntity(UUID tenantId, String entity);

    AuditLog save(AuditLog auditLog);
}
