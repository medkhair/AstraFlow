package com.astraflow.project.model;

import com.astraflow.project.model.enums.ChannelStatus;
import jakarta.persistence.*;

import java.util.UUID;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(
        name = "channels",
        indexes = {
                @Index(name = "idx_channel_tenant", columnList = "tenant_id"),
                @Index(name = "idx_channel_category", columnList = "category_id"),
                @Index(name = "idx_channel_number", columnList = "channel_number")
        }
)
public class Channel {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(updatable = false, nullable = false)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tenant_id", nullable = false)
    private Tenant tenant;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private ChannelCategory category;

    @Column(nullable = false, length = 255)
    private String name;

    @Column(name = "logo_url", length = 500)
    private String logoUrl;

    @Column(name = "stream_url", length = 500)
    private String streamUrl;

    @Column(name = "channel_number")
    private Integer channelNumber;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private ChannelStatus status;

    protected Channel() {}

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public Tenant getTenant() { return tenant; }
    public void setTenant(Tenant tenant) { this.tenant = tenant; }
    public ChannelCategory getCategory() { return category; }
    public void setCategory(ChannelCategory category) { this.category = category; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getLogoUrl() { return logoUrl; }
    public void setLogoUrl(String logoUrl) { this.logoUrl = logoUrl; }
    public String getStreamUrl() { return streamUrl; }
    public void setStreamUrl(String streamUrl) { this.streamUrl = streamUrl; }
    public Integer getChannelNumber() { return channelNumber; }
    public void setChannelNumber(Integer channelNumber) { this.channelNumber = channelNumber; }
    public ChannelStatus getStatus() { return status; }
    public void setStatus(ChannelStatus status) { this.status = status; }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {

        private UUID id;
        private Tenant tenant;
        private ChannelCategory category;
        private String name;
        private String logoUrl;
        private String streamUrl;
        private Integer channelNumber;
        private ChannelStatus status;

        private Builder() {}

        public Builder id(UUID id) { this.id = id; return this; }
        public Builder tenant(Tenant tenant) { this.tenant = tenant; return this; }
        public Builder category(ChannelCategory category) { this.category = category; return this; }
        public Builder name(String name) { this.name = name; return this; }
        public Builder logoUrl(String logoUrl) { this.logoUrl = logoUrl; return this; }
        public Builder streamUrl(String streamUrl) { this.streamUrl = streamUrl; return this; }
        public Builder channelNumber(Integer channelNumber) { this.channelNumber = channelNumber; return this; }
        public Builder status(ChannelStatus status) { this.status = status; return this; }

        public Channel build() {
            Channel channel = new Channel();
            channel.id = this.id;
            channel.tenant = this.tenant;
            channel.category = this.category;
            channel.name = this.name;
            channel.logoUrl = this.logoUrl;
            channel.streamUrl = this.streamUrl;
            channel.channelNumber = this.channelNumber;
            channel.status = this.status;
            return channel;
        }
    }
}