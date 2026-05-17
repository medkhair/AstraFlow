import { Tv, FolderOpen, Pencil, Trash2, Upload } from "lucide-react"
import { useState, useRef } from "react"
import { ChannelCategorieModal } from "@/components/modals/ChannelCategorie"
import { ChannelModal } from "@/components/modals/ChannelModal"
import { DeletingModal } from "@/components/modals/DeletingModal"
import { useChannels } from "@/hooks/useChannels"
import { useChannelCategories } from "@/hooks/useChannelCategories"
import { useImportM3u } from "@/hooks/useImportM3u"
import Loading from "@/utils/Loading"

export default function ChannelsPage() {
  const { channels: rawChannels = [], loading: chLoading, error: chError, addChannel, editChannel, removeChannel, refetch: refetchChannels } = useChannels()
  const { categories: rawCategories = [], loading: catLoading, addCategory, editCategory, removeCategory } = useChannelCategories()
  const { loading: importing, importFile } = useImportM3u()
  const m3uInputRef = useRef(null)

  const channels = Array.isArray(rawChannels) ? rawChannels : []
  const categories = Array.isArray(rawCategories) ? rawCategories : []

  const [activeCategory, setActiveCategory] = useState("ALL")
  const [modalOpen, setModalOpen] = useState(false)
  const [categoryToEdit, setCategoryToEdit] = useState(null)
  const [channelModalOpen, setChannelModalOpen] = useState(false)
  const [channelToEdit, setChannelToEdit] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, label: "", onConfirm: null })

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

  async function handleM3uChange(e) {
    const file = e.target.files?.[0]
    if (!file) return
    e.target.value = ""
    await importFile(file)
    await refetchChannels()
  }

  const filtered =
    activeCategory === "ALL"
      ? channels
      : channels.filter((ch) => ch.category_id === activeCategory)

  if (chLoading || catLoading) return <Loading />

  return (
    <div className="space-y-6">
      {/* Categories */}
      <section className="rounded-2xl bg-card p-6 md:p-8 shadow-sm ring-1 ring-border">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold text-foreground">Channel Categories</h2>
          <button
            onClick={openAdd}
            className="rounded-xl bg-brand text-white text-sm px-4 py-2 hover:opacity-90 transition-opacity"
          >
            + Add Category
          </button>
        </div>
        <p className="text-muted-foreground mb-5">Organise channels into categories.</p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => {
            const count = channels.filter((ch) => ch.category_id === cat.id).length
            const isActive = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(isActive ? "ALL" : cat.id)}
                className={`rounded-xl p-4 ring-1 text-left transition-colors ${
                  isActive
                    ? "bg-brand text-white ring-brand"
                    : "bg-background ring-border hover:ring-brand/50"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
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
                      onClick={(e) => { e.stopPropagation(); handleDeleteCategory(cat.id, cat.name) }}
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
                <p className={`text-xs mt-1 ${isActive ? "text-white/80" : "text-muted-foreground"}`}>
                  {cat.description}
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <p className={`text-xs font-medium ${isActive ? "text-white/90" : "text-brand"}`}>
                    {count} channel{count !== 1 ? "s" : ""}
                  </p>
                  {cat.sort_order != null && (
                    <span className={`text-[10px] rounded-full px-2 py-0.5 font-medium ${
                      isActive ? "bg-white/20 text-white" : "bg-brand/10 text-brand"
                    }`}>
                      Order #{cat.sort_order}
                    </span>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </section>

      {/* Channels table */}
      <section className="rounded-2xl bg-card p-6 md:p-8 shadow-sm ring-1 ring-border">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-balance text-2xl font-semibold text-foreground">Channels</h1>
            {activeCategory !== "ALL" && (
              <p className="text-xs text-brand mt-0.5">
                Filtered by: {categories.find((c) => c.id === activeCategory)?.name}
                <button onClick={() => setActiveCategory("ALL")} className="ml-2 underline text-muted-foreground">
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
              className="flex items-center gap-2 rounded-xl border border-border text-sm px-4 py-2 hover:bg-muted transition-colors disabled:opacity-50"
            >
              <Upload className="size-4" />
              {importing ? "Importing..." : "Import M3U"}
            </button>
            <button className="rounded-xl bg-brand text-white text-sm px-4 py-2 hover:opacity-90 transition-opacity"
              onClick={openAddChannel}
            >
              + Add Channel
            </button>
          </div>
        </div>
        <p className="text-muted-foreground mb-6">Manage all live TV channels for your tenant.</p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="pb-3 pr-4 font-medium">#</th>
                <th className="pb-3 pr-4 font-medium">Channel</th>
                <th className="pb-3 pr-4 font-medium">Category</th>
                <th className="pb-3 pr-4 font-medium">Stream URL</th>
                <th className="pb-3 pr-4 font-medium">Status</th>
                <th className="pb-3 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((ch) => {
                const cat = categories.find((c) => c.id === ch.category_id)
                return (
                  <tr key={ch.id} className="hover:bg-background transition-colors">
                    <td className="py-3 pr-4 text-muted-foreground font-mono">{ch.channel_number}</td>
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2">
                        <Tv className="size-4 text-brand shrink-0" />
                        <span className="font-medium text-foreground">{ch.name}</span>
                      </div>
                    </td>
                    <td className="py-3 pr-4">
                      <span className="rounded-full bg-brand/10 text-brand px-2.5 py-0.5 text-xs font-medium">
                        {cat?.name ?? "Uncategorized"}
                      </span>
                    </td>
                    <td className="py-3 pr-4 max-w-xs">
                      <span className="text-muted-foreground truncate block text-xs font-mono">{ch.stream_url}</span>
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
                      <div className="flex items-center gap-1 justify-end">
                        <button
                          onClick={(e) => openEditChannel(e, ch)}
                          aria-label="Edit channel"
                          className="rounded-md p-1.5 hover:bg-muted transition-colors"
                        >
                          <Pencil className="size-3.5 text-muted-foreground" />
                        </button>
                        <button
                          onClick={() => handleDeleteChannel(ch.id, ch.name)}
                          aria-label="Delete channel"
                          className="rounded-md p-1.5 hover:bg-red-500/10 transition-colors"
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
                  <td colSpan={6} className="py-8 text-center text-muted-foreground text-sm">
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
    </div>
  )
}

