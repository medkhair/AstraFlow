import { useState, useEffect, useCallback } from "react";
import {
  getChannels,
  createChannel,
  updateChannel,
  deleteChannel,
} from "@/data/crud";

import { tenantId } from "@/data/crud";


function normalize(ch) {
  return {
    id: ch.id,
    name: ch.name,
    channel_number: ch.channelNumber ?? ch.channel_number,
    category_id: ch.category?.id ?? ch.category_id,
    stream_url: ch.streamUrl ?? ch.stream_url,
    logo_url: ch.logoUrl ?? ch.logo_url,
    status: ch.status,
    tenant_id: ch.tenant?.id ?? ch.tenant_id,
  };
}

function toApiPayload(formData) {
  return {
    name: formData.name,
    channelNumber: formData.channel_number,
    streamUrl: formData.stream_url,
    logoUrl: formData.logo_url,
    status: formData.status,
    category: { id: formData.category_id },
    tenant: { id: tenantId },
  };
}

export function useChannels() {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchChannels = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getChannels();
      setChannels(Array.isArray(data) ? data.map(normalize) : (data?.data ?? data?.results ?? []).map(normalize));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchChannels();
  }, [fetchChannels]);

  async function addChannel(channelData) {
    const res = await createChannel(toApiPayload(channelData));
    const created = normalize(res?.data ?? res);
    setChannels((prev) => [...prev, created]);
    return created;
  }

  async function editChannel(channelId, channelData) {
    const res = await updateChannel(channelId, toApiPayload(channelData));
    const updated = normalize(res?.data ?? res);
    setChannels((prev) =>
      prev.map((ch) => (ch.id === channelId ? updated : ch))
    );
    return updated;
  }

  async function removeChannel(channelId) {
    await deleteChannel(channelId);
    setChannels((prev) => prev.filter((ch) => ch.id !== channelId));
  }

  return {
    channels,
    loading,
    error,
    refetch: fetchChannels,
    addChannel,
    editChannel,
    removeChannel,
  };
}