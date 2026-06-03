import { useState, useEffect } from 'react';
import { fetchChannels } from '../data/crud';

const COLORS = [
  '#c8102e', '#0052a5', '#e87722', '#1d6340', '#6b2d8b',
  '#c41230', '#00529b', '#d4af37', '#1a1a2e', '#16213e',
];

function colorFromId(id) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = id.charCodeAt(i) + ((hash << 5) - hash);
  return COLORS[Math.abs(hash) % COLORS.length];
}

function initialsFromName(name) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

function normalizeChannel(ch) {
  return {
    id: ch.id,
    name: ch.name,
    number: ch.number ?? ch.channelNumber ?? '',
    category_id: ch.categoryId ?? ch.category?.id ?? '',
    stream_url: ch.streamUrl ?? ch.url ?? '',
    now_playing: ch.nowPlaying ?? ch.currentProgram ?? '',
    start: ch.start ?? ch.startTime ?? '',
    end: ch.end ?? ch.endTime ?? '',
    initials: ch.initials ?? initialsFromName(ch.name),
    color: ch.color ?? colorFromId(ch.id),
  };
}

export function useChannels() {
  const [channels, setChannels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchChannels()
      .then((data) => setChannels((Array.isArray(data) ? data : data?.content ?? []).map(normalizeChannel)))
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, []);

  return { channels, isLoading, error };
}
