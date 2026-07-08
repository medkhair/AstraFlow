package com.astraflow.project.mapper;

import com.astraflow.project.dto.request.PlanRequest;
import com.astraflow.project.dto.response.PlanResponse;
import com.astraflow.project.model.Plan;
import com.astraflow.project.model.Tenant;

public class PlanMapper {
/*
    private PlanMapper() {
    }

    public static Plan toPlan(PlanRequest request) {
        if (request == null) {
            return null;
        }
        Plan plan = new Plan();
        plan.setName(request.getName());
        plan.setPrice(request.getPrice());
        plan.setPlanType(request.getPlanType());
        plan.setDurationDays(request.getDurationDays());
        plan.setMaxConnections(request.getMaxConnections());
        plan.setIsActive(request.getIsActive());
        plan.setFeatures(request.getFeatures());
        if (request.getTenantId() != null) {
            Tenant tenant = new Tenant();
            tenant.setId(request.getTenantId());
            plan.setTenant(tenant);
        }
        return plan;
    }

    public static PlanResponse toPlanResponse(Plan plan) {
        if (plan == null) {
            return null;
        }
        return PlanResponse.builder()
                .id(plan.getId())
                .tenantId(plan.getTenant() != null ? plan.getTenant().getId() : null)
                .name(plan.getName())
                .price(plan.getPrice())
                .planType(plan.getPlanType())
                .durationDays(plan.getDurationDays())
                .maxConnections(plan.getMaxConnections())
                .isActive(plan.getIsActive())
                .features(plan.getFeatures())
                .build();
    }
*/
}