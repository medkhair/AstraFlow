package com.astraflow.project.controller;

import com.astraflow.project.model.SupportTicket;
import com.astraflow.project.model.enums.TicketPriority;
import com.astraflow.project.model.enums.TicketStatus;
import com.astraflow.project.service.SupportTicketService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/support-tickets")
@RequiredArgsConstructor
public class SupportTicketController {

    private final SupportTicketService supportTicketService;

    @GetMapping
    public ResponseEntity<List<SupportTicket>> findAll() {
        return ResponseEntity.ok(supportTicketService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SupportTicket> findById(@PathVariable UUID id) {
        return supportTicketService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/tenant/{tenantId}")
    public ResponseEntity<List<SupportTicket>> findByTenantId(@PathVariable UUID tenantId) {
        return ResponseEntity.ok(supportTicketService.findByTenantId(tenantId));
    }

    @GetMapping("/client/{clientId}")
    public ResponseEntity<List<SupportTicket>> findByClientId(@PathVariable UUID clientId) {
        return ResponseEntity.ok(supportTicketService.findByClientId(clientId));
    }

    @GetMapping("/admin/{adminId}")
    public ResponseEntity<List<SupportTicket>> findByAdminId(@PathVariable UUID adminId) {
        return ResponseEntity.ok(supportTicketService.findByAdminId(adminId));
    }

    @GetMapping("/tenant/{tenantId}/status/{status}")
    public ResponseEntity<List<SupportTicket>> findByTenantIdAndStatus(
            @PathVariable UUID tenantId,
            @PathVariable TicketStatus status) {
        return ResponseEntity.ok(supportTicketService.findByTenantIdAndStatus(tenantId, status));
    }

    @GetMapping("/tenant/{tenantId}/priority/{priority}")
    public ResponseEntity<List<SupportTicket>> findByTenantIdAndPriority(
            @PathVariable UUID tenantId,
            @PathVariable TicketPriority priority) {
        return ResponseEntity.ok(supportTicketService.findByTenantIdAndPriority(tenantId, priority));
    }

    @PostMapping
    public ResponseEntity<SupportTicket> create(@RequestBody SupportTicket ticket) {
        return ResponseEntity.status(HttpStatus.CREATED).body(supportTicketService.save(ticket));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SupportTicket> update(@PathVariable UUID id, @RequestBody SupportTicket ticket) {
        return ResponseEntity.ok(supportTicketService.update(id, ticket));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        supportTicketService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
