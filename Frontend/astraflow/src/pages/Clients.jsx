import { users, clients, subscriptions, plans, devices } from "@/data/data"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Smartphone } from "lucide-react"

export default function ClientsPage() {
  const clientUsers = users.filter((u) => u.user_type === "CLIENT")

  return (
    <section className="rounded-2xl bg-card p-6 md:p-8 shadow-sm ring-1 ring-border">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-balance text-2xl font-semibold text-foreground">Clients</h1>
        <button className="rounded-xl bg-brand text-white text-sm px-4 py-2 hover:opacity-90 transition-opacity">
          + Add Client
        </button>
      </div>
      <p className="text-muted-foreground">All registered clients under your tenant.</p>

      <div className="mt-6 space-y-4">
        {clientUsers.map((client) => {
          const sub = subscriptions.find((s) => s.client_id === client.id)
          const plan = plans.find((p) => p.id === sub?.plan_id)
          const clientDevices = devices.filter((d) => d.client_id === client.id)
          const initials = client.full_name.split(" ").map((n) => n[0]).join("")

          return (
            <div key={client.id} className="rounded-xl bg-background p-5 ring-1 ring-border">
              <div className="flex items-start gap-4">
                <Avatar className="size-12 shrink-0">
                  <AvatarFallback className="bg-brand/10 text-brand font-semibold">
                    {initials}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div>
                      <p className="font-semibold text-foreground">{client.full_name}</p>
                      <p className="text-sm text-muted-foreground">{client.email}</p>
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        client.status === "ACTIVE"
                          ? "bg-green-500/10 text-green-600"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {client.status}
                    </span>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4 text-sm">
                    <div>
                      <span className="text-muted-foreground text-xs">Phone</span>
                      <p className="text-foreground">{client.phone}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">Plan</span>
                      <p className="text-foreground">{plan?.name ?? "No plan"}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">Subscription</span>
                      <p
                        className={
                          sub?.status === "ACTIVE" ? "text-green-600 font-medium" : "text-muted-foreground"
                        }
                      >
                        {sub?.status ?? "None"}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">Devices</span>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Smartphone className="size-3.5 text-muted-foreground" />
                        <span className="text-foreground">{clientDevices.length}</span>
                        {clientDevices[0] && (
                          <span className="text-muted-foreground text-xs">({clientDevices[0].device_type})</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
