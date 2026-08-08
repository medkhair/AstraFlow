package com.astraflow.project.controller;

import com.astraflow.project.model.Admin;
import com.astraflow.project.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.access.prepost.PreAuthorize;


@RestController
@CrossOrigin
@RequestMapping("/api/v1/admins")
@PreAuthorize("hasAnyRole('OWNER', 'ADMIN')")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping
    @PreAuthorize("hasRole('OWNER')")
    public ResponseEntity<List<Admin>> findAll() {
        return ResponseEntity.ok(adminService.findAll());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('OWNER') or @authorizationService.canAccessUser(authentication, #id)")
    public ResponseEntity<Admin> findById(@PathVariable UUID id) {
        return adminService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/tenant/{tenantId}")
    @PreAuthorize("@authorizationService.canAccessTenant(authentication, #tenantId)")
    public ResponseEntity<List<Admin>> findByTenantId(@PathVariable UUID tenantId) {
        return ResponseEntity.ok(adminService.findByTenantId(tenantId));
    }

    @PostMapping
    @PreAuthorize("hasRole('OWNER') or @authorizationService.canManageTenant(authentication, #admin.tenant.id)")
    public ResponseEntity<Admin> create(@RequestBody Admin admin) {
    	BCryptPasswordEncoder encoder= new BCryptPasswordEncoder(12);
        admin.setPassword(encoder.encode(admin.getPassword()));
        return ResponseEntity.status(HttpStatus.CREATED).body(
    
        		adminService.save(admin)
        		
        		);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('OWNER') or @authorizationService.canAccessUser(authentication, #id)")
    public ResponseEntity<Admin> update(@PathVariable UUID id, @RequestBody Admin admin) {
        return ResponseEntity.ok(adminService.update(id, admin));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('OWNER') or @authorizationService.canAccessUser(authentication, #id)")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        adminService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
    
    @PostMapping("/login")
    @PreAuthorize("permitAll()")
    public String login(@RequestBody Admin user) {
        return adminService.verify(user);
    }
    
    @PatchMapping("/{id}/change-password")
    @PreAuthorize("hasRole('OWNER') or @authorizationService.canAccessUser(authentication, #id)")
    public ResponseEntity<Void> changePassword(
            @PathVariable UUID id,
            @RequestBody Map<String, String> body) {
        adminService.changePassword(id, body.get("currentPassword"), body.get("newPassword"));
        return ResponseEntity.ok().build();
    }
}
