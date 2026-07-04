package com.astraflow.project.dto.response;

import com.astraflow.project.model.enums.PlanType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PlanResponse {

    private UUID id;
    private UUID tenantId;
    private String name;
    private BigDecimal price;
    private PlanType planType;
    private Integer durationDays;
    private Integer maxConnections;
    private Boolean isActive;
    private List<String> features;
}
