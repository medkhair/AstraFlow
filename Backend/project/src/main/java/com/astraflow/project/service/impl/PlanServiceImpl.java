package com.astraflow.project.service.impl;

import com.astraflow.project.model.Plan;
import com.astraflow.project.model.enums.PlanType;
import com.astraflow.project.repository.PlanRepository;
import com.astraflow.project.service.PlanService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PlanServiceImpl implements PlanService {

    private final PlanRepository planRepository;

    @Override
    public List<Plan> findAll() {
        return planRepository.findAll();
    }

    @Override
    public Optional<Plan> findById(UUID id) {
        return planRepository.findById(id);
    }

    @Override
    public List<Plan> findByTenantId(UUID tenantId) {
        return planRepository.findByTenantId(tenantId);
    }

    @Override
    public List<Plan> findActivePlansByTenantId(UUID tenantId) {
        return planRepository.findByTenantIdAndIsActiveTrue(tenantId);
    }

    @Override
    public List<Plan> findByTenantIdAndPlanType(UUID tenantId, PlanType planType) {
        return planRepository.findByTenantIdAndPlanType(tenantId, planType);
    }

    @Override
    @Transactional
    public Plan save(Plan plan) {
        return planRepository.save(plan);
    }

    @Override
    @Transactional
    public Plan update(UUID id, Plan plan) {
        planRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Plan not found with id: " + id));
        plan.setId(id);
        return planRepository.save(plan);
    }

    @Override
    @Transactional
    public void deleteById(UUID id) {
        planRepository.deleteById(id);
    }
}
