import { useState, useEffect, useCallback } from "react";
import { getTenantInfo, updateTenantInfo } from "@/data/crud";

function normalize(t) {
  return {
    id: t.id,
    name: t.name,
    subdomain: t.subdomain,
    custom_domain: t.customDomain ?? t.custom_domain,
    status: t.status,
    timezone: t.timezone,
    currency: t.currency,
    created_at: t.createdAt ?? t.created_at,
    updated_at: t.updatedAt ?? t.updated_at,
  };
}

function toApiPayload(form) {
  return {
    name: form.name,
    subdomain: form.subdomain,
    customDomain: form.custom_domain,
    status: form.status,
    timezone: form.timezone,
    currency: form.currency,
  };
}

export function useTenant() {
  const [tenant, setTenant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTenant = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTenantInfo();
      setTenant(normalize(data?.data ?? data));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTenant();
  }, [fetchTenant]);

  async function editTenant(formData) {
    const res = await updateTenantInfo(toApiPayload(formData));
    const updated = normalize(res?.data ?? res);
    setTenant(updated);
    return updated;
  }

  return { tenant, loading, error, refetch: fetchTenant, editTenant };
}
