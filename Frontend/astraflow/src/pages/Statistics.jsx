import { plans, subscriptions, users } from "@/data/data"

export default function PlansPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl bg-card p-6 md:p-8 shadow-sm ring-1 ring-border">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-balance text-2xl font-semibold text-foreground">Plans</h1>
          <button className="rounded-xl bg-brand text-white text-sm px-4 py-2 hover:opacity-90 transition-opacity">
            + New Plan
          </button>
        </div>
        <p className="text-muted-foreground">Manage subscription plans available to your clients.</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => {
            const activeSubs = subscriptions.filter(
              (s) => s.plan_id === plan.id && s.status === "ACTIVE"
            ).length
            return (
              <div key={plan.id} className="rounded-xl bg-background p-5 ring-1 ring-border">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-foreground">{plan.name}</h3>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      plan.is_active
                        ? "bg-green-500/10 text-green-600"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {plan.is_active ? "Active" : "Inactive"}
                  </span>
                </div>
                <div className="text-3xl font-bold text-brand mb-1">${plan.price}</div>
                <div className="text-xs text-muted-foreground mb-3">per {plan.duration_days} days</div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div>Type: <span className="text-foreground font-medium">{plan.plan_type}</span></div>
                  <div>Max connections: <span className="text-foreground font-medium">{plan.max_connections}</span></div>
                  <div>Active subscribers: <span className="text-foreground font-medium">{activeSubs}</span></div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="rounded-2xl bg-card p-6 md:p-8 shadow-sm ring-1 ring-border">
        <h2 className="text-xl font-semibold text-foreground mb-2">Subscriptions</h2>
        <p className="text-muted-foreground mb-6">All client subscriptions and their status.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="pb-3 pr-4 font-medium">Client</th>
                <th className="pb-3 pr-4 font-medium">Plan</th>
                <th className="pb-3 pr-4 font-medium">Start</th>
                <th className="pb-3 pr-4 font-medium">End</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {subscriptions.map((sub) => {
                const client = users.find((u) => u.id === sub.client_id)
                const plan = plans.find((p) => p.id === sub.plan_id)
                return (
                  <tr key={sub.id} className="hover:bg-background transition-colors">
                    <td className="py-3 pr-4 font-medium text-foreground">{client?.full_name}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{plan?.name}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{sub.start_date}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{sub.end_date}</td>
                    <td className="py-3">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          sub.status === "ACTIVE"
                            ? "bg-green-500/10 text-green-600"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {sub.status}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
