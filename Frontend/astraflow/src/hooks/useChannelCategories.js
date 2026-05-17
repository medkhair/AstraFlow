import { useState, useEffect, useCallback } from "react";
import {
  getChannelCategories,
  createChannelCategory,
  updateChannelCategory,
  deleteChannelCategory,
} from "@/data/crud";

import { tenantId } from "@/data/crud";

function normalize(cat) {
  return {
    id: cat.id,
    name: cat.name,
    description: cat.description,
    sort_order: cat.sortOrder ?? cat.sort_order,
    tenant_id: cat.tenant?.id ?? cat.tenant_id,
  };
}

function toApiPayload(formData) {
  return {
    name: formData.name,
    description: formData.description,
    sortOrder: formData.sort_order,
    tenant: { id: tenantId },
  };
}

export function useChannelCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getChannelCategories();
      setCategories(Array.isArray(data) ? data.map(normalize) : (data?.data ?? data?.results ?? []).map(normalize));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  async function addCategory(categoryData) {
    const res = await createChannelCategory(toApiPayload(categoryData));
    const created = normalize(res?.data ?? res);
    setCategories((prev) => [...prev, created]);
    return created;
  }

  async function editCategory(categoryId, categoryData) {
    const res = await updateChannelCategory(categoryId, toApiPayload(categoryData));
    const updated = normalize(res?.data ?? res);
    setCategories((prev) =>
      prev.map((cat) => (cat.id === categoryId ? updated : cat))
    );
    return updated;
  }

  async function removeCategory(categoryId) {
    await deleteChannelCategory(categoryId);
    setCategories((prev) => prev.filter((cat) => cat.id !== categoryId));
  }

  return {
    categories,
    loading,
    error,
    refetch: fetchCategories,
    addCategory,
    editCategory,
    removeCategory,
  };
}