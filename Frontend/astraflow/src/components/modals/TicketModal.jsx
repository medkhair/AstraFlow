import { useState, useEffect } from "react"
import { X } from "lucide-react"

const defaultForm = {
  subject: "",
  message: "",
  priority: "MEDIUM",
  status: "OPEN",
}

export function TicketModal({ open, onClose, onSubmit, initial }) {
  const [form, setForm] = useState(defaultForm)
  const [errors, setErrors] = useState({})
  const isEdit = Boolean(initial)

  useEffect(() => {
    if (open) {
      setForm(
        initial
          ? {
              subject: initial.subject ?? "",
              message: initial.message ?? "",
              priority: initial.priority ?? "MEDIUM",
              status: initial.status ?? "OPEN",
            }
          : defaultForm
      )
      setErrors({})
    }
  }, [open, initial])

  if (!open) return null

  function validate() {
    const e = {}
    if (!form.subject.trim()) e.subject = "Subject is required."
    if (!form.message.trim()) e.message = "Message is required."
    return e
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    onSubmit?.({ ...form, subject: form.subject.trim(), message: form.message.trim() })
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      aria-modal="true"
      role="dialog"
      aria-labelledby="ticket-modal-title"
    >
      <div className="w-full max-w-lg rounded-2xl bg-card shadow-xl ring-1 ring-border">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 id="ticket-modal-title" className="text-lg font-semibold text-foreground">
            {isEdit ? "Edit Ticket" : "New Support Ticket"}
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
            {/* Subject */}
            <div className="grid gap-1.5">
              <label htmlFor="tk-subject" className="text-sm font-medium text-foreground">
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                id="tk-subject"
                name="subject"
                type="text"
                value={form.subject}
                onChange={handleChange}
                placeholder="e.g. Stream not working"
                className={`h-10 rounded-lg bg-background px-3 text-sm ring-1 outline-none transition-colors focus:ring-brand ${
                  errors.subject ? "ring-red-500" : "ring-border"
                }`}
              />
              {errors.subject && <p className="text-xs text-red-500">{errors.subject}</p>}
            </div>

            {/* Message */}
            <div className="grid gap-1.5">
              <label htmlFor="tk-message" className="text-sm font-medium text-foreground">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="tk-message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Describe the issue..."
                rows={4}
                className={`rounded-lg bg-background px-3 py-2 text-sm ring-1 outline-none transition-colors focus:ring-brand resize-none ${
                  errors.message ? "ring-red-500" : "ring-border"
                }`}
              />
              {errors.message && <p className="text-xs text-red-500">{errors.message}</p>}
            </div>

            {/* Priority + Status */}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-1.5">
                <label htmlFor="tk-priority" className="text-sm font-medium text-foreground">
                  Priority
                </label>
                <select
                  id="tk-priority"
                  name="priority"
                  value={form.priority}
                  onChange={handleChange}
                  className="h-10 rounded-lg bg-background px-3 text-sm ring-1 ring-border outline-none focus:ring-brand"
                >
                  <option value="LOW">LOW</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="HIGH">HIGH</option>
                </select>
              </div>
              <div className="grid gap-1.5">
                <label htmlFor="tk-status" className="text-sm font-medium text-foreground">
                  Status
                </label>
                <select
                  id="tk-status"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="h-10 rounded-lg bg-background px-3 text-sm ring-1 ring-border outline-none focus:ring-brand"
                >
                  <option value="OPEN">OPEN</option>
                  <option value="IN_PROGRESS">IN PROGRESS</option>
                  <option value="CLOSED">CLOSED</option>
                </select>
              </div>
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
              {isEdit ? "Save Changes" : "Create Ticket"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
