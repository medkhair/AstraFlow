package com.astraflow.project.mapper;

import com.astraflow.project.dto.request.BrandingRequest;
import com.astraflow.project.dto.response.BrandingResponse;
import com.astraflow.project.model.Branding;
import com.astraflow.project.model.Tenant;

public class BrandingMapper {

    private BrandingMapper() {
    }

    public static Branding toBranding(BrandingRequest request) {
        if (request == null) {
            return null;
        }
        Branding branding = new Branding();
        if (request.getTenantId() != null) {
            Tenant tenant = new Tenant();
            tenant.setId(request.getTenantId());
            branding.setTenant(tenant);
        }
        branding.setLogoUrl(request.getLogoUrl());
        branding.setPrimaryColor(request.getPrimaryColor());
        branding.setSecondaryColor(request.getSecondaryColor());
        branding.setTercaryColor(request.getTercaryColor());
        branding.setQuaternaryColor(request.getQuaternaryColor());
        branding.setTitleFontFamily(request.getTitleFontFamily());
        branding.setBodyFontFamily(request.getBodyFontFamily());
        branding.setTitleFontSizeUrl(request.getTitleFontSizeUrl());
        branding.setBodyFontSizeUrl(request.getBodyFontSizeUrl());
        branding.setCustomCss(request.getCustomCss());
        branding.setCustomJs(request.getCustomJs());
        return branding;
    }

    public static BrandingResponse toBrandingResponse(Branding branding) {
        if (branding == null) {
            return null;
        }
        return BrandingResponse.builder()
                .id(branding.getId())
                .tenantId(branding.getTenant() != null ? branding.getTenant().getId() : null)
                .logoUrl(branding.getLogoUrl())
                .primaryColor(branding.getPrimaryColor())
                .secondaryColor(branding.getSecondaryColor())
                .tercaryColor(branding.getTercaryColor())
                .quaternaryColor(branding.getQuaternaryColor())
                .titleFontFamily(branding.getTitleFontFamily())
                .bodyFontFamily(branding.getBodyFontFamily())
                .titleFontSizeUrl(branding.getTitleFontSizeUrl())
                .bodyFontSizeUrl(branding.getBodyFontSizeUrl())
                .customCss(branding.getCustomCss())
                .customJs(branding.getCustomJs())
                .build();
    }
}