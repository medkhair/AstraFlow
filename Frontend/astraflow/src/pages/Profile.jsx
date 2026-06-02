import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"
import { useAdmin } from "@/hooks/useAdmin"
import { Pencil, X, Check, Loader2 } from "lucide-react"

export default function ProfilePage() {
  const { admin, loading, error, editAdmin, updatePassword } = useAdmin()
  const [notifications, setNotifications] = useState(true)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState(null)
  const [form, setForm] = useState({ fullName: "", email: "", phone: "" })

  const [pwForm, setPwForm] = useState({ current: "", next: "", confirm: "" })
  const [pwSaving, setPwSaving] = useState(false)
  const [pwError, setPwError] = useState(null)
  const [pwSuccess, setPwSuccess] = useState(false)

  async function handlePasswordSave(e) {
    e.preventDefault()
    setPwError(null)
    setPwSuccess(false)
    if (!pwForm.current) { setPwError("Current password is required."); return }
    if (pwForm.next.length < 8) { setPwError("New password must be at least 8 characters."); return }
    if (pwForm.next !== pwForm.confirm) { setPwError("Passwords do not match."); return }
    setPwSaving(true)
    try {
      await updatePassword(pwForm.current, pwForm.next)
      setPwForm({ current: "", next: "", confirm: "" })
      setPwSuccess(true)
    } catch (err) {
      setPwError(err?.response?.data?.message ?? "Failed to change password.")
    } finally {
      setPwSaving(false)
    }
  }

  function startEdit() {
    setForm({
      fullName: admin?.fullName ?? "",
      email: admin?.email ?? "",
      phone: admin?.phone ?? "",
    })
    setSaveError(null)
    setEditing(true)
  }

  function cancelEdit() {
    setEditing(false)
    setSaveError(null)
  }

  async function handleSave() {
    setSaving(true)
    setSaveError(null)
    try {
      await editAdmin({
        fullName: form.fullName,
        email: form.email,
        phone: form.phone || null,
      })
      setEditing(false)
    } catch (err) {
      setSaveError(err?.response?.data?.message ?? "Failed to save changes.")
    } finally {
      setSaving(false)
    }
  }

  const initials = admin?.fullName
    ?.split(" ")
    .map((n) => n[0])
    .join("") ?? "?"

  const tenant = admin?.tenant

  return (
    <section className="rounded-2xl bg-card p-6 md:p-8 shadow-sm ring-1 ring-border">
      <h1 className="text-balance text-2xl font-semibold text-foreground">Profile</h1>
      <p className="mt-2 text-muted-foreground">Your admin account details and preferences.</p>

      {loading && (
        <div className="mt-10 flex justify-center">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      )}

      {error && !loading && (
        <p className="mt-6 text-sm text-destructive">Failed to load profile data.</p>
      )}

      {!loading && admin && (
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {/* Identity */}
          <div className="rounded-xl bg-background p-5 ring-1 ring-border">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <Avatar className="size-14">
                  <AvatarFallback className="text-lg">{initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-foreground">{admin.fullName}</p>
                  <p className="text-xs text-muted-foreground">{admin.email}</p>
                  <span className="mt-1 inline-block rounded-full bg-brand/10 text-brand text-[10px] px-2 py-0.5 font-medium">
                    ADMIN
                  </span>
                </div>
              </div>
              {!editing && (
                <button
                  onClick={startEdit}
                  className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  title="Edit profile"
                >
                  <Pencil className="size-4" />
                </button>
              )}
            </div>

            {editing ? (
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Full Name</label>
                  <input
                    className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand"
                    value={form.fullName}
                    onChange={(e) => setForm((p) => ({ ...p, fullName: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Email</label>
                  <input
                    type="email"
                    className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand"
                    value={form.email}
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Phone</label>
                  <input
                    className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand"
                    value={form.phone}
                    onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                    placeholder="Optional"
                  />
                </div>
                {saveError && (
                  <p className="text-xs text-destructive">{saveError}</p>
                )}
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-1.5 rounded-lg bg-brand px-3 py-1.5 text-xs font-medium text-white hover:bg-brand/90 disabled:opacity-60 transition-colors"
                  >
                    {saving ? <Loader2 className="size-3 animate-spin" /> : <Check className="size-3" />}
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    disabled={saving}
                    className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="size-3" />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Username</span>
                  <span className="text-foreground">{admin.username}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phone</span>
                  <span className="text-foreground">{admin.phone || "—"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <span className="text-green-600 font-medium">{admin.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Joined</span>
                  <span className="text-foreground">
                    {new Date(admin.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            )}
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
                <span className="text-foreground">{tenant?.customDomain}</span>
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
      )}

      {/* Change Password */}
      {!loading && admin && (
        <div className="mt-6 rounded-xl bg-background p-5 ring-1 ring-border max-w-sm">
          <h3 className="mb-4 font-semibold text-foreground">Change Password</h3>
          <form onSubmit={handlePasswordSave} className="space-y-3">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Current Password</label>
              <input
                type="password"
                className="w-full rounded-lg border border-border bg-card px-3 py-1.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand"
                value={pwForm.current}
                onChange={(e) => { setPwForm((p) => ({ ...p, current: e.target.value })); setPwSuccess(false) }}
                autoComplete="current-password"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">New Password</label>
              <input
                type="password"
                className="w-full rounded-lg border border-border bg-card px-3 py-1.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand"
                value={pwForm.next}
                onChange={(e) => { setPwForm((p) => ({ ...p, next: e.target.value })); setPwSuccess(false) }}
                autoComplete="new-password"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Confirm New Password</label>
              <input
                type="password"
                className="w-full rounded-lg border border-border bg-card px-3 py-1.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand"
                value={pwForm.confirm}
                onChange={(e) => { setPwForm((p) => ({ ...p, confirm: e.target.value })); setPwSuccess(false) }}
                autoComplete="new-password"
              />
            </div>
            {pwError && <p className="text-xs text-destructive">{pwError}</p>}
            {pwSuccess && <p className="text-xs text-green-600">Password updated successfully.</p>}
            <button
              type="submit"
              disabled={pwSaving}
              className="flex items-center gap-1.5 rounded-lg bg-brand px-4 py-1.5 text-xs font-medium text-white hover:bg-brand/90 disabled:opacity-60 transition-colors"
            >
              {pwSaving ? <Loader2 className="size-3 animate-spin" /> : <Check className="size-3" />}
              Update Password
            </button>
          </form>
        </div>
      )}
    </section>
  )
}
