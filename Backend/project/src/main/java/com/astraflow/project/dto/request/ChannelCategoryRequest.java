package com.astraflow.project.dto.request;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChannelCategoryRequest {

    private UUID tenantId;
    private String name;
    private String description;
    private Integer sortOrder;
}
