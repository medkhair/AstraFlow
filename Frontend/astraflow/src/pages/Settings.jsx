import { brandings, tenants } from "@/data/data"
import { useState } from "react"

export default function SettingsPage() {
  const branding = brandings[0]
  const tenant = tenants[0]

  const [logoUrl, setLogoUrl] = useState(branding?.logo_url ?? "")
  const [primaryColor, setPrimaryColor] = useState(branding?.primary_color ?? "#6D4DFF")
  const [secondaryColor, setSecondaryColor] = useState(branding?.secondary_color ?? "#33C1FF")
  const [customCss, setCustomCss] = useState(branding?.custom_css ?? "")

  return (
    <div className="space-y-6">
      {/* Tenant info */}
      <section className="rounded-2xl bg-card p-6 md:p-8 shadow-sm ring-1 ring-border">
        <h1 className="text-balance text-2xl font-semibold text-foreground">Settings</h1>
        <p className="mt-2 text-muted-foreground">Tenant configuration and branding options.</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 text-sm">
          {[
            { label: "Tenant Name", value: tenant?.name },
            { label: "Subdomain", value: tenant?.subdomain },
            { label: "Custom Domain", value: tenant?.custom_domain },
            { label: "Currency", value: tenant?.currency },
            { label: "Timezone", value: tenant?.timezone },
            { label: "Status", value: tenant?.status },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-xl bg-background p-4 ring-1 ring-border">
              <p className="text-xs text-muted-foreground mb-1">{label}</p>
              <p className="font-medium text-foreground">{value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Branding */}
      <section className="rounded-2xl bg-card p-6 md:p-8 shadow-sm ring-1 ring-border">
        <h2 className="text-xl font-semibold text-foreground mb-2">Branding</h2>
        <p className="text-muted-foreground mb-6">Customize your tenant's visual identity.</p>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <label className="grid gap-2">
              <span className="text-sm font-medium text-foreground">Logo URL</span>
              <input
                type="url"
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
                className="h-10 rounded-md bg-background ring-1 ring-border px-3 text-sm outline-none focus:ring-brand"
                placeholder="https://cdn.example.com/logo.png"
              />
              {logoUrl && (
                <img
                  src={logoUrl}
                  alt="Logo preview"
                  className="h-12 w-auto object-contain rounded-md border border-border"
                  onError={(e) => { e.target.style.display = "none" }}
                />
              )}
            </label>

            <div className="grid grid-cols-2 gap-4">
              <label className="grid gap-2">
                <span className="text-sm font-medium text-foreground">Primary Color</span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="h-10 w-14 rounded-md cursor-pointer border border-border bg-background"
                  />
                  <span className="text-sm text-muted-foreground font-mono">{primaryColor}</span>
                </div>
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-medium text-foreground">Secondary Color</span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    className="h-10 w-14 rounded-md cursor-pointer border border-border bg-background"
                  />
                  <span className="text-sm text-muted-foreground font-mono">{secondaryColor}</span>
                </div>
              </label>
            </div>
          </div>

          <div>
            <label className="grid gap-2">
              <span className="text-sm font-medium text-foreground">Custom CSS</span>
              <textarea
                value={customCss}
                onChange={(e) => setCustomCss(e.target.value)}
                rows={7}
                className="rounded-md bg-background ring-1 ring-border px-3 py-2 text-sm font-mono outline-none focus:ring-brand resize-none"
                placeholder="body { font-family: Arial; }"
              />
            </label>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button className="rounded-xl bg-brand text-white text-sm px-6 py-2 hover:opacity-90 transition-opacity">
            Save Branding
          </button>
        </div>
      </section>
    </div>
  )
}
