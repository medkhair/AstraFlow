package com.astraflow.project.dto.response;

import com.astraflow.project.model.enums.TicketPriority;
import com.astraflow.project.model.enums.TicketStatus;
import java.time.LocalDateTime;
import java.util.UUID;


public class SupportTicketResponse {

    private UUID id;
    private String subject;
    private String message;
    private TicketStatus status;
    private TicketPriority priority;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public SupportTicketResponse() {
    }

    public SupportTicketResponse(
            UUID id,
            String subject,
            String message,
            TicketStatus status,
            TicketPriority priority,
            LocalDateTime createdAt,
            LocalDateTime updatedAt
    ) {
        this.id = id;
        this.subject = subject;
        this.message = message;
        this.status = status;
        this.priority = priority;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {

        private UUID id;
        private String subject;
        private String message;
        private TicketStatus status;
        private TicketPriority priority;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public Builder id(UUID id) {
            this.id = id;
            return this;
        }

        public Builder subject(String subject) {
            this.subject = subject;
            return this;
        }

        public Builder message(String message) {
            this.message = message;
            return this;
        }

        public Builder status(TicketStatus status) {
            this.status = status;
            return this;
        }

        public Builder priority(TicketPriority priority) {
            this.priority = priority;
            return this;
        }

        public Builder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public Builder updatedAt(LocalDateTime updatedAt) {
            this.updatedAt = updatedAt;
            return this;
        }

        public SupportTicketResponse build() {
            return new SupportTicketResponse(
                    id,
                    subject,
                    message,
                    status,
                    priority,
                    createdAt,
                    updatedAt
            );
        }
    }

    // Getters

    public UUID getId() {
        return id;
    }

    public String getSubject() {
        return subject;
    }

    public String getMessage() {
        return message;
    }

    public TicketStatus getStatus() {
        return status;
    }

    public TicketPriority getPriority() {
        return priority;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}