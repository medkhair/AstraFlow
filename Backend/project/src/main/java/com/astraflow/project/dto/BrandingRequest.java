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
public class BrandingRequest {

    private UUID tenantId;
    private String logoUrl;
    private String primaryColor;
    private String secondaryColor;
    private String tercaryColor;
    private String quaternaryColor;
    private String titleFontFamily;
    private String bodyFontFamily;
    private String titleFontSizeUrl;
    private String bodyFontSizeUrl;
    private String customCss;
    private String customJs;
}
