package com.astraflow.project.service;

import com.astraflow.project.model.Plan;
import com.astraflow.project.model.enums.PlanType;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface PlanService {

    List<Plan> findAll();

    Optional<Plan> findById(UUID id);

    List<Plan> findByTenantId(UUID tenantId);

    List<Plan> findActivePlansByTenantId(UUID tenantId);

    List<Plan> findByTenantIdAndPlanType(UUID tenantId, PlanType planType);

    Plan save(Plan plan);

    Plan update(UUID id, Plan plan);

    void deleteById(UUID id);
}
