import { useState, useEffect } from "react"
import { useTenant } from "@/hooks/useTenant"
import { useBranding } from "@/hooks/useBranding"

export default function SettingsPage() {
  const { tenant, loading: tenantLoading } = useTenant()
  const { branding, loading: brandingLoading, editBranding } = useBranding()

  const [logoUrl, setLogoUrl] = useState("")
  const [primaryColor, setPrimaryColor] = useState("#6D4DFF")
  const [secondaryColor, setSecondaryColor] = useState("#33C1FF")
  const [tercaryColor, setTercaryColor] = useState("")
  const [quaternaryColor, setQuaternaryColor] = useState("")
  const [titleFontFamily, setTitleFontFamily] = useState("")
  const [bodyFontFamily, setBodyFontFamily] = useState("")
  const [titleFontSizeUrl, setTitleFontSizeUrl] = useState("")
  const [bodyFontSizeUrl, setBodyFontSizeUrl] = useState("")
  const [customCss, setCustomCss] = useState("")
  const [customJs, setCustomJs] = useState("")
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState(null)
  const [savedOk, setSavedOk] = useState(false)

  useEffect(() => {
    if (branding) {
      setLogoUrl(branding.logo_url ?? "")
      setPrimaryColor(branding.primary_color ?? "#6D4DFF")
      setSecondaryColor(branding.secondary_color ?? "#33C1FF")
      setTercaryColor(branding.tercary_color ?? "")
      setQuaternaryColor(branding.quaternary_color ?? "")
      setTitleFontFamily(branding.title_font_family ?? "")
      setBodyFontFamily(branding.body_font_family ?? "")
      setTitleFontSizeUrl(branding.title_font_size_url ?? "")
      setBodyFontSizeUrl(branding.body_font_size_url ?? "")
      setCustomCss(branding.custom_css ?? "")
      setCustomJs(branding.custom_js ?? "")
    }
  }, [branding])

  async function handleSaveBranding() {
    setSaving(true)
    setSaveError(null)
    try {
      await editBranding({
        ...branding,
        logo_url: logoUrl,
        primary_color: primaryColor,
        secondary_color: secondaryColor,
        tercary_color: tercaryColor,
        quaternary_color: quaternaryColor,
        title_font_family: titleFontFamily,
        body_font_family: bodyFontFamily,
        title_font_size_url: titleFontSizeUrl,
        body_font_size_url: bodyFontSizeUrl,
        custom_css: customCss,
        custom_js: customJs,
      })
      setSavedOk(true)
      setTimeout(() => setSavedOk(false), 3000)
    } catch (err) {
      setSaveError(err?.message ?? "Failed to save branding.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Tenant info */}
      <section className="rounded-2xl bg-card p-6 md:p-8 shadow-sm ring-1 ring-border">
        <h1 className="text-balance text-2xl font-semibold text-foreground">Settings</h1>
        <p className="mt-2 text-muted-foreground">Tenant configuration and branding options.</p>

        {tenantLoading ? (
          <p className="mt-6 text-sm text-muted-foreground">Loading tenant info…</p>
        ) : (
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
                <p className="font-medium text-foreground">{value ?? "—"}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Branding */}
      <section className="rounded-2xl bg-card p-6 md:p-8 shadow-sm ring-1 ring-border">
        <h2 className="text-xl font-semibold text-foreground mb-2">Branding</h2>
        <p className="text-muted-foreground mb-6">Customize your tenant's visual identity.</p>

        {brandingLoading ? (
          <p className="text-sm text-muted-foreground">Loading branding…</p>
        ) : (
        <>
        {/* Logo */}
        <div className="mb-6">
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
        </div>

        {/* Colors */}
        <div className="mb-6">
          <p className="text-sm font-medium text-foreground mb-3">Colors</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Primary", value: primaryColor, onChange: setPrimaryColor },
              { label: "Secondary", value: secondaryColor, onChange: setSecondaryColor },
              { label: "Tercary", value: tercaryColor, onChange: setTercaryColor },
              { label: "Quaternary", value: quaternaryColor, onChange: setQuaternaryColor },
            ].map(({ label, value, onChange }) => (
              <label key={label} className="grid gap-2">
                <span className="text-xs text-muted-foreground">{label}</span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={value || "#000000"}
                    onChange={(e) => onChange(e.target.value)}
                    className="h-10 w-14 rounded-md cursor-pointer border border-border bg-background"
                  />
                  <span className="text-xs text-muted-foreground font-mono">{value || "—"}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Fonts */}
        <div className="mb-6">
          <p className="text-sm font-medium text-foreground mb-3">Fonts</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-xs text-muted-foreground">Title Font Family</span>
              <input
                type="text"
                value={titleFontFamily}
                onChange={(e) => setTitleFontFamily(e.target.value)}
                className="h-10 rounded-md bg-background ring-1 ring-border px-3 text-sm outline-none focus:ring-brand"
                placeholder="e.g. Montserrat"
              />
            </label>
            <label className="grid gap-2">
              <span className="text-xs text-muted-foreground">Body Font Family</span>
              <input
                type="text"
                value={bodyFontFamily}
                onChange={(e) => setBodyFontFamily(e.target.value)}
                className="h-10 rounded-md bg-background ring-1 ring-border px-3 text-sm outline-none focus:ring-brand"
                placeholder="e.g. Inter"
              />
            </label>
            <label className="grid gap-2">
              <span className="text-xs text-muted-foreground">Title Font URL</span>
              <input
                type="url"
                value={titleFontSizeUrl}
                onChange={(e) => setTitleFontSizeUrl(e.target.value)}
                className="h-10 rounded-md bg-background ring-1 ring-border px-3 text-sm outline-none focus:ring-brand"
                placeholder="https://fonts.cdnfonts.com/css/..."
              />
            </label>
            <label className="grid gap-2">
              <span className="text-xs text-muted-foreground">Body Font URL</span>
              <input
                type="url"
                value={bodyFontSizeUrl}
                onChange={(e) => setBodyFontSizeUrl(e.target.value)}
                className="h-10 rounded-md bg-background ring-1 ring-border px-3 text-sm outline-none focus:ring-brand"
                placeholder="https://fonts.cdnfonts.com/css/..."
              />
            </label>
          </div>
        </div>

        {/* Custom code */}
        <div className="grid gap-6 md:grid-cols-2">
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
          <label className="grid gap-2">
            <span className="text-sm font-medium text-foreground">Custom JS</span>
            <textarea
              value={customJs}
              onChange={(e) => setCustomJs(e.target.value)}
              rows={7}
              className="rounded-md bg-background ring-1 ring-border px-3 py-2 text-sm font-mono outline-none focus:ring-brand resize-none"
              placeholder='console.log("hello")'
            />
          </label>
        </div>

        <div className="mt-6 flex items-center justify-end gap-4">
          {savedOk && (
            <p className="text-sm text-green-500">Branding saved successfully.</p>
          )}
          {saveError && (
            <p className="text-sm text-red-500">{saveError}</p>
          )}
          <button
            onClick={handleSaveBranding}
            disabled={saving || brandingLoading}
            className="rounded-xl bg-brand text-white text-sm px-6 py-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Saving…" : "Save Branding"}
          </button>
        </div>
        </>
        )}
      </section>
    </div>
  )
}
