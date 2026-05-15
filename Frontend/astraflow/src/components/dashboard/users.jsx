import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { users, subscriptions } from "@/data/data"
import { Link } from "react-router-dom"

export function UsersWidget() {
  const clientUsers = users.filter((u) => u.user_type === "CLIENT")

  return (
    <section className="rounded-2xl bg-card p-5 shadow-sm ring-1 ring-border">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Recent Clients</h3>
        <Link to="/clients" className="text-[11px] text-brand hover:underline">View all</Link>
      </div>
      <ul className="space-y-3">
        {clientUsers.map((client) => {
          const sub = subscriptions.find((s) => s.client_id === client.id)
          const initials = client.full_name.split(" ").map((n) => n[0]).join("")
          return (
            <li key={client.id} className="flex items-center gap-3">
              <Avatar className="size-8 ring-2 ring-brand/20">
                <AvatarFallback className="bg-brand/10 text-brand text-xs">{initials}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground truncate">{client.full_name}</p>
                <p className="text-xs text-muted-foreground truncate">{client.email}</p>
              </div>
              <span
                className={`text-[10px] rounded-full px-2 py-0.5 font-medium ${
                  sub?.status === "ACTIVE"
                    ? "bg-green-500/10 text-green-600"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {sub?.status ?? "No sub"}
              </span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
