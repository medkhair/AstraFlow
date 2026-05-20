import { useState, useEffect, useCallback } from "react";
import { getSubscriptions, createSubscription, updateSubscription, deleteSubscription } from "@/data/crud";

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
      setSubscriptions(arr.map(normalize));
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
    const created = normalize(res?.data ?? res);
    setSubscriptions((prev) => [...prev, created]);
    return created;
  }

  async function editSubscription(subId, subData) {
    const res = await updateSubscription(subId, subData);
    const updated = normalize(res?.data ?? res);
    setSubscriptions((prev) => prev.map((s) => (s.id === subId ? updated : s)));
    return updated;
  }

  async function removeSubscription(subId) {
    await deleteSubscription(subId);
    setSubscriptions((prev) => prev.filter((s) => s.id !== subId));
  }

  return { subscriptions, loading, error, refetch: fetchSubscriptions, addSubscription, editSubscription, removeSubscription };
}
