import { support_tickets, users } from "@/data/data"
import { Link } from "react-router-dom"

const priorityColor = {
  HIGH: "text-red-500 bg-red-500/10",
  MEDIUM: "text-yellow-600 bg-yellow-500/10",
  LOW: "text-green-600 bg-green-500/10",
}

export function AirConditioning() {
  const tickets = support_tickets.slice(0, 3)

  return (
    <section className="rounded-2xl bg-card p-5 shadow-sm ring-1 ring-border">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Support Tickets</h3>
        <Link to="/tickets" className="text-[11px] text-brand hover:underline">View all</Link>
      </div>
      <ul className="space-y-3">
        {tickets.map((ticket) => {
          const client = users.find((u) => u.id === ticket.client_id)
          return (
            <li key={ticket.id} className="rounded-xl bg-background p-3 ring-1 ring-border">
              <div className="flex items-center justify-between gap-2 mb-1">
                <p className="text-xs font-semibold text-foreground truncate">{ticket.subject}</p>
                <span
                  className={`text-[10px] rounded-full px-2 py-0.5 font-medium shrink-0 ${
                    priorityColor[ticket.priority] ?? "text-muted-foreground bg-muted"
                  }`}
                >
                  {ticket.priority}
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground truncate">{ticket.message}</p>
              <div className="mt-1.5 flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground">{client?.full_name}</span>
                <span
                  className={`text-[10px] rounded-full px-2 py-0.5 ${
                    ticket.status === "OPEN"
                      ? "bg-orange-500/10 text-orange-600"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {ticket.status}
                </span>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
