package com.astraflow.project.dto;

import com.astraflow.project.model.enums.ChannelStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChannelRequest {

    private UUID tenantId;
    private UUID categoryId;
    private String name;
    private String logoUrl;
    private String streamUrl;
    private Integer channelNumber;
    private ChannelStatus status;
}
