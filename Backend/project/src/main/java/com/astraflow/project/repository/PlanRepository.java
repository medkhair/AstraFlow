package com.astraflow.project.repository;

import com.astraflow.project.model.Plan;
import com.astraflow.project.model.enums.PlanType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PlanRepository extends JpaRepository<Plan, UUID> {

    List<Plan> findByTenantId(UUID tenantId);

    List<Plan> findByTenantIdAndIsActiveTrue(UUID tenantId);

    List<Plan> findByTenantIdAndPlanType(UUID tenantId, PlanType planType);
}
