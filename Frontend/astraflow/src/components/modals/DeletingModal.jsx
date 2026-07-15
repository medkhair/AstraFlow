import { useEffect, useState } from "react"
import { Trash2, X } from "lucide-react"

export function DeletingModal({ open, onClose, onConfirm, label }) {
  const [status, setStatus] = useState("idle") // "idle" | "loading" | "success" | "error"
  const [message, setMessage] = useState("")

  useEffect(() => {
      if (!open) {
        setStatus("idle")
        setMessage("")
      }
    }, [open]
  )


  useEffect(() => {
    if (status === "success") {
      const t = setTimeout(() => {
      onClose?.()
      setStatus("idle")
      setMessage("")
    }, 2000)
      return () => clearTimeout(t)
    }
  }, [status, onClose])

  const parseErrorMessage = (err) => {
    if (err?.response?.data) {
      const d = err.response.data
      if (typeof d === "string") return d
      if (d?.message) return d.message
      if (d?.error) return d.error
    }
    if (err?.message) return err.message
    if (typeof err === "string") return err
    return "Failed to delete."
  }

    const handleConfirm = async () => {
      try {
        setStatus("loading")
        await onConfirm?.()
        setMessage("Deleted successfully.")
        setStatus("success")
      } catch (err) {
        const msg = parseErrorMessage(err)
        setMessage(msg)
        console.error("Error deleting:", err, err?.response?.data)
        setStatus("error")
      }
    }

  if (!open) return null

  return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={(e) => { if (e.target === e.currentTarget) onClose() }} aria-modal="true" role="dialog" aria-labelledby="delete-modal-title">
        <div className="w-full max-w-sm rounded-2xl bg-card shadow-xl ring-1 ring-border">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <h2 id="delete-modal-title" className="text-lg font-semibold text-foreground">
            Confirm Delete
            </h2>
            <button onClick={onClose} aria-label="Close modal" className="rounded-full p-1.5 hover:bg-muted transition-colors" >
            <X className="size-4 text-muted-foreground" />
            </button>
          </div>



          {/* Body */}
          <div className="flex flex-col items-center gap-4 px-6 py-8 text-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-red-500/10">
              <Trash2 className="size-7 text-red-500" />
            </div>
            <div className="space-y-1">
              <p className="text-base font-semibold text-foreground">Are you sure?</p>
              {label && (
                <p className="text-sm text-muted-foreground">
                  You are about to delete <span className="font-medium text-foreground">"{label}"</span>. This action cannot be undone.
                </p>
              )}
              {!label && (
                <p className="text-sm text-muted-foreground">
                  This action cannot be undone.
                </p>
              )}
            </div>
          </div>

          {/* Response area (shows success/error) */}
          {status !== "idle" && (
            <div className={`px-6 pb-3 text-sm ${status === "success" ? "text-green-500" : status === "loading" ? "text-muted-foreground" : "text-red-500"}`}>
              {status === "loading" && "Deleting…"}
              {status === "success" && message}
              {status === "error" && message}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              disabled={status === "loading"}
              className="rounded-lg px-4 py-2 text-sm text-muted-foreground hover:bg-muted transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={status === "loading" || status === "success"}
              className="rounded-lg bg-red-500 text-white px-4 py-2 text-sm font-medium hover:bg-red-600 transition-colors disabled:opacity-50"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    )
}
