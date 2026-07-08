package com.astraflow.project.mapper;

import com.astraflow.project.dto.request.ChannelRequest;
import com.astraflow.project.dto.response.ChannelResponse;
import com.astraflow.project.model.Channel;
import com.astraflow.project.model.ChannelCategory;
import com.astraflow.project.model.Tenant;

public class ChannelMapper {
/*
    private ChannelMapper() {
    }

    public static Channel toChannel(ChannelRequest request) {
        if (request == null) {
            return null;
        }
        Channel channel = new Channel();
        channel.setName(request.getName());
        channel.setLogoUrl(request.getLogoUrl());
        channel.setStreamUrl(request.getStreamUrl());
        channel.setChannelNumber(request.getChannelNumber());
        channel.setStatus(request.getStatus());

        if (request.getTenantId() != null) {
            Tenant tenant = new Tenant();
            tenant.setId(request.getTenantId());
            channel.setTenant(tenant);
        }

        if (request.getCategoryId() != null) {
            ChannelCategory category = new ChannelCategory();
            category.setId(request.getCategoryId());
            channel.setCategory(category);
        }

        return channel;
    }

    public static ChannelResponse toChannelResponse(Channel channel) {
        if (channel == null) {
            return null;
        }
        return ChannelResponse.builder()
                .id(channel.getId())
                .tenantId(channel.getTenant() != null ? channel.getTenant().getId() : null)
                .categoryId(channel.getCategory() != null ? channel.getCategory().getId() : null)
                .name(channel.getName())
                .logoUrl(channel.getLogoUrl())
                .streamUrl(channel.getStreamUrl())
                .channelNumber(channel.getChannelNumber())
                .status(channel.getStatus())
                .build();
    }
    
*/
}