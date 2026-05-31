import { useState } from 'react';
import { login as loginApi, logout as logoutApi } from '@/data/crud';

export function useAuthentication() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!localStorage.getItem('authToken')
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      await loginApi(email, password);
      setIsAuthenticated(true);
    } catch (err) {
      const message =
        err?.response?.data?.message || 'Invalid credentials. Please try again.';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    logoutApi();
    setIsAuthenticated(false);
  };

  return { isAuthenticated, isLoading, error, login, logout };
}
