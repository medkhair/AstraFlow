import { channels, channel_categories } from "@/data/data"
import { Tv, Radio } from "lucide-react"

export default function ChannelsPage() {
  return (
    <section className="rounded-2xl bg-card p-6 md:p-8 shadow-sm ring-1 ring-border">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-balance text-2xl font-semibold text-foreground">Channels</h1>
        <button className="rounded-xl bg-brand text-white text-sm px-4 py-2 hover:opacity-90 transition-opacity">
          + Add Channel
        </button>
      </div>
      <p className="text-muted-foreground">Manage all live TV channels for your tenant.</p>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-muted-foreground">
              <th className="pb-3 pr-4 font-medium">#</th>
              <th className="pb-3 pr-4 font-medium">Channel</th>
              <th className="pb-3 pr-4 font-medium">Category</th>
              <th className="pb-3 pr-4 font-medium">Stream URL</th>
              <th className="pb-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {channels.map((ch) => {
              const cat = channel_categories.find((c) => c.id === ch.category_id)
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
                  <td className="py-3">
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
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}
