import { usePayments } from "@/hooks/usePayments";
import Loading from "@/utils/Loading";

const methodBadge = {
  CREDIT_CARD: "bg-blue-500/10 text-blue-600",
  PAYPAL: "bg-yellow-500/10 text-yellow-700",
  BANK_TRANSFER: "bg-purple-500/10 text-purple-600",
  STRIPE: "bg-emerald-500/10 text-emerald-600",
};

export default function PaymentsPage() {
  const { payments, loading, error } = usePayments();

  const totalRevenue = payments
    .filter((p) => p.status === "COMPLETED")
    .reduce((sum, p) => sum + Number(p.amount ?? 0), 0);

  if (loading) return <Loading />;
  if (error) {
    return (
      <section className="rounded-2xl bg-card p-6 md:p-8 shadow-sm ring-1 ring-border">
        <h1 className="text-2xl font-semibold text-foreground">Payments</h1>
        <p className="mt-2 text-red-500">Unable to load payments right now.</p>
      </section>
    );
  }

  return (
    <section className="rounded-2xl bg-card p-6 md:p-8 shadow-sm ring-1 ring-border">
      <h1 className="text-balance text-2xl font-semibold text-foreground">Payments</h1>
      <p className="mt-2 text-muted-foreground">Payment history for all client subscriptions.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3 mb-6">
        <div className="rounded-xl bg-background p-4 ring-1 ring-border text-center">
          <div className="text-2xl font-bold text-brand">${totalRevenue.toFixed(2)}</div>
          <div className="text-xs text-muted-foreground mt-1">Total Revenue</div>
        </div>
        <div className="rounded-xl bg-background p-4 ring-1 ring-border text-center">
          <div className="text-2xl font-bold text-foreground">{payments.length}</div>
          <div className="text-xs text-muted-foreground mt-1">Total Transactions</div>
        </div>
        <div className="rounded-xl bg-background p-4 ring-1 ring-border text-center">
          <div className="text-2xl font-bold text-green-600">
            {payments.filter((p) => p.status === "COMPLETED").length}
          </div>
          <div className="text-xs text-muted-foreground mt-1">Completed</div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-muted-foreground">
              <th className="pb-3 pr-4 font-medium">Client</th>
              <th className="pb-3 pr-4 font-medium">Amount</th>
              <th className="pb-3 pr-4 font-medium">Method</th>
              <th className="pb-3 pr-4 font-medium">Transaction ID</th>
              <th className="pb-3 pr-4 font-medium">Date</th>
              <th className="pb-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {payments.map((payment) => (
              <tr key={payment.id} className="hover:bg-background transition-colors">
                <td className="py-3 pr-4 font-medium text-foreground">
                  {payment.client_name ?? "—"}
                </td>
                <td className="py-3 pr-4 font-semibold text-brand">
                  ${Number(payment.amount ?? 0).toFixed(2)}
                </td>
                <td className="py-3 pr-4">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      methodBadge[payment.method] ?? "bg-muted text-muted-foreground"
                    }`}
                  >
                    {payment.method?.replace("_", " ") ?? "Unknown"}
                  </span>
                </td>
                <td className="py-3 pr-4 font-mono text-xs text-muted-foreground">
                  {payment.transaction_id ?? "—"}
                </td>
                <td className="py-3 pr-4 text-muted-foreground">
                  {payment.paid_at ? new Date(payment.paid_at).toLocaleDateString() : "—"}
                </td>
                <td className="py-3">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      payment.status === "COMPLETED"
                        ? "bg-green-500/10 text-green-600"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {payment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}