import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import axios from 'axios';

// ─── Constants ────────────────────────────────────────────────────────────────
const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/auth';
const ACCESS_TOKEN_KEY = 'smp_access_token';
const REFRESH_TOKEN_KEY = 'smp_refresh_token';
const USER_KEY = 'smp_user';

// ─── Axios instance ───────────────────────────────────────────────────────────
export const authAxios = axios.create({ baseURL: API_BASE });

// ─── Context ──────────────────────────────────────────────────────────────────
const AuthContext = createContext(null);

// ─── Provider ─────────────────────────────────────────────────────────────────
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem(USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [accessToken, setAccessToken] = useState(() => localStorage.getItem(ACCESS_TOKEN_KEY));
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  const refreshTimerRef = useRef(null);

  // ── Persist helpers ─────────────────────────────────────────────────────────
  const persistSession = useCallback((userData, access, refresh) => {
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
    localStorage.setItem(ACCESS_TOKEN_KEY, access);
    localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
    setUser(userData);
    setAccessToken(access);
  }, []);

  const clearSession = useCallback(() => {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    setUser(null);
    setAccessToken(null);
    if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);
  }, []);

  // ── Axios interceptor: attach access token ───────────────────────────────────
  useEffect(() => {
    const reqInterceptor = authAxios.interceptors.request.use((config) => {
      const token = localStorage.getItem(ACCESS_TOKEN_KEY);
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    });

    // Response interceptor: auto-refresh on 401 TOKEN_EXPIRED
    const resInterceptor = authAxios.interceptors.response.use(
      (res) => res,
      async (error) => {
        const original = error.config;
        if (
          error.response?.status === 401 &&
          error.response?.data?.code === 'TOKEN_EXPIRED' &&
          !original._retry
        ) {
          original._retry = true;
          try {
            const refreshed = await silentRefresh();
            if (refreshed) {
              original.headers.Authorization = `Bearer ${localStorage.getItem(ACCESS_TOKEN_KEY)}`;
              return authAxios(original);
            }
          } catch {
            clearSession();
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      authAxios.interceptors.request.eject(reqInterceptor);
      authAxios.interceptors.response.eject(resInterceptor);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Silent token refresh ──────────────────────────────────────────────────────
  const silentRefresh = useCallback(async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    if (!refreshToken) return false;
    try {
      const { data } = await axios.post(`${API_BASE}/refresh`, { refreshToken });
      if (data.success) {
        localStorage.setItem(ACCESS_TOKEN_KEY, data.data.accessToken);
        localStorage.setItem(REFRESH_TOKEN_KEY, data.data.refreshToken);
        setAccessToken(data.data.accessToken);
        scheduleRefresh();
        return true;
      }
    } catch {
      clearSession();
    }
    return false;
  }, [clearSession]);

  // ── Schedule auto-refresh 1 min before expiry (token = 15 min → 14 min) ─────
  const scheduleRefresh = useCallback(() => {
    if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);
    refreshTimerRef.current = setTimeout(silentRefresh, 14 * 60 * 1000);
  }, [silentRefresh]);

  // ── Validate session on mount ─────────────────────────────────────────────────
  useEffect(() => {
    const validateSession = async () => {
      const token = localStorage.getItem(ACCESS_TOKEN_KEY);
      if (!token) { setLoading(false); return; }

      try {
        const { data } = await authAxios.get('/me');
        if (data.success) {
          setUser(data.data.user);
          localStorage.setItem(USER_KEY, JSON.stringify(data.data.user));
          scheduleRefresh();
        }
      } catch {
        // Try silent refresh
        const refreshed = await silentRefresh();
        if (!refreshed) clearSession();
      } finally {
        setLoading(false);
      }
    };

    validateSession();
  }, [clearSession, scheduleRefresh, silentRefresh]);

  // ── Register ──────────────────────────────────────────────────────────────────
  const register = useCallback(async (formData) => {
    setAuthError(null);
    const { data } = await authAxios.post('/register', formData);
    if (data.success) {
      persistSession(data.data.user, data.data.accessToken, data.data.refreshToken);
      scheduleRefresh();
    }
    return data;
  }, [persistSession, scheduleRefresh]);

  // ── Login ─────────────────────────────────────────────────────────────────────
  const login = useCallback(async (email, password) => {
    setAuthError(null);
    const { data } = await authAxios.post('/login', { email, password });
    if (data.success) {
      persistSession(data.data.user, data.data.accessToken, data.data.refreshToken);
      scheduleRefresh();
    }
    return data;
  }, [persistSession, scheduleRefresh]);

  // ── Logout ────────────────────────────────────────────────────────────────────
  const logout = useCallback(async () => {
    try {
      const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
      await authAxios.post('/logout', { refreshToken });
    } catch { /* ignore */ }
    clearSession();
  }, [clearSession]);

  // ── Update user in context after profile edit ─────────────────────────────────
  const updateUser = useCallback((updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
  }, []);

  // ── Computed ─────────────────────────────────────────────────────────────────
  const isAuthenticated = !!user && !!accessToken;

  const value = useMemo(
    () => ({
      user,
      accessToken,
      loading,
      authError,
      isAuthenticated,
      register,
      login,
      logout,
      updateUser,
      silentRefresh,
      setAuthError,
    }),
    [user, accessToken, loading, authError, isAuthenticated, register, login, logout, updateUser, silentRefresh]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// ─── Hook ─────────────────────────────────────────────────────────────────────
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};

export default AuthContext;