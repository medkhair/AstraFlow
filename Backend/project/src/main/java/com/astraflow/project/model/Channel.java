package com.astraflow.project.model;

import com.astraflow.project.model.enums.ChannelStatus;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(
        name = "channels",
        indexes = {
                @Index(name = "idx_channel_tenant", columnList = "tenant_id"),
                @Index(name = "idx_channel_category", columnList = "category_id"),
                @Index(name = "idx_channel_number", columnList = "channel_number")
        }
)
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
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

	public ChannelCategory getCategory() {
		return category;
	}

	public void setCategory(ChannelCategory category) {
		this.category = category;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLogoUrl() {
		return logoUrl;
	}

	public void setLogoUrl(String logoUrl) {
		this.logoUrl = logoUrl;
	}

	public String getStreamUrl() {
		return streamUrl;
	}

	public void setStreamUrl(String streamUrl) {
		this.streamUrl = streamUrl;
	}

	public Integer getChannelNumber() {
		return channelNumber;
	}

	public void setChannelNumber(Integer channelNumber) {
		this.channelNumber = channelNumber;
	}

	public ChannelStatus getStatus() {
		return status;
	}

	public void setStatus(ChannelStatus status) {
		this.status = status;
	}
    
    
    
}
