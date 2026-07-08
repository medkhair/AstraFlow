import { AlertCircle, CheckCircle2, X } from "lucide-react"

function formatPayload(value) {
  if (value == null) return "No response payload was returned."
  if (typeof value === "string") return value

  try {
    return JSON.stringify(value, null, 2)
  } catch {
    return String(value)
  }
}

function getErrorMessage(error) {
  if (typeof error === "string") return error
  if (error?.response?.data) return formatPayload(error.response.data)
  if (error?.message) return error.message

  return "Something went wrong while importing the M3U file."
}

function ImportingM3uResponse({ open, onClose, onLoading, response, error }) {
  if (!open) return null

  const hasError = Boolean(error)
  const title = hasError ? "Import failed" : "Import completed"
  const subtitle = hasError
    ? "The M3U file could not be imported. Review the details below."
    : "The M3U file was imported successfully."

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.()
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="import-m3u-response-title"
    >
      <div className="w-full max-w-2xl rounded-2xl border border-border bg-card shadow-2xl">
        <div className="flex items-start justify-between border-b border-border px-6 py-4">
          <div>
            <h2 id="import-m3u-response-title" className="text-lg font-semibold text-foreground">
              {title}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-full p-1.5 transition-colors hover:bg-muted"
          >
            <X className="size-4 text-muted-foreground" />
          </button>
        </div>

        <div className="px-6 py-6">
          {onLoading ? (
            <div className="flex min-h-48 flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border bg-background/70">
              <div className="flex size-14 items-center justify-center rounded-full bg-brand/10">
                <div className="size-6 animate-spin rounded-full border-2 border-brand border-t-transparent" />
              </div>

              <div className="text-center">
                <p className="text-sm font-medium text-foreground">Importing your M3U file...</p>
                <p className="mt-1 text-sm text-muted-foreground">This may take a few moments.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div
                className={`rounded-xl border p-4 ${
                  hasError
                    ? "border-red-500/20 bg-red-500/10"
                    : "border-emerald-500/20 bg-emerald-500/10"
                }`}
              >
                <div className="flex items-start gap-3">
                  {hasError ? (
                    <AlertCircle className="mt-0.5 size-5 text-red-500" />
                  ) : (
                    <CheckCircle2 className="mt-0.5 size-5 text-emerald-500" />
                  )}

                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      {hasError ? "Import failed" : "Import completed"}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {hasError
                        ? "The import request did not complete successfully."
                        : "The uploaded M3U file was processed and the channels were refreshed."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-background/70 p-4">
                <h4 className="mb-2 text-sm font-semibold text-foreground">
                  {hasError ? "Error details" : "Import response"}
                </h4>

                <pre className="max-h-80 overflow-auto whitespace-pre-wrap break-words rounded-lg bg-background p-3 text-xs text-muted-foreground">
                  {hasError ? getErrorMessage(error) : formatPayload(response)}
                </pre>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end border-t border-border px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default ImportingM3uResponse