package com.astraflow.project.dto.request;

import com.astraflow.project.model.enums.TicketPriority;
import com.astraflow.project.model.enums.TicketStatus;
import java.util.UUID;


public class SupportTicketRequest {

    private UUID tenantId;
    private UUID clientId;
    private String subject;
    private String message;

    public SupportTicketRequest() {
    }

    public SupportTicketRequest(
            UUID tenantId,
            UUID clientId,
            String subject,
            String message
    ) {
        this.tenantId = tenantId;
        this.clientId = clientId;
        this.subject = subject;
        this.message = message;
    }

    // Getters & Setters

    public UUID getTenantId() {
        return tenantId;
    }

    public void setTenantId(UUID tenantId) {
        this.tenantId = tenantId;
    }

    public UUID getClientId() {
        return clientId;
    }

    public void setClientId(UUID clientId) {
        this.clientId = clientId;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

  
}