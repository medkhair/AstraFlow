package com.astraflow.project.mapper;

import com.astraflow.project.dto.request.SupportTicketRequest;
import com.astraflow.project.dto.response.SupportTicketResponse;
import com.astraflow.project.model.Client;
import com.astraflow.project.model.SupportTicket;
import com.astraflow.project.model.Tenant;

public class SupportTicketMapper {

    public static SupportTicket toEntity(
            SupportTicketRequest request,
            Tenant tenant,
            Client client
    ) {
        return SupportTicket.builder()
                .tenant(tenant)
                .client(client)
                .subject(request.getSubject())
                .message(request.getMessage())
                .build();
    }

    public static SupportTicketResponse toResponse(SupportTicket ticket) {

        return SupportTicketResponse.builder()
                .id(ticket.getId())
                .subject(ticket.getSubject())
                .message(ticket.getMessage())
                .status(ticket.getStatus())
                .createdAt(ticket.getCreatedAt())
                .updatedAt(ticket.getUpdatedAt())
                .build();
    }
}