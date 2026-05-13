package com.astraflow.project.repository;

import com.astraflow.project.model.AuditLog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface AuditLogRepository extends JpaRepository<AuditLog, UUID> {

    Page<AuditLog> findByTenantId(UUID tenantId, Pageable pageable);

    List<AuditLog> findByUserId(UUID userId);

    List<AuditLog> findByTenantIdAndEntity(UUID tenantId, String entity);

    List<AuditLog> findByTenantIdAndEntityAndEntityId(UUID tenantId, String entity, String entityId);
}
