package com.astraflow.project.controller;

import com.astraflow.project.model.ChannelCategory;
import com.astraflow.project.service.ChannelCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/channel-categories")
public class ChannelCategoryController {

    @Autowired
    private ChannelCategoryService channelCategoryService;

    @GetMapping
    public ResponseEntity<List<ChannelCategory>> findAll() {
        return ResponseEntity.ok(channelCategoryService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ChannelCategory> findById(@PathVariable UUID id) {
        return channelCategoryService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/tenant/{tenantId}")
    public ResponseEntity<List<ChannelCategory>> findByTenantId(@PathVariable UUID tenantId) {
        return ResponseEntity.ok(channelCategoryService.findByTenantId(tenantId));
    }

    @PostMapping
    public ResponseEntity<ChannelCategory> create(@RequestBody ChannelCategory category) {
        return ResponseEntity.status(HttpStatus.CREATED).body(channelCategoryService.save(category));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ChannelCategory> update(@PathVariable UUID id, @RequestBody ChannelCategory category) {
        return ResponseEntity.ok(channelCategoryService.update(id, category));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        channelCategoryService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
