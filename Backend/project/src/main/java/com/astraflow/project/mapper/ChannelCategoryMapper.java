package com.astraflow.project.mapper;

import com.astraflow.project.dto.request.ChannelCategoryRequest;
import com.astraflow.project.dto.response.ChannelCategoryResponse;
import com.astraflow.project.model.ChannelCategory;
import com.astraflow.project.model.Tenant;

public class ChannelCategoryMapper {
/*
    private ChannelCategoryMapper() {
    }

    public static ChannelCategory toChannelCategory(ChannelCategoryRequest request) {
        if (request == null) {
            return null;
        }
        ChannelCategory category = new ChannelCategory();
        category.setName(request.getName());
        category.setDescription(request.getDescription());
        category.setSortOrder(request.getSortOrder());
        if (request.getTenantId() != null) {
            Tenant tenant = new Tenant();
            tenant.setId(request.getTenantId());
            category.setTenant(tenant);
        }
        return category;
    }

    public static ChannelCategoryResponse toChannelCategoryResponse(ChannelCategory category) {
        if (category == null) {
            return null;
        }
        return ChannelCategoryResponse.builder()
                .id(category.getId())
                .tenantId(category.getTenant() != null ? category.getTenant().getId() : null)
                .name(category.getName())
                .description(category.getDescription())
                .sortOrder(category.getSortOrder())
                .build();
    }
    
  */
}