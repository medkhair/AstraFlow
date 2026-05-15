import { Tv, Users, CreditCard, Headphones } from "lucide-react"
import { Link } from "react-router-dom"

const actions = [
  { to: "/channels", icon: Tv, label: "Channels" },
  { to: "/clients", icon: Users, label: "Clients" },
  { to: "/plans", icon: CreditCard, label: "Plans" },
  { to: "/tickets", icon: Headphones, label: "Tickets" },
]

export function Shortcuts() {
  return (
    <section className="rounded-2xl bg-card p-5 shadow-sm ring-1 ring-border">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground dark:text-muted-foreground">Quick Access</h3>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {actions.map(({ to, icon: Icon, label }) => (
          <Link
            key={to}
            to={to}
            className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-background p-4 text-center ring-1 ring-border hover:ring-brand transition-colors"
          >
            <Icon className="size-5 text-brand" />
            <span className="text-xs text-muted-foreground">{label}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
