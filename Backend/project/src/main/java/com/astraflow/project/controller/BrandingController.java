package com.astraflow.project.controller;

import com.astraflow.project.model.Branding;
import com.astraflow.project.service.BrandingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/brandings")
@RequiredArgsConstructor
public class BrandingController {

    private final BrandingService brandingService;

    @GetMapping("/{id}")
    public ResponseEntity<Branding> findById(@PathVariable UUID id) {
        return brandingService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/tenant/{tenantId}")
    public ResponseEntity<Branding> findByTenantId(@PathVariable UUID tenantId) {
        return brandingService.findByTenantId(tenantId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Branding> create(@RequestBody Branding branding) {
        return ResponseEntity.status(HttpStatus.CREATED).body(brandingService.save(branding));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Branding> update(@PathVariable UUID id, @RequestBody Branding branding) {
        return ResponseEntity.ok(brandingService.update(id, branding));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        brandingService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
