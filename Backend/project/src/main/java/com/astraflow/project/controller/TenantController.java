package com.astraflow.project.controller;

import com.astraflow.project.model.Tenant;
import com.astraflow.project.model.enums.TenantStatus;
import com.astraflow.project.service.TenantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;
import java.util.UUID;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/tenants")
@PreAuthorize("hasAnyRole('OWNER', 'ADMIN', 'CLIENT')")
public class TenantController {

    @Autowired
    private TenantService tenantService;

    @GetMapping
    public ResponseEntity<List<Tenant>> findAll() {
        return ResponseEntity.ok(tenantService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tenant> findById(@PathVariable UUID id) {
        return tenantService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/subdomain/{subdomain}")
    public ResponseEntity<Tenant> findBySubdomain(@PathVariable String subdomain) {
        return tenantService.findBySubdomain(subdomain)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Tenant>> findByStatus(@PathVariable TenantStatus status) {
        return ResponseEntity.ok(tenantService.findByStatus(status));
    }

    @PostMapping
    public ResponseEntity<Tenant> create(@RequestBody Tenant tenant) {
        return ResponseEntity.status(HttpStatus.CREATED).body(tenantService.save(tenant));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Tenant> update(@PathVariable UUID id, @RequestBody Tenant tenant) {
        return ResponseEntity.ok(tenantService.update(id, tenant));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        tenantService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    
}
