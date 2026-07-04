package com.astraflow.project.dto.request;

import com.astraflow.project.model.enums.TenantStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TenantRequest {

    private String name;
    private String subdomain;
    private String customDomain;
    private TenantStatus status;
    private String timezone;
    private String currency;
}
