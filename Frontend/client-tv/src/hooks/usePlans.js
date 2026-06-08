import { useState, useEffect } from 'react';
import { fetchPlans } from '../data/crud';

export function usePlans() {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(() => {
    try {
      const stored = localStorage.getItem('selected_plan');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchPlans()
      .then(setPlans)
      .catch((err) => setError(err?.response?.data?.message || 'Failed to load plans.'))
      .finally(() => setLoading(false));
  }, []);

  const selectPlan = (plan) => {
    setSelectedPlan(plan);
    localStorage.setItem('selected_plan', JSON.stringify(plan));
  };

  return { plans, selectedPlan, selectPlan, loading, error };
}
