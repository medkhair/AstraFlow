package com.astraflow.project.controller;

import com.astraflow.project.model.Channel;
import com.astraflow.project.model.enums.ChannelStatus;
import com.astraflow.project.service.ChannelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/channels")
public class ChannelController {

    @Autowired
    private ChannelService channelService;

    @GetMapping
    public ResponseEntity<List<Channel>> findAll() {
        return ResponseEntity.ok(channelService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Channel> findById(@PathVariable UUID id) {
        return channelService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/tenant/{tenantId}")
    public ResponseEntity<List<Channel>> findByTenantId(@PathVariable UUID tenantId) {
        return ResponseEntity.ok(channelService.findByTenantId(tenantId));
    }

    @GetMapping("/tenant/{tenantId}/status/{status}")
    public ResponseEntity<List<Channel>> findByTenantIdAndStatus(
            @PathVariable UUID tenantId,
            @PathVariable ChannelStatus status) {
        return ResponseEntity.ok(channelService.findByTenantIdAndStatus(tenantId, status));
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<Channel>> findByCategoryId(@PathVariable UUID categoryId) {
        return ResponseEntity.ok(channelService.findByCategoryId(categoryId));
    }

    @PostMapping
    public ResponseEntity<Channel> create(@RequestBody Channel channel) {
        return ResponseEntity.status(HttpStatus.CREATED).body(channelService.save(channel));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Channel> update(@PathVariable UUID id, @RequestBody Channel channel) {
        return ResponseEntity.ok(channelService.update(id, channel));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        channelService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
