package com.astraflow.project.controller;

import com.astraflow.project.model.Admin;
import com.astraflow.project.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/admins")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping
    public ResponseEntity<List<Admin>> findAll() {
        return ResponseEntity.ok(adminService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Admin> findById(@PathVariable UUID id) {
        return adminService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/tenant/{tenantId}")
    public ResponseEntity<List<Admin>> findByTenantId(@PathVariable UUID tenantId) {
        return ResponseEntity.ok(adminService.findByTenantId(tenantId));
    }

    @PostMapping
    public ResponseEntity<Admin> create(@RequestBody Admin admin) {
        return ResponseEntity.status(HttpStatus.CREATED).body(adminService.save(admin));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Admin> update(@PathVariable UUID id, @RequestBody Admin admin) {
        return ResponseEntity.ok(adminService.update(id, admin));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        adminService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
