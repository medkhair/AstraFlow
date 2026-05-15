import { subscriptions, payments, plans, users } from "@/data/data"
import { cn } from "@/lib/utils"

export default function EnergyWidget({ className }) {
  const activeSubs = subscriptions.filter((s) => s.status === "ACTIVE")
  const totalRevenue = payments
    .filter((p) => p.status === "COMPLETED")
    .reduce((sum, p) => sum + p.amount, 0)

  return (
    <section
      className={cn("rounded-2xl bg-card p-4 md:p-6 ring-1 ring-border", className)}
      aria-label="Subscription overview"
    >
      <h3 className="text-sm font-semibold text-muted-foreground mb-4">Subscription Overview</h3>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 mb-6">
        <div className="rounded-xl bg-background ring-1 ring-border p-4 text-center">
          <div className="text-2xl font-bold text-foreground">{subscriptions.length}</div>
          <div className="text-xs text-muted-foreground mt-1">Total</div>
        </div>
        <div className="rounded-xl bg-background ring-1 ring-border p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{activeSubs.length}</div>
          <div className="text-xs text-muted-foreground mt-1">Active</div>
        </div>
        <div className="rounded-xl bg-background ring-1 ring-border p-4 text-center">
          <div className="text-2xl font-bold text-foreground">{plans.length}</div>
          <div className="text-xs text-muted-foreground mt-1">Plans</div>
        </div>
        <div className="rounded-xl bg-background ring-1 ring-border p-4 text-center">
          <div className="text-2xl font-bold text-brand">${totalRevenue.toFixed(2)}</div>
          <div className="text-xs text-muted-foreground mt-1">Revenue</div>
        </div>
      </div>

      <div>
        <h4 className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Active Subscriptions</h4>
        <ul className="space-y-2">
          {activeSubs.map((sub) => {
            const client = users.find((u) => u.id === sub.client_id)
            const plan = plans.find((p) => p.id === sub.plan_id)
            return (
              <li
                key={sub.id}
                className="flex items-center justify-between rounded-xl bg-background px-4 py-3 ring-1 ring-border"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{client?.full_name}</p>
                  <p className="text-xs text-muted-foreground">{plan?.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-brand">${plan?.price}/mo</p>
                  <p className="text-xs text-muted-foreground">Ends {sub.end_date}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
