import { useState } from "react";
import { importM3U } from "@/data/crud";

export function useImportM3u() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  async function importFile(file) {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await importM3U(file);
      setResult(data);
      return data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setLoading(false);
    setError(null);
    setResult(null);
  }

  return {
    loading,
    error,
    result,
    importFile,
    reset,
  };
}
