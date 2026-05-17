package com.astraflow.project.model;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(
        name = "channel_categories",
        indexes = {
                @Index(name = "idx_channel_category_tenant", columnList = "tenant_id")
        }
)
public class ChannelCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(updatable = false, nullable = false)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tenant_id", nullable = false)
    private Tenant tenant;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private Integer sortOrder;

    protected ChannelCategory() {}

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public Tenant getTenant() { return tenant; }
    public void setTenant(Tenant tenant) { this.tenant = tenant; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Integer getSortOrder() { return sortOrder; }
    public void setSortOrder(Integer sortOrder) { this.sortOrder = sortOrder; }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {

        private UUID id;
        private Tenant tenant;
        private String name;
        private String description;
        private Integer sortOrder;

        private Builder() {}

        public Builder id(UUID id) { this.id = id; return this; }
        public Builder tenant(Tenant tenant) { this.tenant = tenant; return this; }
        public Builder name(String name) { this.name = name; return this; }
        public Builder description(String description) { this.description = description; return this; }
        public Builder sortOrder(Integer sortOrder) { this.sortOrder = sortOrder; return this; }

        public ChannelCategory build() {
            ChannelCategory cat = new ChannelCategory();
            cat.id = this.id;
            cat.tenant = this.tenant;
            cat.name = this.name;
            cat.description = this.description;
            cat.sortOrder = this.sortOrder;
            return cat;
        }
    }
}