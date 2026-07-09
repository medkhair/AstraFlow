import { useState, useEffect, useCallback } from "react";
import {
  getClientsByTenantId,
  createClient,
  updateClient,
  deleteClient,
  getClientSubscription,
  getClientSubscriptionPlan,
  tenantId,
} from "@/data/crud";

function normalizeClient(client) {
  return {
    id: client.id,
    tenant_id: client.tenantId ?? client.tenant_id,
    email: client.email,
    full_name: client.fullName ?? client.full_name,
    phone: client.phone,
    username: client.username,
    status: client.status,
    email_verified: client.emailVerified ?? client.email_verified,
    created_at: client.createdAt ?? client.created_at,
    updated_at: client.updatedAt ?? client.updated_at,
  };
}

function normalizeSubscription(subscription) {
  if (!subscription) return null;

  return {
    id: subscription.id,
    client_id: subscription.clientId ?? subscription.client_id,
    plan_id: subscription.planId ?? subscription.plan_id,
    status: subscription.status,
    start_date: subscription.startDate ?? subscription.start_date,
    end_date: subscription.endDate ?? subscription.end_date,
    trial_end_date: subscription.trialEndDate ?? subscription.trial_end_date,
  };
}

function normalizePlan(plan) {
  if (!plan) return null;

  return {
    id: plan.id,
    name: plan.name,
    price: plan.price,
    duration_days: plan.durationDays ?? plan.duration_days,
    plan_type: plan.planType ?? plan.plan_type,
    max_connections: plan.maxConnections ?? plan.max_connections,
    is_active: plan.isActive ?? plan.is_active,
  };
}

function toApiPayload(formData) {
  const payload = {
    email: formData.email?.trim(),
    fullName: formData.full_name?.trim(),
    phone: formData.phone?.trim(),
    username: formData.username?.trim(),
    status: formData.status ?? "ACTIVE",
    tenantId: localStorage.getItem("tenantId"),
  };

  if (formData.password) payload.password = formData.password;
  return payload;
}

export function useClients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchClients = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const activeTenantId = tenantId || localStorage.getItem("tenantId") || "";
      const data = await getClientsByTenantId(activeTenantId);
      const arr = Array.isArray(data) ? data : (data?.data ?? data?.results ?? []);
      const normalizedClients = arr.map(normalizeClient);

      const enriched = await Promise.all(
        normalizedClients.map(async (client) => {
          try {
            const subResponse = await getClientSubscription(client.id);
            const subscription = normalizeSubscription(
              Array.isArray(subResponse) ? subResponse[0] ?? null : subResponse
            );

            const plan = subscription?.plan_id
              ? normalizePlan(await getClientSubscriptionPlan(subscription.plan_id))
              : null;

            return { ...client, subscription, plan };
          } catch (subError) {
            console.error(`Could not load subscription for client ${client.id}`, subError);
            return { ...client, subscription: null, plan: null };
          }
        })
      );

      setClients(enriched);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  async function addClient(formData) {
    const res = await createClient(toApiPayload(formData));
    const created = normalizeClient(res?.data ?? res);
    setClients((prev) => [{ ...created, subscription: null, plan: null }, ...prev]);
    return created;
  }

  async function editClient(clientId, formData) {
    const res = await updateClient(clientId, toApiPayload(formData));
    const updated = normalizeClient(res?.data ?? res);
    setClients((prev) =>
      prev.map((client) => (client.id === clientId ? { ...client, ...updated } : client))
    );
    return updated;
  }

  async function removeClient(clientId) {
    await deleteClient(clientId);
    setClients((prev) => prev.filter((client) => client.id !== clientId));
  }

  return {
    clients,
    loading,
    error,
    refetch: fetchClients,
    addClient,
    editClient,
    removeClient,
  };
}