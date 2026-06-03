import { useState, useEffect } from 'react';
import { fetchCategories } from '../data/crud';

const SYNTHETIC = [
  { id: 'all', name: 'All Channels', icon: '📺' },
  { id: 'favorites', name: 'Favorites', icon: '★' },
];

function normalizeCategory(cat) {
  return {
    id: cat.id,
    name: cat.name,
    icon: cat.icon ?? '📡',
  };
}

export function useChannelCategories() {
  const [categories, setCategories] = useState(SYNTHETIC);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategories()
      .then((data) => {
        const real = (Array.isArray(data) ? data : data?.content ?? []).map(normalizeCategory);
        setCategories([...SYNTHETIC, ...real]);
      })
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, []);

  return { categories, isLoading, error };
}
