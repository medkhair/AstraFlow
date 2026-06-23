package com.astraflow.project.dto;

import com.astraflow.project.model.enums.TenantStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TenantResponse {

    private UUID id;
    private String name;
    private String subdomain;
    private String customDomain;
    private TenantStatus status;
    private String timezone;
    private String currency;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
