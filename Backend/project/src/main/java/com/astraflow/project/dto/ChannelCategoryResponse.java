package com.astraflow.project.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChannelCategoryResponse {

    private UUID id;
    private UUID tenantId;
    private String name;
    private String description;
    private Integer sortOrder;
}
