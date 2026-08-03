package com.astraflow.project.model;

import com.astraflow.project.model.enums.TicketPriority;
import com.astraflow.project.model.enums.TicketStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(
        name = "support_tickets",
        indexes = {
                @Index(name = "idx_ticket_tenant", columnList = "tenant_id"),
                @Index(name = "idx_ticket_client", columnList = "client_id"),
                @Index(name = "idx_ticket_admin", columnList = "admin_id"),
                @Index(name = "idx_ticket_status", columnList = "status")
        }
)
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SupportTicket {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(updatable = false, nullable = false)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tenant_id", nullable = false)
    private Tenant tenant;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id", nullable = false)
    private Client client;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "admin_id")
    private Admin admin;

    @Column(nullable = false, length = 255)
    private String subject;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String message;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private TicketStatus status;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private TicketPriority priority;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime updatedAt;

	public UUID getId() {
		return id;
	}

	public void setId(UUID id) {
		this.id = id;
	}

	public Tenant getTenant() {
		return tenant;
	}

	public void setTenant(Tenant tenant) {
		this.tenant = tenant;
	}

	public Client getClient() {
		return client;
	}

	public void setClient(Client client) {
		this.client = client;
	}

	public Admin getAdmin() {
		return admin;
	}

	public void setAdmin(Admin admin) {
		this.admin = admin;
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

	public TicketStatus getStatus() {
		return status;
	}

	public void setStatus(TicketStatus status) {
		this.status = status;
	}

	public TicketPriority getPriority() {
		return priority;
	}

	public void setPriority(TicketPriority priority) {
		this.priority = priority;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}

	public static Builder builder() {
	    return new Builder();
	}

	public static class Builder {

	    private Tenant tenant;
	    private Client client;
	    private Admin admin;
	    private String subject;
	    private String message;
	    private TicketStatus status;
	    private TicketPriority priority;

	    public Builder tenant(Tenant tenant) {
	        this.tenant = tenant;
	        return this;
	    }

	    public Builder client(Client client) {
	        this.client = client;
	        return this;
	    }

	    public Builder admin(Admin admin) {
	        this.admin = admin;
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

	    public SupportTicket build() {
	        SupportTicket ticket = new SupportTicket();

	        ticket.setTenant(tenant);
	        ticket.setClient(client);
	        ticket.setAdmin(admin);
	        ticket.setSubject(subject);
	        ticket.setMessage(message);
	        ticket.setStatus(status);
	        ticket.setPriority(priority);

	        return ticket;
	    }
	}
	
    
    
    
    
}
