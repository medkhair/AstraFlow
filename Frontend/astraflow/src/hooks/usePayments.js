import { useState, useEffect, useCallback } from "react";
import {
  getPaymentsByTenantId,
  getSubscriptions,
  getClientsByTenantId,
  tenantId,
} from "@/data/crud";

function normalizePayment(payment) {
  const value = payment ?? {};

  return {
    id: value.id,
    subscription_id: value.subscriptionId ?? value.subscription_id ?? null,
    amount: Number(value.amount ?? 0),
    currency: value.currency ?? "USD",
    method: value.method ?? "UNKNOWN",
    status: value.status ?? "PENDING",
    transaction_id: value.transactionId ?? value.transaction_id ?? null,
    paid_at: value.paidAt ?? value.paid_at ?? null,
  };
}

function normalizeSubscription(subscription) {
  const value = subscription ?? {};

  return {
    id: value.id,
    client_id: value.client?.id ?? value.clientId ?? value.client_id ?? null,
    plan_id: value.plan?.id ?? value.planId ?? value.plan_id ?? null,
    status: value.status,
    start_date: value.startDate ?? value.start_date ?? null,
    end_date: value.endDate ?? value.end_date ?? null,
  };
}

async function enrichPayments(rawItems) {
  const activeTenantId = tenantId || localStorage.getItem("tenantId") || "";

  const [paymentsResponse, subscriptionsResponse, clientsResponse] = await Promise.all([
    getPaymentsByTenantId(activeTenantId),
    getSubscriptions(activeTenantId),
    getClientsByTenantId(activeTenantId),
  ]);

  const payments = Array.isArray(paymentsResponse)
    ? paymentsResponse
    : (paymentsResponse?.data ?? paymentsResponse?.results ?? []);

  const subscriptions = Array.isArray(subscriptionsResponse)
    ? subscriptionsResponse
    : (subscriptionsResponse?.data ?? subscriptionsResponse?.results ?? []);

  const clients = Array.isArray(clientsResponse)
    ? clientsResponse
    : (clientsResponse?.data ?? clientsResponse?.results ?? []);

  const subscriptionById = new Map(
    subscriptions.map((s) => [s.id, normalizeSubscription(s)])
  );

  const clientById = new Map(clients.map((c) => [c.id, c]));

  return (Array.isArray(rawItems) ? rawItems : [rawItems]).map((item) => {
    const payment = normalizePayment(item);
    const subscription = subscriptionById.get(payment.subscription_id);
    const client = clientById.get(subscription?.client_id);

    return {
      ...payment,
      client_name:
        client?.fullName ??
        client?.full_name ??
        subscription?.client_id ??
        payment.subscription_id ??
        "—",
    };
  });
}

export function usePayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPayments = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getPaymentsByTenantId();
      const arr = Array.isArray(data) ? data : (data?.data ?? data?.results ?? []);
      setPayments(await enrichPayments(arr));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  return { payments, loading, error, refetch: fetchPayments };
}