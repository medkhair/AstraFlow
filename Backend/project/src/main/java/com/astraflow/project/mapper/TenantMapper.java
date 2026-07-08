package com.astraflow.project.mapper;

import com.astraflow.project.dto.request.TenantRequest;
import com.astraflow.project.dto.response.TenantResponse;
import com.astraflow.project.model.Tenant;

public final class TenantMapper {
/*
    private TenantMapper() {
    }

    public static Tenant toTenant(TenantRequest request) {
        if (request == null) {
            return null;
        }
        Tenant tenant = new Tenant();
        tenant.setName(request.getName());
        tenant.setSubdomain(request.getSubdomain());
        tenant.setCustomDomain(request.getCustomDomain());
        tenant.setStatus(request.getStatus());
        tenant.setTimezone(request.getTimezone());
        tenant.setCurrency(request.getCurrency());
        return tenant;
    }

    public static TenantResponse toTenantResponse(Tenant tenant) {
        if (tenant == null) {
            return null;
        }
        return TenantResponse.builder()
                .id(tenant.getId())
                .name(tenant.getName())
                .subdomain(tenant.getSubdomain())
                .customDomain(tenant.getCustomDomain())
                .status(tenant.getStatus())
                .timezone(tenant.getTimezone())
                .currency(tenant.getCurrency())
                .createdAt(tenant.getCreatedAt())
                .updatedAt(tenant.getUpdatedAt())
                .build();
    }
*/
}