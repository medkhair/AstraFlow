import { useState } from "react"
import { Pencil, Trash2 } from "lucide-react"
import { useSupportTickets } from "@/hooks/useSupportTickets"
import { TicketModal } from "@/components/modals/TicketModal"
import { DeletingModal } from "@/components/modals/DeletingModal"
import Loading from "@/utils/Loading"

const priorityColor = {
  HIGH: "bg-red-500/10 text-red-600",
  MEDIUM: "bg-yellow-500/10 text-yellow-600",
  LOW: "bg-green-500/10 text-green-600",
}

const statusColor = {
  OPEN: "bg-orange-500/10 text-orange-600",
  IN_PROGRESS: "bg-blue-500/10 text-blue-600",
  CLOSED: "bg-muted text-muted-foreground",
}

export default function TicketsPage() {
  const { tickets, loading, addTicket, editTicket, removeTicket } = useSupportTickets()
  const [filter, setFilter] = useState("ALL")
  const [ticketModalOpen, setTicketModalOpen] = useState(false)
  const [ticketToEdit, setTicketToEdit] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, label: "", onConfirm: null })

  function askDelete(label, onConfirm) {
    setDeleteConfirm({ open: true, label, onConfirm })
  }

  function openAdd() {
    setTicketToEdit(null)
    setTicketModalOpen(true)
  }

  function openEdit(e, ticket) {
    e.stopPropagation()
    setTicketToEdit(ticket)
    setTicketModalOpen(true)
  }

  async function handleTicketSubmit(data) {
    if (ticketToEdit) {
      await editTicket(ticketToEdit.id, data)
    } else {
      await addTicket(data)
    }
  }

  const filtered = filter === "ALL" ? tickets : tickets.filter((t) => t.status === filter)

  if (loading) return <Loading />

  return (
    <section className="rounded-2xl bg-card p-6 md:p-8 shadow-sm ring-1 ring-border">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-balance text-2xl font-semibold text-foreground">Support Tickets</h1>
        <button
          onClick={openAdd}
          className="rounded-xl bg-brand text-white text-sm px-4 py-2 hover:opacity-90 transition-opacity"
        >
          + New Ticket
        </button>
      </div>
      <p className="text-muted-foreground">Manage client support requests.</p>

      <div className="mt-4 flex gap-2">
        {["ALL", "OPEN", "IN_PROGRESS", "CLOSED"].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              filter === s ? "bg-brand text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {s === "ALL" ? "All" : s.replace("_", " ")}
          </button>
        ))}
      </div>

      <ul className="mt-6 space-y-3">
        {filtered.map((ticket) => (
          <li key={ticket.id} className="rounded-xl bg-background p-4 ring-1 ring-border">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-foreground truncate">{ticket.subject}</p>
                <p className="text-sm text-muted-foreground mt-1">{ticket.message}</p>
                <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                  {ticket.client_name && (
                    <span>Client: <strong className="text-foreground">{ticket.client_name}</strong></span>
                  )}
                  {ticket.admin_name && (
                    <span>Agent: <strong className="text-foreground">{ticket.admin_name}</strong></span>
                  )}
                  {ticket.created_at && (
                    <span>{new Date(ticket.created_at).toLocaleDateString()}</span>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${priorityColor[ticket.priority] ?? "bg-muted text-muted-foreground"}`}>
                  {ticket.priority}
                </span>
                <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${statusColor[ticket.status] ?? "bg-muted text-muted-foreground"}`}>
                  {ticket.status}
                </span>
                <div className="flex items-center gap-1 mt-1">
                  <button
                    onClick={(e) => openEdit(e, ticket)}
                    aria-label="Edit ticket"
                    className="rounded-md p-1.5 hover:bg-muted transition-colors"
                  >
                    <Pencil className="size-3.5 text-muted-foreground" />
                  </button>
                  <button
                    onClick={() => askDelete(ticket.subject, () => removeTicket(ticket.id))}
                    aria-label="Delete ticket"
                    className="rounded-md p-1.5 hover:bg-red-500/10 transition-colors"
                  >
                    <Trash2 className="size-3.5 text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-sm text-muted-foreground py-8">No tickets found.</p>
        )}
      </ul>

      <TicketModal
        open={ticketModalOpen}
        onClose={() => setTicketModalOpen(false)}
        onSubmit={handleTicketSubmit}
        initial={ticketToEdit}
      />

      <DeletingModal
        open={deleteConfirm.open}
        label={deleteConfirm.label}
        onConfirm={deleteConfirm.onConfirm}
        onClose={() => setDeleteConfirm({ open: false, label: "", onConfirm: null })}
      />
    </section>
  )
}

