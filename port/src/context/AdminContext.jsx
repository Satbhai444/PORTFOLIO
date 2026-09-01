import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext(null);

const API_BASE = import.meta.env.VITE_API_URL || '';

export const AdminProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('admin_token'));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Verify token on mount
  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_BASE}/api/admin/verify`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          // Token invalid — clear it
          localStorage.removeItem('admin_token');
          setToken(null);
          setIsAuthenticated(false);
        }
      } catch {
        // Network error — keep token but mark as unauthenticated
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  const login = async (username, password) => {
    const res = await fetch(`${API_BASE}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (data.success) {
      localStorage.setItem('admin_token', data.token);
      setToken(data.token);
      setIsAuthenticated(true);
      return { success: true };
    }

    return { success: false, message: data.message };
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    setToken(null);
    setIsAuthenticated(false);
  };

  /**
   * Authenticated fetch helper for admin API calls
   */
  const authFetch = async (url, options = {}) => {
    const res = await fetch(`${API_BASE}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    });

    if (res.status === 401) {
      logout();
      throw new Error('Session expired');
    }

    return res.json();
  };

  return (
    <AdminContext.Provider
      value={{
        token,
        isAuthenticated,
        isLoading,
        login,
        logout,
        authFetch,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export default AdminContext;
