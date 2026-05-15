import { Tv, Users, CreditCard, Headphones, TrendingUp } from "lucide-react"

const IconMap = {
  tv: Tv,
  users: Users,
  creditcard: CreditCard,
  support: Headphones,
  revenue: TrendingUp,
}

export function DeviceCard({ title, value, subtitle, icon = "tv", trend }) {
  const Icon = IconMap[icon] || Tv
  return (
    <div className="rounded-2xl bg-card p-5 shadow-sm ring-1 ring-border">
      <div className="flex items-center justify-between mb-3">
        <Icon className="size-5 text-brand" />
        {trend && <span className="text-xs text-green-500 font-medium">{trend}</span>}
      </div>
      <div className="text-2xl font-bold text-foreground">{value}</div>
      <h4 className="text-sm font-medium text-foreground mt-1">{title}</h4>
      {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
    </div>
  )
}
