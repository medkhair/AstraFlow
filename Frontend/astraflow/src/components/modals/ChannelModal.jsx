import { useState, useEffect } from "react"
import { X } from "lucide-react"

const defaultForm = {
  name: "",
  channel_number: "",
  category_id: "",
  stream_url: "",
  logo_url: "",
  status: "ACTIVE",
}

export function ChannelModal({ open, onClose, onSubmit, initial, channelCategories }) {
  const [form, setForm] = useState(defaultForm)
  const [errors, setErrors] = useState({})
  const isEdit = Boolean(initial)

  useEffect(() => {
    if (open) {
      setForm(
        initial
          ? {
              name: initial.name,
              channel_number: initial.channel_number ?? "",
              category_id: initial.category_id ?? "",
              stream_url: initial.stream_url ?? "",
              logo_url: initial.logo_url ?? "",
              status: initial.status ?? "ACTIVE",
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
    if (!form.channel_number) e.channel_number = "Channel number is required."
    else if (isNaN(Number(form.channel_number)) || Number(form.channel_number) < 1)
      e.channel_number = "Must be a positive number."
    if (!form.category_id) e.category_id = "Category is required."
    if (!form.stream_url.trim()) e.stream_url = "Stream URL is required."
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
      channel_number: Number(form.channel_number),
      category_id: form.category_id,
      stream_url: form.stream_url.trim(),
      logo_url: form.logo_url.trim() || null,
      status: form.status,
    })
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      aria-modal="true"
      role="dialog"
      aria-labelledby="channel-modal-title"
    >
      <div className="w-full max-w-lg rounded-2xl bg-card shadow-xl ring-1 ring-border">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 id="channel-modal-title" className="text-lg font-semibold text-foreground">
            {isEdit ? "Edit Channel" : "Add Channel"}
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
              <label htmlFor="ch-name" className="text-sm font-medium text-foreground">
                Channel Name <span className="text-red-500">*</span>
              </label>
              <input
                id="ch-name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. ESPN HD"
                className={`h-10 rounded-lg bg-background px-3 text-sm ring-1 outline-none transition-colors focus:ring-brand ${
                  errors.name ? "ring-red-500" : "ring-border"
                }`}
              />
              {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
            </div>

            {/* Number + Category */}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-1.5">
                <label htmlFor="ch-number" className="text-sm font-medium text-foreground">
                  Channel # <span className="text-red-500">*</span>
                </label>
                <input
                  id="ch-number"
                  name="channel_number"
                  type="number"
                  min={1}
                  value={form.channel_number}
                  onChange={handleChange}
                  placeholder="e.g. 101"
                  className={`h-10 rounded-lg bg-background px-3 text-sm ring-1 outline-none transition-colors focus:ring-brand ${
                    errors.channel_number ? "ring-red-500" : "ring-border"
                  }`}
                />
                {errors.channel_number && (
                  <p className="text-xs text-red-500">{errors.channel_number}</p>
                )}
              </div>

              <div className="grid gap-1.5">
                <label htmlFor="ch-category" className="text-sm font-medium text-foreground">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="ch-category"
                  name="category_id"
                  value={form.category_id}
                  onChange={handleChange}
                  className={`h-10 rounded-lg bg-background px-3 text-sm ring-1 outline-none transition-colors focus:ring-brand ${
                    errors.category_id ? "ring-red-500" : "ring-border"
                  }`}
                >
                  <option value="">Select category</option>
                  {channelCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {errors.category_id && (
                  <p className="text-xs text-red-500">{errors.category_id}</p>
                )}
              </div>
            </div>

            {/* Stream URL */}
            <div className="grid gap-1.5">
              <label htmlFor="ch-stream" className="text-sm font-medium text-foreground">
                Stream URL <span className="text-red-500">*</span>
              </label>
              <input
                id="ch-stream"
                name="stream_url"
                type="url"
                value={form.stream_url}
                onChange={handleChange}
                placeholder="https://stream.example.com/channel"
                className={`h-10 rounded-lg bg-background px-3 text-sm ring-1 outline-none transition-colors focus:ring-brand ${
                  errors.stream_url ? "ring-red-500" : "ring-border"
                }`}
              />
              {errors.stream_url && <p className="text-xs text-red-500">{errors.stream_url}</p>}
            </div>

            {/* Logo URL */}
            <div className="grid gap-1.5">
              <label htmlFor="ch-logo" className="text-sm font-medium text-foreground">
                Logo URL
              </label>
              <input
                id="ch-logo"
                name="logo_url"
                type="url"
                value={form.logo_url}
                onChange={handleChange}
                placeholder="https://cdn.example.com/logo.png"
                className="h-10 rounded-lg bg-background px-3 text-sm ring-1 ring-border outline-none focus:ring-brand"
              />
            </div>

            {/* Status */}
            <div className="grid gap-1.5">
              <label htmlFor="ch-status" className="text-sm font-medium text-foreground">
                Status
              </label>
              <select
                id="ch-status"
                name="status"
                value={form.status}
                onChange={handleChange}
                className="h-10 rounded-lg bg-background px-3 text-sm ring-1 ring-border outline-none focus:ring-brand"
              >
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
              </select>
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
              {isEdit ? "Save Changes" : "Add Channel"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
