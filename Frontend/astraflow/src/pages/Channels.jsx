import { Tv, FolderOpen, Pencil, Trash2, Upload } from "lucide-react"
import { useState, useRef } from "react"
import { ChannelCategorieModal } from "@/components/modals/ChannelCategorie"
import { ChannelModal } from "@/components/modals/ChannelModal"
import { DeletingModal } from "@/components/modals/DeletingModal"
import ImportingM3uResponse from "@/components/modals/ImportingM3uResponse"
import { useChannels } from "@/hooks/useChannels"
import { useChannelCategories } from "@/hooks/useChannelCategories"
import { useImportM3u } from "@/hooks/useImportM3u"
import Loading from "@/utils/Loading"

export default function ChannelsPage() {
  const {
    channels: rawChannels = [],
    loading: chLoading,
    error: chError,
    addChannel,
    editChannel,
    removeChannel,
    refetch: refetchChannels,
  } = useChannels()

  const {
    categories: rawCategories = [],
    loading: catLoading,
    addCategory,
    editCategory,
    removeCategory,
    refetch: refetchCategories,
  } = useChannelCategories()

  const { loading: importing, importFile, reset: resetImport } = useImportM3u()
  const m3uInputRef = useRef(null)

  const channels = Array.isArray(rawChannels) ? rawChannels : []
  const categories = Array.isArray(rawCategories) ? rawCategories : []

  const [activeCategory, setActiveCategory] = useState("ALL")
  const [modalOpen, setModalOpen] = useState(false)
  const [categoryToEdit, setCategoryToEdit] = useState(null)
  const [channelModalOpen, setChannelModalOpen] = useState(false)
  const [channelToEdit, setChannelToEdit] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, label: "", onConfirm: null })
  const [importModalOpen, setImportModalOpen] = useState(false)
  const [importModalResponse, setImportModalResponse] = useState(null)
  const [importModalError, setImportModalError] = useState(null)

  function askDelete(label, onConfirm) {
    setDeleteConfirm({ open: true, label, onConfirm })
  }

  function openAdd() {
    setCategoryToEdit(null)
    setModalOpen(true)
  }

  function openEdit(e, cat) {
    e.stopPropagation()
    setCategoryToEdit(cat)
    setModalOpen(true)
  }

  async function handleCategorySubmit(data) {
    if (categoryToEdit) {
      await editCategory(categoryToEdit.id, data)
    } else {
      await addCategory(data)
    }
  }

  function handleDeleteCategory(id, name) {
    askDelete(name, () => {
      removeCategory(id)
      if (activeCategory === id) setActiveCategory("ALL")
    })
  }

  function openAddChannel() {
    setChannelToEdit(null)
    setChannelModalOpen(true)
  }

  function openEditChannel(e, ch) {
    e.stopPropagation()
    setChannelToEdit(ch)
    setChannelModalOpen(true)
  }

  async function handleChannelSubmit(data) {
    if (channelToEdit) {
      await editChannel(channelToEdit.id, data)
    } else {
      await addChannel(data)
    }
  }

  function handleDeleteChannel(id, name) {
    askDelete(name, () => removeChannel(id))
  }

  function closeImportModal() {
    setImportModalOpen(false)
    setImportModalResponse(null)
    setImportModalError(null)
    resetImport()
  }

  async function handleM3uChange(e) {
    const file = e.target.files?.[0]
    if (!file) return

    e.target.value = ""

    setImportModalResponse(null)
    setImportModalError(null)
    setImportModalOpen(true)

    try {
      const data = await importFile(file)
      setImportModalResponse(data)
      await Promise.all([refetchChannels(), refetchCategories()])
    } catch (err) {
      setImportModalError(err)
    }
  }

  const filtered =
    activeCategory === "ALL"
      ? channels
      : channels.filter((ch) => ch.category_id === activeCategory)

  if (chLoading || catLoading) return <Loading />

  return (
    <div className="space-y-6">
      <section className="rounded-2xl bg-card p-6 md:p-8 shadow-sm ring-1 ring-border">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Channel Categories</h2>
          <button
            onClick={openAdd}
            className="rounded-xl bg-brand px-4 py-2 text-sm text-white transition-opacity hover:opacity-90"
          >
            + Add Category
          </button>
        </div>
        <p className="mb-5 text-muted-foreground">Organise channels into categories.</p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => {
            const count = channels.filter((ch) => ch.category_id === cat.id).length
            const isActive = activeCategory === cat.id

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(isActive ? "ALL" : cat.id)}
                className={`rounded-xl p-4 text-left ring-1 transition-colors ${
                  isActive
                    ? "bg-brand text-white ring-brand"
                    : "bg-background ring-border hover:ring-brand/50"
                }`}
              >
                <div className="mb-2 flex items-center justify-between">
                  <FolderOpen className={`size-5 ${isActive ? "text-white" : "text-brand"}`} />
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => openEdit(e, cat)}
                      aria-label="Edit category"
                      className={`rounded-md p-1 transition-colors ${
                        isActive ? "hover:bg-white/20" : "hover:bg-muted"
                      }`}
                    >
                      <Pencil className={`size-3.5 ${isActive ? "text-white" : "text-muted-foreground"}`} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteCategory(cat.id, cat.name)
                      }}
                      aria-label="Delete category"
                      className={`rounded-md p-1 transition-colors ${
                        isActive ? "hover:bg-white/20" : "hover:bg-red-500/10"
                      }`}
                    >
                      <Trash2 className={`size-3.5 ${isActive ? "text-white" : "text-red-500"}`} />
                    </button>
                  </div>
                </div>

                <p className={`font-semibold ${isActive ? "text-white" : "text-foreground"}`}>{cat.name}</p>
                <p className={`mt-1 text-xs ${isActive ? "text-white/80" : "text-muted-foreground"}`}>
                  {cat.description}
                </p>

                <div className="mt-2 flex items-center justify-between">
                  <p className={`text-xs font-medium ${isActive ? "text-white/90" : "text-brand"}`}>
                    {count} channel{count !== 1 ? "s" : ""}
                  </p>
                  {cat.sort_order != null && (
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                        isActive ? "bg-white/20 text-white" : "bg-brand/10 text-brand"
                      }`}
                    >
                      Order #{cat.sort_order}
                    </span>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </section>

      <section className="rounded-2xl bg-card p-6 md:p-8 shadow-sm ring-1 ring-border">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <h1 className="text-balance text-2xl font-semibold text-foreground">Channels</h1>
            {activeCategory !== "ALL" && (
              <p className="mt-0.5 text-xs text-brand">
                Filtered by: {categories.find((c) => c.id === activeCategory)?.name}
                <button
                  onClick={() => setActiveCategory("ALL")}
                  className="ml-2 text-muted-foreground underline"
                >
                  Clear
                </button>
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <input
              ref={m3uInputRef}
              type="file"
              accept=".m3u,.m3u8"
              className="hidden"
              onChange={handleM3uChange}
            />
            <button
              onClick={() => m3uInputRef.current?.click()}
              disabled={importing}
              className="flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm transition-colors hover:bg-muted disabled:opacity-50"
            >
              <Upload className="size-4" />
              {importing ? "Importing..." : "Import M3U"}
            </button>

            <button
              className="rounded-xl bg-brand px-4 py-2 text-sm text-white transition-opacity hover:opacity-90"
              onClick={openAddChannel}
            >
              + Add Channel
            </button>
          </div>
        </div>

        <p className="mb-6 text-muted-foreground">Manage all live TV channels for your tenant.</p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="pr-4 pb-3 font-medium">#</th>
                <th className="pr-4 pb-3 font-medium">Channel</th>
                <th className="pr-4 pb-3 font-medium">Category</th>
                <th className="pr-4 pb-3 font-medium">Stream URL</th>
                <th className="pr-4 pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium"></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {filtered.map((ch) => {
                const cat = categories.find((c) => c.id === ch.category_id)

                return (
                  <tr key={ch.id} className="transition-colors hover:bg-background">
                    <td className="py-3 pr-4 font-mono text-muted-foreground">{ch.channel_number}</td>
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2">
                        <Tv className="size-4 shrink-0 text-brand" />
                        <span className="font-medium text-foreground">{ch.name}</span>
                      </div>
                    </td>
                    <td className="py-3 pr-4">
                      <span className="rounded-full bg-brand/10 px-2.5 py-0.5 text-xs font-medium text-brand">
                        {cat?.name ?? "Uncategorized"}
                      </span>
                    </td>
                    <td className="max-w-xs py-3 pr-4">
                      <span className="block truncate text-xs font-mono text-muted-foreground">
                        {ch.stream_url}
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          ch.status === "ACTIVE"
                            ? "bg-green-500/10 text-green-600"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {ch.status}
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={(e) => openEditChannel(e, ch)}
                          aria-label="Edit channel"
                          className="rounded-md p-1.5 transition-colors hover:bg-muted"
                        >
                          <Pencil className="size-3.5 text-muted-foreground" />
                        </button>
                        <button
                          onClick={() => handleDeleteChannel(ch.id, ch.name)}
                          aria-label="Delete channel"
                          className="rounded-md p-1.5 transition-colors hover:bg-red-500/10"
                        >
                          <Trash2 className="size-3.5 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-sm text-muted-foreground">
                    No channels in this category.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <ChannelCategorieModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCategorySubmit}
        initial={categoryToEdit}
      />

      <ChannelModal
        open={channelModalOpen}
        onClose={() => setChannelModalOpen(false)}
        onSubmit={handleChannelSubmit}
        initial={channelToEdit}
        channelCategories={categories}
      />

      <DeletingModal
        open={deleteConfirm.open}
        onClose={() => setDeleteConfirm({ open: false, label: "", onConfirm: null })}
        onConfirm={deleteConfirm.onConfirm}
        label={deleteConfirm.label}
      />

      <ImportingM3uResponse
        open={importModalOpen}
        onClose={closeImportModal}
        onLoading={importing}
        response={importModalResponse}
        error={importModalError}
      />
    </div>
  )
}