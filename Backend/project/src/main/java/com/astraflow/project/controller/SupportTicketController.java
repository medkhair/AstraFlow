package com.astraflow.project.controller;

import com.astraflow.project.dto.request.SupportTicketRequest;
import com.astraflow.project.dto.response.SupportTicketResponse;
import com.astraflow.project.model.SupportTicket;
import com.astraflow.project.model.enums.TicketPriority;
import com.astraflow.project.model.enums.TicketStatus;
import com.astraflow.project.service.SupportTicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;
import java.util.UUID;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/support-tickets")
@PreAuthorize("hasAnyRole('OWNER', 'ADMIN', 'CLIENT')")
public class SupportTicketController {

    @Autowired
    private SupportTicketService supportTicketService;


    // =========================================================
    // OLD METHODS
    // =========================================================

    @GetMapping
    public ResponseEntity<List<SupportTicket>> findAll() {
        return ResponseEntity.ok(
                supportTicketService.findAll()
        );
    }

    @GetMapping("/{id}")
        @PreAuthorize("@authorizationService.canAccessTicket(authentication, #id)")
    public ResponseEntity<SupportTicket> findById(
            @PathVariable UUID id
    ) {
        return supportTicketService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/tenant/{tenantId}")
        @PreAuthorize("@authorizationService.canAccessTenant(authentication, #tenantId)")
    public ResponseEntity<List<SupportTicket>> findByTenantId(
            @PathVariable UUID tenantId
    ) {
        return ResponseEntity.ok(
                supportTicketService.findByTenantId(tenantId)
        );
    }

    @GetMapping("/client/{clientId}")
        @PreAuthorize("@authorizationService.canAccessClient(authentication, #clientId)")
    public ResponseEntity<List<SupportTicket>> findByClientId(
            @PathVariable UUID clientId
    ) {
        return ResponseEntity.ok(
                supportTicketService.findByClientId(clientId)
        );
    }

    @GetMapping("/admin/{adminId}")
    public ResponseEntity<List<SupportTicket>> findByAdminId(
            @PathVariable UUID adminId
    ) {
        return ResponseEntity.ok(
                supportTicketService.findByAdminId(adminId)
        );
    }

    @GetMapping("/tenant/{tenantId}/status/{status}")
    public ResponseEntity<List<SupportTicket>> findByTenantIdAndStatus(
            @PathVariable UUID tenantId,
            @PathVariable TicketStatus status
    ) {
        return ResponseEntity.ok(
                supportTicketService.findByTenantIdAndStatus(
                        tenantId,
                        status
                )
        );
    }

    @GetMapping("/tenant/{tenantId}/priority/{priority}")
    public ResponseEntity<List<SupportTicket>> findByTenantIdAndPriority(
            @PathVariable UUID tenantId,
            @PathVariable TicketPriority priority
    ) {
        return ResponseEntity.ok(
                supportTicketService.findByTenantIdAndPriority(
                        tenantId,
                        priority
                )
        );
    }

    @PostMapping
        @PreAuthorize("@authorizationService.canCreateTicket(authentication, #ticket)")
    public ResponseEntity<SupportTicket> create(
            @RequestBody SupportTicket ticket
    ) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(supportTicketService.save(ticket));
    }

    @PutMapping("/{id}")
        @PreAuthorize("@authorizationService.canManageTicket(authentication, #id)")
    public ResponseEntity<SupportTicket> update(
            @PathVariable UUID id,
            @RequestBody SupportTicket ticket
    ) {
        return ResponseEntity.ok(
                supportTicketService.update(id, ticket)
        );
    }

    @DeleteMapping("/{id}")
        @PreAuthorize("@authorizationService.canManageTicket(authentication, #id)")
    public ResponseEntity<Void> delete(
            @PathVariable UUID id
    ) {
        supportTicketService.deleteById(id);
        return ResponseEntity.noContent().build();
    }


    // =========================================================
    // NEW DTO METHODS
    // =========================================================

