import { useState, useEffect, useCallback } from "react";
import { getBrandingByTenantId, updateBranding, tenantId } from "@/data/crud";

const BRANDING_ID_KEY = "brandingId";

function normalize(b) {
  return {
    id: b.id,
    logo_url: b.logoUrl ?? b.logo_url,
    primary_color: b.primaryColor ?? b.primary_color,
    secondary_color: b.secondaryColor ?? b.secondary_color,
    tercary_color: b.tercaryColor ?? b.tercary_color,
    quaternary_color: b.quaternaryColor ?? b.quaternary_color,
    title_font_family: b.titleFontFamily ?? b.title_font_family,
    body_font_family: b.bodyFontFamily ?? b.body_font_family,
    title_font_size_url: b.titleFontSizeUrl ?? b.title_font_size_url,
    body_font_size_url: b.bodyFontSizeUrl ?? b.body_font_size_url,
    custom_css: b.customCss ?? b.custom_css,
    custom_js: b.customJs ?? b.custom_js,
  };
}

function toApiPayload(form) {
  return {
    logoUrl: form.logo_url,
    primaryColor: form.primary_color,
    secondaryColor: form.secondary_color,
    tercaryColor: form.tercary_color,
    quaternaryColor: form.quaternary_color,
    titleFontFamily: form.title_font_family,
    bodyFontFamily: form.body_font_family,
    titleFontSizeUrl: form.title_font_size_url,
    bodyFontSizeUrl: form.body_font_size_url,
    customCss: form.custom_css,
    customJs: form.custom_js,
    tenant: { id: tenantId },
  };
}

export function useBranding() {
  const [branding, setBranding] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBranding = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getBrandingByTenantId(tenantId);
      const raw = data?.data ?? data;
      if (raw?.id) {
        localStorage.setItem(BRANDING_ID_KEY, raw.id);
      }
      setBranding(normalize(raw));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBranding();
  }, [fetchBranding]);

  async function editBranding(formData) {
    const storedId = localStorage.getItem(BRANDING_ID_KEY);
    const res = await updateBranding(storedId, toApiPayload(formData));
    const updated = normalize(res?.data ?? res);
    if (updated?.id) {
      localStorage.setItem(BRANDING_ID_KEY, updated.id);
    }
    setBranding(updated);
    return updated;
  }

  return { branding, loading, error, refetch: fetchBranding, editBranding };
}
