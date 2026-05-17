package com.astraflow.project.model;

import com.astraflow.project.model.enums.TenantStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(
        name = "tenants",
        indexes = {
                @Index(name = "idx_tenant_subdomain", columnList = "subdomain"),
                @Index(name = "idx_tenant_custom_domain", columnList = "custom_domain")
        }
)
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Tenant {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(updatable = false, nullable = false)
    private UUID id;

    @Column(nullable = false, length = 255)
    private String name;

    @Column(unique = true, nullable = false, length = 100)
    private String subdomain;

    @Column(name = "custom_domain", length = 255)
    private String customDomain;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private TenantStatus status;

    @Column(length = 50)
    private String timezone;

    @Column(length = 10)
    private String currency;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @JsonIgnore
    @OneToOne(mappedBy = "tenant", fetch = FetchType.LAZY, cascade = CascadeType.ALL, optional = true)
    private Branding branding;

    @JsonIgnore
    @OneToMany(mappedBy = "tenant", fetch = FetchType.LAZY)
    @Builder.Default
    private List<Channel> channels = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "tenant", fetch = FetchType.LAZY)
    @Builder.Default
    private List<Plan> plans = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "tenant", fetch = FetchType.LAZY)
    @Builder.Default
    private List<SupportTicket> supportTickets = new ArrayList<>();

	public UUID getId() {
		return id;
	}

	public void setId(UUID id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSubdomain() {
		return subdomain;
	}

	public void setSubdomain(String subdomain) {
		this.subdomain = subdomain;
	}

	public String getCustomDomain() {
		return customDomain;
	}

	public void setCustomDomain(String customDomain) {
		this.customDomain = customDomain;
	}

	public TenantStatus getStatus() {
		return status;
	}

	public void setStatus(TenantStatus status) {
		this.status = status;
	}

	public String getTimezone() {
		return timezone;
	}

	public void setTimezone(String timezone) {
		this.timezone = timezone;
	}

	public String getCurrency() {
		return currency;
	}

	public void setCurrency(String currency) {
		this.currency = currency;
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

	public Branding getBranding() {
		return branding;
	}

	public void setBranding(Branding branding) {
		this.branding = branding;
	}

	public List<Channel> getChannels() {
		return channels;
	}

	public void setChannels(List<Channel> channels) {
		this.channels = channels;
	}

	public List<Plan> getPlans() {
		return plans;
	}

	public void setPlans(List<Plan> plans) {
		this.plans = plans;
	}

	public List<SupportTicket> getSupportTickets() {
		return supportTickets;
	}

	public void setSupportTickets(List<SupportTicket> supportTickets) {
		this.supportTickets = supportTickets;
	}
    
}
