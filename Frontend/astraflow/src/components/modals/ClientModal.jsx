import { useEffect, useState } from "react";
import { X } from "lucide-react";

const defaultForm = {
  email: "",
  full_name: "",
  phone: "",
  username: "",
  password: "",
  status: "ACTIVE",
};

export function ClientModal({ open, onClose, onSubmit, initial }) {
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState({});
  const isEdit = Boolean(initial);

  useEffect(() => {
    if (open) {
      setForm(
        initial
          ? {
              email: initial.email ?? "",
              full_name: initial.full_name ?? "",
              phone: initial.phone ?? "",
              username: initial.username ?? "",
              password: "",
              status: initial.status ?? "ACTIVE",
            }
          : defaultForm
      );
      setErrors({});
    }
  }, [open, initial]);

  if (!open) return null;

  function validate() {
    const nextErrors = {};

    if (!form.email.trim()) nextErrors.email = "Email is required.";
    if (!form.full_name.trim()) nextErrors.full_name = "Full name is required.";
    if (!form.username.trim()) nextErrors.username = "Username is required.";
    if (!isEdit && !form.password.trim()) nextErrors.password = "Password is required.";

    return nextErrors;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const nextErrors = validate();

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    onSubmit?.({
      email: form.email.trim(),
      full_name: form.full_name.trim(),
      phone: form.phone.trim(),
      username: form.username.trim(),
      password: form.password.trim(),
      status: form.status,
    });

    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-modal="true"
      role="dialog"
    >
      <div className="w-full max-w-md rounded-2xl bg-card shadow-xl ring-1 ring-border">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">
            {isEdit ? "Edit Client" : "New Client"}
          </h2>
          <button onClick={onClose} className="rounded-full p-1.5 hover:bg-muted transition-colors">
            <X className="size-4 text-muted-foreground" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div className="grid gap-1.5">
            <label className="text-sm font-medium text-foreground">Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="h-10 rounded-lg bg-background px-3 text-sm ring-1 ring-border"
            />
            {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
          </div>

          <div className="grid gap-1.5">
            <label className="text-sm font-medium text-foreground">Full name</label>
            <input
              name="full_name"
              value={form.full_name}
              onChange={handleChange}
              className="h-10 rounded-lg bg-background px-3 text-sm ring-1 ring-border"
            />
            {errors.full_name && <p className="text-xs text-red-500">{errors.full_name}</p>}
          </div>

          <div className="grid gap-1.5">
            <label className="text-sm font-medium text-foreground">Phone</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="h-10 rounded-lg bg-background px-3 text-sm ring-1 ring-border"
            />
          </div>

          <div className="grid gap-1.5">
            <label className="text-sm font-medium text-foreground">Username</label>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              className="h-10 rounded-lg bg-background px-3 text-sm ring-1 ring-border"
            />
            {errors.username && <p className="text-xs text-red-500">{errors.username}</p>}
          </div>

          {!isEdit && (
            <div className="grid gap-1.5">
              <label className="text-sm font-medium text-foreground">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="h-10 rounded-lg bg-background px-3 text-sm ring-1 ring-border"
              />
              {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
            </div>
          )}

          <div className="grid gap-1.5">
            <label className="text-sm font-medium text-foreground">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="h-10 rounded-lg bg-background px-3 text-sm ring-1 ring-border"
            >
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
            </select>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-sm text-muted-foreground hover:bg-muted"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              {isEdit ? "Save Changes" : "Create Client"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}