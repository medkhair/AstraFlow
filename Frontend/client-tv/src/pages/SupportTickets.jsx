import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSupportTicket } from '../hooks/useSupportTicket';

function formatTicketDate(value) {
  if (!value) return '—';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';

  return date.toLocaleString([], {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function SupportTicketsPage() {
  const { tickets, loading, error, submitTicket, refreshTickets } = useSupportTicket();
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const ticketList = useMemo(() => {
    return Array.isArray(tickets) ? tickets : tickets?.content ?? [];
  }, [tickets]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!subject.trim() || !description.trim()) return;

    setSubmitting(true);
    try {
      await submitTicket(subject.trim(), description.trim());
      setSubject('');
      setDescription('');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="support-page">
      <header className="support-header">
        <div>
          <p className="section-kicker">AstraFlow help</p>
          <h1>Support Tickets</h1>
        </div>

        <div className="support-header-actions">
          <Link to="/" className="ghost-btn">
            Back to channels
          </Link>
        </div>
      </header>

      <div className="support-grid">
        <section className="support-card support-card-form">
          <h2>Open a new ticket</h2>
          <form className="support-form" onSubmit={handleSubmit}>
            <label className="support-field">
              <span>Subject</span>
              <input
                type="text"
                value={subject}
                onChange={(event) => setSubject(event.target.value)}
                placeholder="Describe the issue"
                required
              />
            </label>

            <label className="support-field">
              <span>Message</span>
              <textarea
                rows="6"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Tell us what needs help"
                required
              />
            </label>

            {error ? <p className="support-error">{error}</p> : null}

            <button type="submit" className="support-submit-btn" disabled={submitting || loading}>
              {submitting ? 'Submitting...' : 'Submit ticket'}
            </button>
          </form>
        </section>

        <section className="support-card support-card-list">
          <div className="support-list-header">
            <h2>Recent tickets</h2>
            <button type="button" className="ghost-btn" onClick={refreshTickets}>
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="empty-state">
              <span className="login-spinner" />
            </div>
          ) : ticketList.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">🎫</span>
              <p>No support tickets yet.</p>
            </div>
          ) : (
            <div className="support-list">
              {ticketList.map((ticket, index) => (
                <article key={ticket.id ?? `${ticket.subject}-${index}`} className="support-ticket-item">
                  <div className="support-ticket-meta">
                    <span className="support-ticket-status">{ticket.status ?? 'Open'}</span>
                    <span className="support-ticket-date">{formatTicketDate(ticket.createdAt ?? ticket.created_at)}</span>
                  </div>

                  <h3>{ticket.subject ?? ticket.title ?? 'Untitled ticket'}</h3>
                  <p>{ticket.message ?? ticket.description ?? 'No details provided.'}</p>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
