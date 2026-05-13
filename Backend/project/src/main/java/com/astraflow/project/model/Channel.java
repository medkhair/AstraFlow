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
}
