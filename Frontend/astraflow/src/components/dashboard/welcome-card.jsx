import { useChannels } from "@/hooks/useChannels"
import { useClients } from "@/hooks/useClients"
import { useSubscriptions } from "@/hooks/useSubscriptions"
import { useSupportTickets } from "@/hooks/useSupportTickets"
import { useTenant } from "@/hooks/useTenant"

export function WelcomeCard() {
  const { tenant } = useTenant()
  const { channels } = useChannels()
  const { clients } = useClients()
  const { subscriptions } = useSubscriptions()
  const { tickets: supportTickets } = useSupportTickets()

  const activeSubscriptions = subscriptions.filter((s) => s.status === "ACTIVE").length
  const openTickets = supportTickets.filter((t) => t.status === "OPEN").length

  const admin = localStorage.getItem("tokenSubject");

  return (
    <section className="relative overflow-hidden rounded-3xl bg-sidebar-gradient p-6 text-white">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        {/* Left Side */}
        <div className="max-w-xl md:w-3/5">
          <h1 className="text-balance text-3xl font-semibold">
            Welcome back, {admin ? 
            admin.charAt(0).toUpperCase() + admin.slice(1)
            : "Admin"}
          </h1>
          <p className="mt-2 text-sm leading-6 text-white/90">
            Managing <strong>{tenant?.name}</strong> &mdash; {tenant?.subdomain ? `${tenant.subdomain}.com` : "your tenant"}
          </p>
          <div className="mt-4 flex items-center gap-4 rounded-2xl bg-white/10 px-4 py-3 text-sm">
            <span className="text-2xl">📡</span>
            <div>
              <div className="font-medium">Tenant Status</div>
              <div className="text-white/80">
                {tenant?.status} &middot; {tenant?.timezone} &middot; {tenant?.currency}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side — KPI tiles */}
        <div className="grid grid-cols-2 gap-3 lg:w-2/5">
          <div className="rounded-2xl bg-white/10 p-4 text-center">
            <div className="text-2xl font-bold">{channels.length}</div>
            <div className="text-xs text-white/80 mt-1">Channels</div>
          </div>
          <div className="rounded-2xl bg-white/10 p-4 text-center">
            <div className="text-2xl font-bold">{clients.length}</div>
            <div className="text-xs text-white/80 mt-1">Clients</div>
          </div>
          <div className="rounded-2xl bg-white/10 p-4 text-center">
            <div className="text-2xl font-bold">{activeSubscriptions}</div>
            <div className="text-xs text-white/80 mt-1">Active Subs</div>
          </div>
          <div className="rounded-2xl bg-white/10 p-4 text-center">
            <div className="text-2xl font-bold">{openTickets}</div>
            <div className="text-xs text-white/80 mt-1">Open Tickets</div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-white/10 blur-2xl" />
    </section>
  )
}
