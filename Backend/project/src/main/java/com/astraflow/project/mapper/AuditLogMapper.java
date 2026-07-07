package com.astraflow.project.mapper;

import com.astraflow.project.dto.request.AuditLogRequest;
import com.astraflow.project.dto.response.AuditLogResponse;
import com.astraflow.project.model.AuditLog;
import com.astraflow.project.model.Tenant;
import com.astraflow.project.model.User;
import com.astraflow.project.model.Client;

public class AuditLogMapper {

    private AuditLogMapper() {
    }

    public static AuditLog toAuditLog(AuditLogRequest request) {
        if (request == null) {
            return null;
        }
        AuditLog auditLog = new AuditLog();
        auditLog.setAction(request.getAction());
        auditLog.setEntity(request.getEntity());
        auditLog.setEntityId(request.getEntityId());
        auditLog.setIpAddress(request.getIpAddress());

        if (request.getTenantId() != null) {
            Tenant tenant = new Tenant();
            tenant.setId(request.getTenantId());
            auditLog.setTenant(tenant);
        }

        if (request.getUserId() != null) {
            User user = new Client();
            user.setId(request.getUserId());
            auditLog.setUser(user);
        }

        return auditLog;
    }

    public static AuditLogResponse toAuditLogResponse(AuditLog auditLog) {
        if (auditLog == null) {
            return null;
        }
        return AuditLogResponse.builder()
                .id(auditLog.getId())
                .tenantId(auditLog.getTenant() != null ? auditLog.getTenant().getId() : null)
                .userId(auditLog.getUser() != null ? auditLog.getUser().getId() : null)
                .action(auditLog.getAction())
                .entity(auditLog.getEntity())
                .entityId(auditLog.getEntityId())
                .ipAddress(auditLog.getIpAddress())
                .createdAt(auditLog.getCreatedAt())
                .build();
    }
}