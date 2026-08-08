package com.astraflow.project.controller;

import com.astraflow.project.model.Owner;
import com.astraflow.project.service.OwnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;
import java.util.UUID;


@CrossOrigin
@RestController
@RequestMapping("/api/v1/owners")
@PreAuthorize("hasRole('OWNER')")
public class OwnerController {

    @Autowired
    private OwnerService ownerService;

    @GetMapping
    @PreAuthorize("hasRole('OWNER')")
    public ResponseEntity<List<Owner>> findAll() {
        return ResponseEntity.ok(ownerService.findAll());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('OWNER')")
    public ResponseEntity<Owner> findById(@PathVariable UUID id) {
        return ownerService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/email/{email}")
    @PreAuthorize("hasRole('OWNER')")
    public ResponseEntity<Owner> findByEmail(@PathVariable String email) {
        return ownerService.findByEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasRole('OWNER')")
    public ResponseEntity<Owner> create(@RequestBody Owner owner) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ownerService.save(owner));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('OWNER')")
    public ResponseEntity<Owner> update(@PathVariable UUID id, @RequestBody Owner owner) {
        return ResponseEntity.ok(ownerService.update(id, owner));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('OWNER')")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        ownerService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
