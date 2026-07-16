import { WelcomeCard } from "@/components/dashboard/welcome-card"
import { DeviceCard } from "@/components/dashboard/device-card"
import { AirConditioning } from "@/components/dashboard/air-conditioning"
import { UsersWidget } from "@/components/dashboard/users"
import { ConsumptionChart } from "@/components/dashboard/consumption-chart"
import { Shortcuts } from "@/components/dashboard/shortcuts"
import EnergyWidget from "@/components/dashboard/energy-widget"
import { useChannels } from "@/hooks/useChannels"
import { useClients } from "@/hooks/useClients"
import { useSubscriptions } from "@/hooks/useSubscriptions"
import { useSupportTickets } from "@/hooks/useSupportTickets"
import { usePayments } from "@/hooks/usePayments"

export function MainDashboard() {
  const { channels } = useChannels()
  const { clients } = useClients()
  const { subscriptions } = useSubscriptions()
  const { tickets: supportTickets } = useSupportTickets()
  const { payments } = usePayments()

  const totalRevenue = payments
    .filter((p) => p.status === "COMPLETED")
    .reduce((sum, p) => sum + Number(p.amount ?? 0), 0)

  return (
    <div className="space-y-5">
      <WelcomeCard />

      {/* KPI Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <DeviceCard
          title="Total Channels"
          value={channels.length}
          subtitle="Active streams"
          icon="tv"
        />
        <DeviceCard
          title="Total Clients"
          value={clients.length}
          subtitle="Registered users"
          icon="users"
        />
        <DeviceCard
          title="Active Subscriptions"
          value={subscriptions.filter((s) => s.status === "ACTIVE").length}
          subtitle="This period"
          icon="creditcard"
        />
        <DeviceCard
          title="Open Tickets"
          value={supportTickets.filter((t) => t.status === "OPEN").length}
          subtitle="Pending support"
          icon="support"
          trend={`$${totalRevenue.toFixed(2)} revenue`}
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {/* Left big column */}
        <div className="space-y-5 lg:col-span-2">
          <ConsumptionChart />
          <EnergyWidget />
        </div>

        {/* Right column */}
        <div className="space-y-5">
          <AirConditioning />
          <UsersWidget />
          <Shortcuts />
        </div>
      </div>
    </div>
  )
}
