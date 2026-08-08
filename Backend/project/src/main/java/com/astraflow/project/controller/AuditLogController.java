package com.astraflow.project.controller;

import com.astraflow.project.model.AuditLog;
import com.astraflow.project.service.AuditLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/audit-logs")
@PreAuthorize("hasAnyRole('OWNER', 'ADMIN')")
public class AuditLogController {

    @Autowired
    private AuditLogService auditLogService;

    @GetMapping("/{id}")
    public ResponseEntity<AuditLog> findById(@PathVariable UUID id) {
        return auditLogService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/tenant/{tenantId}")
    public ResponseEntity<Page<AuditLog>> findByTenantId(
            @PathVariable UUID tenantId,
            @PageableDefault(size = 50, sort = "createdAt") Pageable pageable) {
        return ResponseEntity.ok(auditLogService.findByTenantId(tenantId, pageable));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<AuditLog>> findByUserId(@PathVariable UUID userId) {
        return ResponseEntity.ok(auditLogService.findByUserId(userId));
    }

    @GetMapping("/tenant/{tenantId}/entity/{entity}")
    public ResponseEntity<List<AuditLog>> findByTenantIdAndEntity(
            @PathVariable UUID tenantId,
            @PathVariable String entity) {
        return ResponseEntity.ok(auditLogService.findByTenantIdAndEntity(tenantId, entity));
    }

    @PostMapping
    public ResponseEntity<AuditLog> create(@RequestBody AuditLog auditLog) {
        return ResponseEntity.status(HttpStatus.CREATED).body(auditLogService.save(auditLog));
    }
}
