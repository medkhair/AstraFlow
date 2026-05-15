import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { month: "Dec", revenue: 0, subscriptions: 0 },
  { month: "Jan", revenue: 0, subscriptions: 0 },
  { month: "Feb", revenue: 19.98, subscriptions: 2 },
  { month: "Mar", revenue: 29.97, subscriptions: 3 },
  { month: "Apr", revenue: 19.98, subscriptions: 2 },
  { month: "May", revenue: 9.99, subscriptions: 1 },
]

export function ConsumptionChart() {
  return (
    <section className="min-w-0 rounded-2xl bg-card p-5 shadow-sm ring-1 ring-border">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground dark:text-muted-foreground">Revenue Overview</h3>
        <span className="text-xs text-muted-foreground">Last 6 months</span>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
            <XAxis dataKey="month" tickLine={false} stroke="var(--muted-foreground)" />
            <YAxis tickLine={false} axisLine={false} stroke="var(--muted-foreground)" />
            <Tooltip
              contentStyle={{
                background: "var(--card)",
                borderColor: "var(--border)",
                color: "var(--foreground)",
              }}
            />
            <Legend wrapperStyle={{ color: "var(--muted-foreground)" }} />
            <Bar dataKey="revenue" name="Revenue ($)" fill="var(--chart-1)" radius={[6, 6, 0, 0]} />
            <Bar dataKey="subscriptions" name="Subscriptions" fill="var(--chart-2)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
