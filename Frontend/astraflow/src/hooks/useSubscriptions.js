import { useState, useEffect, useCallback } from "react";
import {
  getSubscriptions,
  createSubscription,
  updateSubscription,
  deleteSubscription,
  getPlans,
  getClientsByTenantId,
  tenantId,
} from "@/data/crud";

function normalize(s) {
  return {
    id: s.id,
    client_id: s.client?.id ?? s.clientId ?? s.client_id,
    client_name: s.client?.fullName ?? s.client?.full_name ?? s.clientName ?? s.client_name,
    plan_id: s.plan?.id ?? s.planId ?? s.plan_id,
    plan_name: s.plan?.name ?? s.planName ?? s.plan_name,
    start_date: s.startDate ?? s.start_date,
    end_date: s.endDate ?? s.end_date,
    status: s.status,
  };
}

async function enrichSubscriptions(rawItems) {
  const activeTenantId = tenantId || localStorage.getItem("tenantId") || "";

  const [clientsResponse, plansResponse] = await Promise.all([
    getClientsByTenantId(activeTenantId),
    getPlans(),
  ]);

  const clients = Array.isArray(clientsResponse)
    ? clientsResponse
    : (clientsResponse?.data ?? clientsResponse?.results ?? []);

  const plans = Array.isArray(plansResponse)
    ? plansResponse
    : (plansResponse?.data ?? plansResponse?.results ?? []);

  const clientById = new Map(clients.map((c) => [c.id, c]));
  const planById = new Map(plans.map((p) => [p.id, p]));

  return (Array.isArray(rawItems) ? rawItems : [rawItems]).map((item) => {
    const sub = normalize(item);
    const client = clientById.get(sub.client_id);
    const plan = planById.get(sub.plan_id);

    return {
      ...sub,
      client_name:
        sub.client_name ??
        client?.fullName ??
        client?.full_name ??
        sub.client_id,
      plan_name:
        sub.plan_name ??
        plan?.name ??
        sub.plan_id,
    };
  });
}

export function useSubscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSubscriptions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getSubscriptions();
      const arr = Array.isArray(data) ? data : (data?.data ?? data?.results ?? []);
      setSubscriptions(await enrichSubscriptions(arr));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  async function addSubscription(subData) {
    const res = await createSubscription(subData);
    const created = await enrichSubscriptions(res?.data ?? res);
    setSubscriptions((prev) => [...prev, created[0]]);
    return created[0];
  }

  async function editSubscription(subId, subData) {
    const res = await updateSubscription(subId, subData);
    const updated = await enrichSubscriptions(res?.data ?? res);
    setSubscriptions((prev) => prev.map((s) => (s.id === subId ? updated[0] : s)));
    return updated[0];
  }

  async function removeSubscription(subId) {
    await deleteSubscription(subId);
    setSubscriptions((prev) => prev.filter((s) => s.id !== subId));
  }

  return {
    subscriptions,
    loading,
    error,
    refetch: fetchSubscriptions,
    addSubscription,
    editSubscription,
    removeSubscription,
  };
}