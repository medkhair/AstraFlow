import { useState, useEffect } from "react"
import { X } from "lucide-react"

const PLAN_TYPES = ["MONTHLY", "WEEKLY", "YEARLY", "LIFETIME", "CUSTOM"]

const defaultForm = {
  name: "",
  price: "",
  duration_days: "",
  plan_type: "MONTHLY",
  max_connections: "1",
  is_active: true,
}

export function PlanModal({ open, onClose, onSubmit, initial }) {
  const [form, setForm] = useState(defaultForm)
  const [errors, setErrors] = useState({})
  const isEdit = Boolean(initial)

  useEffect(() => {
    if (open) {
      setForm(
        initial
          ? {
              name: initial.name,
              price: initial.price ?? "",
              duration_days: initial.duration_days ?? "",
              plan_type: initial.plan_type ?? "IPTV",
              max_connections: initial.max_connections ?? "1",
              is_active: initial.is_active ?? true,
            }
          : defaultForm
      )
      setErrors({})
    }
  }, [open, initial])

  if (!open) return null

  function validate() {
    const e = {}
    if (!form.name.trim()) e.name = "Name is required."
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) < 0)
      e.price = "Price must be a non-negative number."
    if (!form.duration_days || isNaN(Number(form.duration_days)) || Number(form.duration_days) < 1)
      e.duration_days = "Duration must be at least 1 day."
    if (!form.max_connections || isNaN(Number(form.max_connections)) || Number(form.max_connections) < 1)
      e.max_connections = "Must be at least 1."
    return e
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    onSubmit?.({
      name: form.name.trim(),
      price: Number(form.price),
      duration_days: Number(form.duration_days),
      plan_type: form.plan_type,
      max_connections: Number(form.max_connections),
      is_active: form.is_active,
    })
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      aria-modal="true"
      role="dialog"
      aria-labelledby="plan-modal-title"
    >
      <div className="w-full max-w-md rounded-2xl bg-card shadow-xl ring-1 ring-border">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 id="plan-modal-title" className="text-lg font-semibold text-foreground">
            {isEdit ? "Edit Plan" : "New Plan"}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-full p-1.5 hover:bg-muted transition-colors"
          >
            <X className="size-4 text-muted-foreground" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto">
            {/* Name */}
            <div className="grid gap-1.5">
              <label htmlFor="plan-name" className="text-sm font-medium text-foreground">
                Plan Name <span className="text-red-500">*</span>
              </label>
              <input
                id="plan-name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Premium Monthly"
                className={`h-10 rounded-lg bg-background px-3 text-sm ring-1 outline-none transition-colors focus:ring-brand ${
                  errors.name ? "ring-red-500" : "ring-border"
                }`}
              />
              {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
            </div>

            {/* Price + Duration */}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-1.5">
                <label htmlFor="plan-price" className="text-sm font-medium text-foreground">
                  Price ($) <span className="text-red-500">*</span>
                </label>
                <input
                  id="plan-price"
                  name="price"
                  type="number"
                  min={0}
                  step={0.01}
                  value={form.price}
                  onChange={handleChange}
                  placeholder="9.99"
                  className={`h-10 rounded-lg bg-background px-3 text-sm ring-1 outline-none transition-colors focus:ring-brand ${
                    errors.price ? "ring-red-500" : "ring-border"
                  }`}
                />
                {errors.price && <p className="text-xs text-red-500">{errors.price}</p>}
              </div>
              <div className="grid gap-1.5">
                <label htmlFor="plan-duration" className="text-sm font-medium text-foreground">
                  Duration (days) <span className="text-red-500">*</span>
                </label>
                <input
                  id="plan-duration"
                  name="duration_days"
                  type="number"
                  min={1}
                  value={form.duration_days}
                  onChange={handleChange}
                  placeholder="30"
                  className={`h-10 rounded-lg bg-background px-3 text-sm ring-1 outline-none transition-colors focus:ring-brand ${
                    errors.duration_days ? "ring-red-500" : "ring-border"
                  }`}
                />
                {errors.duration_days && <p className="text-xs text-red-500">{errors.duration_days}</p>}
              </div>
            </div>

            {/* Plan Type + Max Connections */}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-1.5">
                <label htmlFor="plan-type" className="text-sm font-medium text-foreground">
                  Plan Type
                </label>
                <select
                  id="plan-type"
                  name="plan_type"
                  value={form.plan_type}
                  onChange={handleChange}
                  className="h-10 rounded-lg bg-background px-3 text-sm ring-1 ring-border outline-none focus:ring-brand"
                >
                  {PLAN_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className="grid gap-1.5">
                <label htmlFor="plan-maxconn" className="text-sm font-medium text-foreground">
                  Max Connections <span className="text-red-500">*</span>
                </label>
                <input
                  id="plan-maxconn"
                  name="max_connections"
                  type="number"
                  min={1}
                  value={form.max_connections}
                  onChange={handleChange}
                  placeholder="1"
                  className={`h-10 rounded-lg bg-background px-3 text-sm ring-1 outline-none transition-colors focus:ring-brand ${
                    errors.max_connections ? "ring-red-500" : "ring-border"
                  }`}
                />
                {errors.max_connections && <p className="text-xs text-red-500">{errors.max_connections}</p>}
              </div>
            </div>

            {/* Active toggle */}
            <div className="flex items-center gap-3">
              <input
                id="plan-active"
                name="is_active"
                type="checkbox"
                checked={form.is_active}
                onChange={handleChange}
                className="h-4 w-4 accent-brand"
              />
              <label htmlFor="plan-active" className="text-sm font-medium text-foreground">
                Active
              </label>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-sm text-muted-foreground hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-brand text-white px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              {isEdit ? "Save Changes" : "Create Plan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
