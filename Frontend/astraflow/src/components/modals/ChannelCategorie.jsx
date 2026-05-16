import { useState, useEffect } from "react"
import { X } from "lucide-react"

const defaultForm = { name: "", description: "", sort_order: "" }

export function ChannelCategorieModal({ open, onClose, onSubmit, initial }) {
  const [form, setForm] = useState(defaultForm)
  const [errors, setErrors] = useState({})
  const isEdit = Boolean(initial)

  useEffect(() => {
    if (open) {
      setForm(
        initial
          ? { name: initial.name, description: initial.description ?? "", sort_order: initial.sort_order ?? "" }
          : defaultForm
      )
      setErrors({})
    }
  }, [open, initial])

  if (!open) return null

  function validate() {
    const e = {}
    if (!form.name.trim()) e.name = "Name is required."
    if (form.sort_order !== "" && (isNaN(Number(form.sort_order)) || Number(form.sort_order) < 1))
      e.sort_order = "Sort order must be a positive number."
    return e
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length) {
      setErrors(e2)
      return
    }
    onSubmit?.({
      name: form.name.trim(),
      description: form.description.trim(),
      sort_order: form.sort_order !== "" ? Number(form.sort_order) : null,
    })
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
    >
      <div className="w-full max-w-md rounded-2xl bg-card shadow-xl ring-1 ring-border">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 id="modal-title" className="text-lg font-semibold text-foreground">
            {isEdit ? "Edit Category" : "Add Channel Category"}
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
          <div className="px-6 py-5 space-y-4">
            {/* Name */}
            <div className="grid gap-1.5">
              <label htmlFor="name" className="text-sm font-medium text-foreground">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Sports"
                className={`h-10 rounded-lg bg-background px-3 text-sm ring-1 outline-none transition-colors focus:ring-brand ${
                  errors.name ? "ring-red-500" : "ring-border"
                }`}
              />
              {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
            </div>

            {/* Description */}
            <div className="grid gap-1.5">
              <label htmlFor="description" className="text-sm font-medium text-foreground">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="e.g. All sports channels"
                rows={3}
                className="rounded-lg bg-background px-3 py-2 text-sm ring-1 ring-border outline-none focus:ring-brand resize-none"
              />
            </div>

            {/* Sort Order */}
            <div className="grid gap-1.5">
              <label htmlFor="sort_order" className="text-sm font-medium text-foreground">
                Sort Order
              </label>
              <input
                id="sort_order"
                name="sort_order"
                type="number"
                min={1}
                value={form.sort_order}
                onChange={handleChange}
                placeholder="e.g. 1"
                className={`h-10 rounded-lg bg-background px-3 text-sm ring-1 outline-none transition-colors focus:ring-brand ${
                  errors.sort_order ? "ring-red-500" : "ring-border"
                }`}
              />
              {errors.sort_order && <p className="text-xs text-red-500">{errors.sort_order}</p>}
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
              {isEdit ? "Save Changes" : "Add Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
