package com.astraflow.project.mapper;

import com.astraflow.project.dto.request.SupportTicketRequest;
import com.astraflow.project.dto.response.SupportTicketResponse;
import com.astraflow.project.model.Admin;
import com.astraflow.project.model.Client;
import com.astraflow.project.model.SupportTicket;
import com.astraflow.project.model.Tenant;

public class SupportTicketMapper {
/*
    private SupportTicketMapper() {
    }

    public static SupportTicket toSupportTicket(SupportTicketRequest request) {
        if (request == null) {
            return null;
        }
        SupportTicket ticket = new SupportTicket();
        ticket.setSubject(request.getSubject());
        ticket.setMessage(request.getMessage());
        ticket.setStatus(request.getStatus());
        ticket.setPriority(request.getPriority());

        if (request.getTenantId() != null) {
            Tenant tenant = new Tenant();
            tenant.setId(request.getTenantId());
            ticket.setTenant(tenant);
        }
        if (request.getClientId() != null) {
            Client client = new Client();
            client.setId(request.getClientId());
            ticket.setClient(client);
        }
        if (request.getAdminId() != null) {
            Admin admin = new Admin();
            admin.setId(request.getAdminId());
            ticket.setAdmin(admin);
        }
        return ticket;
    }

    public static SupportTicketResponse toSupportTicketResponse(SupportTicket ticket) {
        if (ticket == null) {
            return null;
        }
        return SupportTicketResponse.builder()
                .id(ticket.getId())
                .tenantId(ticket.getTenant() != null ? ticket.getTenant().getId() : null)
                .clientId(ticket.getClient() != null ? ticket.getClient().getId() : null)
                .adminId(ticket.getAdmin() != null ? ticket.getAdmin().getId() : null)
                .subject(ticket.getSubject())
                .message(ticket.getMessage())
                .status(ticket.getStatus())
                .priority(ticket.getPriority())
                .createdAt(ticket.getCreatedAt())
                .updatedAt(ticket.getUpdatedAt())
                .build();
    }
*/
}