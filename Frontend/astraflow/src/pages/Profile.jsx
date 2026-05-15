import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"
import { users, admins, tenants } from "@/data/data"

export default function ProfilePage() {
  const [notifications, setNotifications] = useState(true)
  const adminUser = users.find((u) => u.user_type === "ADMIN")
  const adminRecord = admins[0]
  const tenant = tenants.find((t) => t.id === adminRecord?.tenant_id)
  const initials = adminUser?.full_name.split(" ").map((n) => n[0]).join("")

  return (
    <section className="rounded-2xl bg-card p-6 md:p-8 shadow-sm ring-1 ring-border">
      <h1 className="text-balance text-2xl font-semibold text-foreground">Profile</h1>
      <p className="mt-2 text-muted-foreground">Your admin account details and preferences.</p>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {/* Identity */}
        <div className="rounded-xl bg-background p-5 ring-1 ring-border">
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="size-14">
              <AvatarFallback className="text-lg">{initials}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-foreground">{adminUser?.full_name}</p>
              <p className="text-xs text-muted-foreground">{adminUser?.email}</p>
              <span className="mt-1 inline-block rounded-full bg-brand/10 text-brand text-[10px] px-2 py-0.5 font-medium">
                {adminUser?.user_type}
              </span>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Phone</span>
              <span className="text-foreground">{adminUser?.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status</span>
              <span className="text-green-600 font-medium">{adminUser?.status}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Joined</span>
              <span className="text-foreground">
                {new Date(adminUser?.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Tenant */}
        <div className="rounded-xl bg-background p-5 ring-1 ring-border">
          <h3 className="mb-4 font-semibold text-foreground">Tenant</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Name</span>
              <span className="text-foreground font-medium">{tenant?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subdomain</span>
              <span className="text-foreground">{tenant?.subdomain}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Domain</span>
              <span className="text-foreground">{tenant?.custom_domain}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Currency</span>
              <span className="text-foreground">{tenant?.currency}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Timezone</span>
              <span className="text-foreground">{tenant?.timezone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status</span>
              <span className="text-green-600 font-medium">{tenant?.status}</span>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="rounded-xl bg-background p-5 ring-1 ring-border">
          <h3 className="mb-4 font-semibold text-foreground">Preferences</h3>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-foreground">Email Notifications</span>
            <Switch checked={notifications} onCheckedChange={setNotifications} />
          </div>
        </div>
      </div>
    </section>
  )
}
