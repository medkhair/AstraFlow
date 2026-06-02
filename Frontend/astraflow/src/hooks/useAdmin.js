import { useState, useEffect, useCallback } from "react";
import { getAdminById, updateAdmin, changePassword } from "@/data/crud";

function normalize(admin) {
  return {
    id: admin.id,
    fullName: admin.fullName,
    email: admin.email,
    username: admin.username,
    phone: admin.phone ?? "",
    status: admin.status,
    createdAt: admin.createdAt,
    updatedAt: admin.updatedAt,
    tenant: admin.tenant ?? null,
  };
}

export function useAdmin() {
  const [admin, setAdmin] = useState(null);
  const [rawAdmin, setRawAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const adminId = localStorage.getItem("adminId");

  const fetchAdmin = useCallback(async () => {
    if (!adminId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await getAdminById(adminId);
      const raw = data?.data ?? data;
      setRawAdmin(raw);
      setAdmin(normalize(raw));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [adminId]);

  useEffect(() => {
    fetchAdmin();
  }, [fetchAdmin]);

  async function editAdmin(adminData) {
    // Merge with original raw payload so required fields (e.g. password) are preserved
    const payload = { ...rawAdmin, ...adminData };
    const res = await updateAdmin(adminId, payload);
    const raw = res?.data ?? res;
    setRawAdmin(raw);
    const updated = normalize(raw);
    setAdmin(updated);
    return updated;
  }

  async function updatePassword(currentPassword, newPassword) {
    await changePassword(adminId, currentPassword, newPassword);
  }

  return { admin, loading, error, editAdmin, updatePassword, refetch: fetchAdmin };
}
