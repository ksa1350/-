import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  currentUserRequest,
  loginRequest,
  registerRequest,
  setAuthToken,
} from '../lib/apiClient.js';

const AuthContext = createContext(null);
const TOKEN_STORAGE_KEY = 'menu-builder-token';

const getInitialToken = () =>
  typeof window !== 'undefined'
    ? window.localStorage.getItem(TOKEN_STORAGE_KEY)
    : null;

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(getInitialToken);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(Boolean(token));

  useEffect(() => {
    if (token) {
      setAuthToken(token);
      currentUserRequest()
        .then((current) => {
          setUser(current);
        })
        .catch(() => {
          setToken(null);
          setAuthToken(null);
          window.localStorage.removeItem(TOKEN_STORAGE_KEY);
        })
        .finally(() => setIsLoading(false));
    } else {
      setAuthToken(null);
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (token) {
      window.localStorage.setItem(TOKEN_STORAGE_KEY, token);
    } else {
      window.localStorage.removeItem(TOKEN_STORAGE_KEY);
    }
  }, [token]);

  const handleAuth = useCallback(async (fn, payload) => {
    const { token: nextToken, user: nextUser } = await fn(payload);
    setToken(nextToken);
    setUser(nextUser);
    setAuthToken(nextToken);
  }, []);

  const login = useCallback((payload) => handleAuth(loginRequest, payload), [
    handleAuth,
  ]);

  const register = useCallback(
    (payload) => handleAuth(registerRequest, payload),
    [handleAuth]
  );

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    setAuthToken(null);
  }, []);

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token && user),
      isLoading,
      login,
      register,
      logout,
    }),
    [isLoading, login, logout, register, token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
