import { useState } from "react";
import { Pencil, Smartphone, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DeletingModal } from "@/components/modals/DeletingModal";
import { ClientModal } from "@/components/modals/ClientModal";
import { useClients } from "@/hooks/useClients";
import Loading from "@/utils/Loading";

export default function ClientsPage() {
  const { clients, loading, error, addClient, editClient, removeClient } = useClients();

  const [clientModalOpen, setClientModalOpen] = useState(false);
  const [clientToEdit, setClientToEdit] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({
    open: false,
    label: "",
    onConfirm: null,
  });

  function openAdd() {
    setClientToEdit(null);
    setClientModalOpen(true);
  }

  function openEdit(e, client) {
    e.stopPropagation();
    setClientToEdit(client);
    setClientModalOpen(true);
  }

  function askDelete(label, onConfirm) {
    setDeleteConfirm({ open: true, label, onConfirm });
  }

  async function handleClientSubmit(data) {
    if (clientToEdit) {
      await editClient(clientToEdit.id, data);
    } else {
      await addClient(data);
    }
  }

  if (loading) return <Loading />;
  if (error) {
    return (
      <div className="rounded-2xl bg-card p-6 text-sm text-red-500">
        Failed to load clients.
      </div>
    );
  }

  return (
    <section className="rounded-2xl bg-card p-6 md:p-8 shadow-sm ring-1 ring-border">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-balance text-2xl font-semibold text-foreground">Clients</h1>
          <p className="text-muted-foreground">All registered clients under your tenant.</p>
        </div>

        <button
          onClick={openAdd}
          className="rounded-xl bg-brand text-white text-sm px-4 py-2 hover:opacity-90 transition-opacity"
        >
          + Add Client
        </button>
      </div>

      <div className="mt-6 space-y-4">
        {clients.map((client) => {
          const initials = (client.full_name ?? "")
            .split(" ")
            .filter(Boolean)
            .map((n) => n[0])
            .join("")
            .slice(0, 2) || (client.username?.[0] ?? "C").toUpperCase();

          return (
            <div key={client.id} className="rounded-xl bg-background p-5 ring-1 ring-border">
              <div className="flex items-start gap-4">
                <Avatar className="size-12 shrink-0">
                  <AvatarFallback className="bg-brand/10 text-brand font-semibold">
                    {initials}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div>
                      <p className="font-semibold text-foreground">{client.full_name}</p>
                      <p className="text-sm text-muted-foreground">{client.email}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          client.status === "ACTIVE"
                            ? "bg-green-500/10 text-green-600"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {client.status}
                      </span>

                      <button
                        onClick={(e) => openEdit(e, client)}
                        aria-label="Edit client"
                        className="rounded-md p-1.5 hover:bg-muted transition-colors"
                      >
                        <Pencil className="size-3.5 text-muted-foreground" />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          askDelete(client.full_name, () => removeClient(client.id));
                        }}
                        aria-label="Delete client"
                        className="rounded-md p-1.5 hover:bg-red-500/10 transition-colors"
                      >
                        <Trash2 className="size-3.5 text-red-500" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4 text-sm">
                    <div>
                      <span className="text-muted-foreground text-xs">Phone</span>
                      <p className="text-foreground">{client.phone || "—"}</p>
                    </div>

                    <div>
                      <span className="text-muted-foreground text-xs">Plan</span>
                      <p className="text-foreground">{client.plan?.name ?? "No plan"}</p>
                    </div>

                    <div>
                      <span className="text-muted-foreground text-xs">Subscription</span>
                      <p
                        className={
                          client.subscription?.status === "ACTIVE"
                            ? "text-green-600 font-medium"
                            : "text-muted-foreground"
                        }
                      >
                        {client.subscription?.status ?? "None"}
                      </p>
                    </div>

                    <div>
                      <span className="text-muted-foreground text-xs">Devices</span>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Smartphone className="size-3.5 text-muted-foreground" />
                        <span className="text-foreground">0</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <ClientModal
        open={clientModalOpen}
        onClose={() => setClientModalOpen(false)}
        onSubmit={handleClientSubmit}
        initial={clientToEdit}
      />

      <DeletingModal
        open={deleteConfirm.open}
        label={deleteConfirm.label}
        onConfirm={deleteConfirm.onConfirm}
        onClose={() => setDeleteConfirm({ open: false, label: "", onConfirm: null })}
      />
    </section>
  );
}