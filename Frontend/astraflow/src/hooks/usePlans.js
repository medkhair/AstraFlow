import { useState, useEffect, useCallback } from "react";
import { getPlans, createPlan, updatePlan, deletePlan, tenantId } from "@/data/crud";

function normalize(p) {
  return {
    id: p.id,
    name: p.name,
    price: p.price,
    duration_days: p.durationDays ?? p.duration_days,
    plan_type: p.planType ?? p.plan_type,
    max_connections: p.maxConnections ?? p.max_connections,
    is_active: p.isActive ?? p.is_active,
  };
}

function toApiPayload(form) {
  return {
    name: form.name,
    price: Number(form.price),
    durationDays: Number(form.duration_days),
    planType: form.plan_type,
    maxConnections: Number(form.max_connections),
    isActive: form.is_active,
    tenant: { id: tenantId },
  };
}

export function usePlans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPlans = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPlans();
      const arr = Array.isArray(data) ? data : (data?.data ?? data?.results ?? []);
      setPlans(arr.map(normalize));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  async function addPlan(formData) {
    const res = await createPlan(toApiPayload(formData));
    const created = normalize(res?.data ?? res);
    setPlans((prev) => [...prev, created]);
    return created;
  }

  async function editPlan(planId, formData) {
    const res = await updatePlan(planId, toApiPayload(formData));
    const updated = normalize(res?.data ?? res);
    setPlans((prev) => prev.map((p) => (p.id === planId ? updated : p)));
    return updated;
  }

  async function removePlan(planId) {
    await deletePlan(planId);
    setPlans((prev) => prev.filter((p) => p.id !== planId));
  }

  return { plans, loading, error, refetch: fetchPlans, addPlan, editPlan, removePlan };
}