    /**
     * Create ticket using DTO
     *
     * POST /api/v1/support-tickets/dto
     */
    @PostMapping("/dto")
    public ResponseEntity<SupportTicketResponse> createDto(
            @RequestBody SupportTicketRequest request
    ) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(supportTicketService.create(request));
    }


    /**
     * Update ticket using DTO
     *
     * PUT /api/v1/support-tickets/dto/{id}
     */
    @PutMapping("/dto/{id}")
    public ResponseEntity<SupportTicketResponse> changeDto(
            @PathVariable UUID id,
            @RequestBody SupportTicketRequest request
    ) {

        return ResponseEntity.ok(
                supportTicketService.change(id, request)
        );
    }


    /**
     * Get all tickets as DTO
     *
     * GET /api/v1/support-tickets/dto
     */
    @GetMapping("/dto")
    public ResponseEntity<List<SupportTicketResponse>> fetchAllDto() {

        return ResponseEntity.ok(
                supportTicketService.fetchAll()
        );
    }


    /**
     * Get ticket by ID as DTO
     *
     * GET /api/v1/support-tickets/dto/{id}
     */
    @GetMapping("/dto/{id}")
        @PreAuthorize("@authorizationService.canAccessTicket(authentication, #id)")
    public ResponseEntity<SupportTicketResponse> fetchByIdDto(
            @PathVariable UUID id
    ) {

        return supportTicketService.fetchById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    /**
     * Get tickets by tenant as DTO
     *
     * GET /api/v1/support-tickets/dto/tenant/{tenantId}
     */
    @GetMapping("/dto/tenant/{tenantId}")
    public ResponseEntity<List<SupportTicketResponse>> fetchByTenantIdDto(
            @PathVariable UUID tenantId
    ) {

        return ResponseEntity.ok(
                supportTicketService.fetchByTenantId(tenantId)
        );
    }


    /**
     * Get tickets by client as DTO
     *
     * GET /api/v1/support-tickets/dto/client/{clientId}
     */
    @GetMapping("/dto/client/{clientId}")
    public ResponseEntity<List<SupportTicketResponse>> fetchByClientIdDto(
            @PathVariable UUID clientId
    ) {

        return ResponseEntity.ok(
                supportTicketService.fetchByClientId(clientId)
        );
    }


    /**
     * Get tickets by admin as DTO
     *
     * GET /api/v1/support-tickets/dto/admin/{adminId}
     */
    @GetMapping("/dto/admin/{adminId}")
    public ResponseEntity<List<SupportTicketResponse>> fetchByAdminIdDto(
            @PathVariable UUID adminId
    ) {

        return ResponseEntity.ok(
                supportTicketService.fetchByAdminId(adminId)
        );
    }


    /**
     * Get tickets by tenant and status as DTO
     *
     * GET /api/v1/support-tickets/dto/tenant/{tenantId}/status/{status}
     */
    @GetMapping("/dto/tenant/{tenantId}/status/{status}")
    public ResponseEntity<List<SupportTicketResponse>> fetchByTenantIdAndStatusDto(
            @PathVariable UUID tenantId,
            @PathVariable TicketStatus status
    ) {

        return ResponseEntity.ok(
                supportTicketService.fetchByTenantIdAndStatus(
                        tenantId,
                        status
                )
        );
    }


    /**
     * Get tickets by tenant and priority as DTO
     *
     * GET /api/v1/support-tickets/dto/tenant/{tenantId}/priority/{priority}
     */
    @GetMapping("/dto/tenant/{tenantId}/priority/{priority}")
    public ResponseEntity<List<SupportTicketResponse>> fetchByTenantIdAndPriorityDto(
            @PathVariable UUID tenantId,
            @PathVariable TicketPriority priority
    ) {

        return ResponseEntity.ok(
                supportTicketService.fetchByTenantIdAndPriority(
                        tenantId,
                        priority
                )
        );
    }
}