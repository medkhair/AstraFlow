import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as apiLogin, logout as apiLogout, getClientById } from '../data/crud';

const AuthContext = createContext(null);

function isTokenValid(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return typeof payload.exp === 'number' && payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

function clearAuthStorage() {
  localStorage.removeItem('authToken');
  localStorage.removeItem('clientId');
  localStorage.removeItem('tokenSubject');
  localStorage.removeItem('tenantId');
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const storedClientId = localStorage.getItem('clientId');

    if (token && storedClientId && isTokenValid(token)) {
      getClientById(storedClientId)
        .then(setUser)
        .catch(clearAuthStorage)
        .finally(() => setIsLoading(false));
    } else {
      if (token) clearAuthStorage();
      setIsLoading(false);
    }
  }, []);

  const login = async (username, password) => {
    await apiLogin(username, password);
    const storedClientId = localStorage.getItem('clientId');
    const userData = await getClientById(storedClientId);
    setUser(userData);
    return userData;
  };

  const logout = () => {
    apiLogout();
    clearAuthStorage();
    setUser(null);
  };

  return React.createElement(
    AuthContext.Provider,
    { value: { user, isLoading, login, logout } },
    children
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
