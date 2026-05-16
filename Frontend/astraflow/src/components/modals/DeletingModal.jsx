import { Trash2, X } from "lucide-react"

export function DeletingModal({ open, onClose, onConfirm, label }) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      aria-modal="true"
      role="dialog"
      aria-labelledby="delete-modal-title"
    >
      <div className="w-full max-w-sm rounded-2xl bg-card shadow-xl ring-1 ring-border">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 id="delete-modal-title" className="text-lg font-semibold text-foreground">
            Confirm Delete
          </h2>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-full p-1.5 hover:bg-muted transition-colors"
          >
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
            type="button"
            onClick={() => { onConfirm?.(); onClose() }}
            className="rounded-lg bg-red-500 text-white px-4 py-2 text-sm font-medium hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
