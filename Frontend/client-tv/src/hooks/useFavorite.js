import { useEffect, useMemo, useState } from "react";
import { useAuth } from "./useAuthentication";
import {
  fetchFavoriteChannels,
  addFavoriteChannel,
  removeFavoriteChannel,
} from "../data/crud";

const getClientId = () => localStorage.getItem("clientId");

function normalizeFavoriteItem(item) {
  if (typeof item === "string") {
    return { favoriteId: null, channelId: item };
  }

  if (typeof item === "number") {
    return { favoriteId: null, channelId: String(item) };
  }

  const channelId =
    item.channelId ??
    item.channel_id ??
    item.channel?.id ??
    item.channel?.channelId ??
    item.channel?.channel_id ??
    item.id;

  const favoriteId = item.id ?? item.favoriteId ?? item.favorite_id ?? null;

  return {
    favoriteId: favoriteId ? String(favoriteId) : null,
    channelId: channelId ? String(channelId) : null,
  };
}

export function useFavorite() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadFavorites() {
      const clientId = getClientId();
      if (!clientId) {
        setFavorites([]);
        setFavoriteIds({});
        setIsLoading(false);
        return;
      }

      try {
        const data = await fetchFavoriteChannels(clientId);
        const items = Array.isArray(data) ? data : data?.content ?? [];
        const normalized = items
          .map(normalizeFavoriteItem)
          .filter((item) => item.channelId);

        const ids = normalized.reduce((acc, item) => {
          if (item.favoriteId) acc[item.channelId] = item.favoriteId;
          return acc;
        }, {});

        if (!cancelled) {
          setFavorites(normalized.map((item) => item.channelId));
          setFavoriteIds(ids);
        }
      } catch (err) {
        if (!cancelled) setError(err);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    loadFavorites();
    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  const syncFavorite = (channelId, favoriteId = null, added = true) => {
    setFavorites((prev) => {
      if (added) {
        return prev.includes(channelId) ? prev : [...prev, channelId];
      }
      return prev.filter((id) => id !== channelId);
    });

    setFavoriteIds((prev) => {
      const next = { ...prev };
      if (added) {
        if (favoriteId) next[channelId] = favoriteId;
      } else {
        delete next[channelId];
      }
      return next;
    });
  };

  const add = async (channelId) => {
    const clientId = getClientId();
    if (!clientId) return;

    try {
      const result = await addFavoriteChannel(clientId, channelId);
      const item = normalizeFavoriteItem(result);
      syncFavorite(channelId, item.favoriteId, true);
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  const remove = async (channelId) => {
    const favoriteId = favoriteIds[channelId];

    try {
      if (favoriteId) {
        await removeFavoriteChannel(favoriteId);
      }
      syncFavorite(channelId, null, false);
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  const toggleFavorite = async (channelId) => {
    if (favorites.includes(channelId)) {
      await remove(channelId);
    } else {
      await add(channelId);
    }
  };

  const isFavorite = useMemo(
    () => (channelId) => favorites.includes(channelId),
    [favorites]
  );

  return {
    favorites,
    isLoading,
    error,
    toggleFavorite,
    isFavorite,
  };
}
