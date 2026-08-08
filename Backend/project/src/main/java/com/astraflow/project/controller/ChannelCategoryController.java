package com.astraflow.project.controller;

import com.astraflow.project.model.ChannelCategory;
import com.astraflow.project.service.ChannelCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;
import java.util.UUID;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/channel-categories")
@PreAuthorize("hasAnyRole('OWNER', 'ADMIN', 'CLIENT')")
public class ChannelCategoryController {

    @Autowired
    private ChannelCategoryService channelCategoryService;

    @GetMapping
    @PreAuthorize("hasRole('OWNER')")
    public ResponseEntity<List<ChannelCategory>> findAll() {
        return ResponseEntity.ok(channelCategoryService.findAll());
    }

    @GetMapping("/{id}")
    @PreAuthorize("@authorizationService.canAccessCategory(authentication, #id)")
    public ResponseEntity<ChannelCategory> findById(@PathVariable UUID id) {
        return channelCategoryService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/tenant/{tenantId}")
    @PreAuthorize("@authorizationService.canAccessTenant(authentication, #tenantId)")
    public ResponseEntity<List<ChannelCategory>> findByTenantId(@PathVariable UUID tenantId) {
        return ResponseEntity.ok(channelCategoryService.findByTenantId(tenantId));
    }

    @PostMapping
    @PreAuthorize("hasRole('OWNER') or @authorizationService.canManageTenant(authentication, #category.tenant.id)")
    public ResponseEntity<ChannelCategory> create(@RequestBody ChannelCategory category) {
        return ResponseEntity.status(HttpStatus.CREATED).body(channelCategoryService.save(category));
    }

    @PutMapping("/{id}")
    @PreAuthorize("@authorizationService.canManageCategory(authentication, #id)")
    public ResponseEntity<ChannelCategory> update(@PathVariable UUID id, @RequestBody ChannelCategory category) {
        return ResponseEntity.ok(channelCategoryService.update(id, category));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("@authorizationService.canManageCategory(authentication, #id)")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        channelCategoryService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
