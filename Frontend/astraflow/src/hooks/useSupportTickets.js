import { useState, useEffect, useCallback } from "react";
import {
  getSupportTickets,
  createSupportTicket,
  updateSupportTicket,
  deleteSupportTicket,
} from "@/data/crud";
import { tenantId, adminId } from "@/data/crud";
import { clientId } from "@/data/crud";

function normalize(t) {
  return {
    id: t.id,
    subject: t.subject,
    message: t.message,
    priority: t.priority,
    status: t.status,
    client_id: t.client?.id ?? t.clientId ?? t.client_id,
    client_name: t.client?.fullName ?? t.client?.full_name ?? t.clientName ?? t.client_name,
    admin_id: t.admin?.id ?? t.adminId ?? t.admin_id,
    admin_name: t.admin?.fullName ?? t.admin?.full_name ?? t.adminName ?? t.admin_name,
    created_at: t.createdAt ?? t.created_at,
  };
}

function toApiPayload(form) {
  return {
    subject: form.subject,
    message: form.message,
    priority: form.priority,
    status: form.status,
    tenant: { id: tenantId },
    admin: { id: adminId },
    client: { id: clientId },
  };
}

export function useSupportTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTickets = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getSupportTickets();
      const arr = Array.isArray(data) ? data : (data?.data ?? data?.results ?? []);
      setTickets(arr.map(normalize));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  async function addTicket(formData) {
    const res = await createSupportTicket(toApiPayload(formData));
    const created = normalize(res?.data ?? res);
    setTickets((prev) => [created, ...prev]);
    return created;
  }

  async function editTicket(ticketId, formData) {
    const res = await updateSupportTicket(ticketId, toApiPayload(formData));
    const updated = normalize(res?.data ?? res);
    setTickets((prev) => prev.map((t) => (t.id === ticketId ? updated : t)));
    return updated;
  }

  async function removeTicket(ticketId) {
    await deleteSupportTicket(ticketId);
    setTickets((prev) => prev.filter((t) => t.id !== ticketId));
  }

  return { tickets, loading, error, refetch: fetchTickets, addTicket, editTicket, removeTicket };
}
