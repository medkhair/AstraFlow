import { useEffect, useState } from 'react';
import { fetchTickets, createTicket, tenantId } from '../data/crud';
import { useAuth } from './useAuthentication';

export function useSupportTicket() {
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const clientId = localStorage.getItem('clientId');
  const tenantId = localStorage.getItem('tenantId');

  const loadTickets = async (targetClientId = clientId) => {
    if (!targetClientId) {
      setTickets([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await fetchTickets(targetClientId);
      const items = Array.isArray(data) ? data : data?.content ?? [];
      setTickets(items);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to load support tickets.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTickets(clientId);
  }, [clientId]);

  const submitTicket = async (subject, description) => {
    if (!clientId) {
      setError('You must be logged in to submit a ticket.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const created = await createTicket(tenantId,clientId, subject, description);
      setTickets((prev) => [created, ...prev]);
      return created;
    } catch (err) {
      const message =
        err?.response?.data?.message || 'Failed to create support ticket.';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    tickets,
    loading,
    error,
    submitTicket,
    refreshTickets: loadTickets,
  };
}