package com.astraflow.project.controller;

import com.astraflow.project.model.Plan;
import com.astraflow.project.model.enums.PlanType;
import com.astraflow.project.service.PlanService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/plans")
@RequiredArgsConstructor
public class PlanController {

    private final PlanService planService;

    @GetMapping
    public ResponseEntity<List<Plan>> findAll() {
        return ResponseEntity.ok(planService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Plan> findById(@PathVariable UUID id) {
        return planService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/tenant/{tenantId}")
    public ResponseEntity<List<Plan>> findByTenantId(@PathVariable UUID tenantId) {
        return ResponseEntity.ok(planService.findByTenantId(tenantId));
    }

    @GetMapping("/tenant/{tenantId}/active")
    public ResponseEntity<List<Plan>> findActivePlansByTenantId(@PathVariable UUID tenantId) {
        return ResponseEntity.ok(planService.findActivePlansByTenantId(tenantId));
    }

    @GetMapping("/tenant/{tenantId}/type/{planType}")
    public ResponseEntity<List<Plan>> findByTenantIdAndPlanType(
            @PathVariable UUID tenantId,
            @PathVariable PlanType planType) {
        return ResponseEntity.ok(planService.findByTenantIdAndPlanType(tenantId, planType));
    }

    @PostMapping
    public ResponseEntity<Plan> create(@RequestBody Plan plan) {
        return ResponseEntity.status(HttpStatus.CREATED).body(planService.save(plan));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Plan> update(@PathVariable UUID id, @RequestBody Plan plan) {
        return ResponseEntity.ok(planService.update(id, plan));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        planService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
