import { useState } from 'react';
import { register } from '../data/crud';

export function useRegistration() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const registerUser = async ({ fullName, username, email, password, phone, tenantId }) => {
    setLoading(true);
    setError('');
    try {
      const data = await register(fullName, username, email, password, phone, tenantId);
      return data;
    } catch (err) {
      const raw = err?.response?.data;
      const msg =
        (typeof raw === 'string' && raw) ||
        raw?.message ||
        (Array.isArray(raw?.errors) ? raw.errors.join(', ') : null) ||
        'Registration failed. Please try again.';
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { registerUser, loading, error, setError };
}
