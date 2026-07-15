import { useState, useEffect } from "react"
import { X } from "lucide-react"

const PLAN_TYPES = ["MONTHLY", "WEEKLY", "YEARLY", "LIFETIME", "CUSTOM"]

const defaultForm = {
  name: "",
  price: "",
  plan_type: "MONTHLY",
  max_connections: "1",
  is_active: true,
  features: [],
}

export function PlanModal({ open, onClose, onSubmit, initial }) {
  const [form, setForm] = useState(defaultForm)
  const [errors, setErrors] = useState({})
  const isEdit = Boolean(initial)

  console.log("Initial plan data:", initial) // Debug log to check initial data
  console.log("Form state on open:", form) // Debug log to check form state when modal opens


  useEffect(() => {
    if (open) {
      setForm(
        initial
          ? {
              name: initial.name,
              price: initial.price ?? "",
              plan_type: initial.plan_type ?? "IPTV",
              max_connections: initial.max_connections ?? "1",
              is_active: initial.is_active ?? true,
              features: initial.features ?? [],
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
      plan_type: form.plan_type,
      max_connections: Number(form.max_connections),
      is_active: form.is_active,
      features: form.features.filter(f => f.trim() !== ""),
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

          {/* Features section */}
          <div className="px-6 py-5 border-t border-border">
            <h3 className="text-sm font-medium text-foreground mb-2">Features</h3>
            <p className="text-xs text-muted-foreground mb-3">
              Enter the features that will be included in this plan.
            </p>
            {/* Features text iputs would go here */}
            <div className="flex flex-col gap-2">
              {
              form.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={feat}
                    onChange={
                      (e) => {
                      const newFeats = [...form.features]
                      newFeats[idx] = e.target.value
                      setForm((prev) => ({ ...prev, features: newFeats }))
                    }}
                    placeholder={`Feature ${idx + 1}`}
                    className="flex-1 h-10 rounded-lg bg-background px-3 text-sm ring-1 ring-border outline-none focus:ring-brand"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newFeats = form.features.filter((_, i) => i !== idx)
                      setForm((prev) => ({ ...prev, features: newFeats }))
                    }}
                    className="rounded-full p-1.5 hover:bg-muted transition-colors"
                    aria-label={`Remove feature ${idx + 1}`}
                  >   
                    <X className="size-4 text-muted-foreground" />
                  </button>
                </div>
              ))
            }
              <button
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, features: [...prev.features, ""] }))}
                className="self-start rounded-lg bg-muted px-3 py-1 text-sm hover:bg-muted/80 transition-colors"
              >
                + Add Feature
              </button>
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
