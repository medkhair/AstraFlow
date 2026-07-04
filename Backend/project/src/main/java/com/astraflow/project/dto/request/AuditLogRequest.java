package com.astraflow.project.dto.request;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuditLogRequest {

    private UUID tenantId;
    private UUID userId;
    private String action;
    private String entity;
    private String entityId;
    private String ipAddress;
}
