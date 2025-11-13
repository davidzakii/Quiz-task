import {
  createContext,
  useState,
  useContext,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import type { ReactNode } from "react";
import type { AxiosError } from "axios";

import { authService } from "../services/authService";
import { apiConfig, getStoredToken, setStoredToken } from "../api/axios";
import type { LoginRequest, User } from "../types";

interface AuthContextValue {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (payload: LoginRequest) => Promise<void>;
  registerUser: (payload: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    setStoredToken(null);
  }, []);

  const login = useCallback(
    async (payload: LoginRequest) => {
      setLoading(true);
      try {
        const accessToken = await authService.login(payload);
        setToken(accessToken);
        setStoredToken(accessToken);
        const profile = await authService.profile();
        setUser(profile);
      } catch (error) {
        logout();
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [logout]
  );

  const registerUser = useCallback(
    async (payload: { name: string; email: string; password: string }) => {
      setLoading(true);
      try {
        await authService.register(payload);
      } catch (error) {
        console.error("Registration failed", error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    const initialiseSession = async () => {
      const storedToken = getStoredToken();
      if (!storedToken) {
        setLoading(false);
        return;
      }

      setToken(storedToken);
      try {
        const profile = await authService.profile();
        setUser(profile);
      } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 401) {
          logout();
        } else {
          console.warn("Unable to retrieve profile details.", error);
        }
      } finally {
        setLoading(false);
      }
    };

    void initialiseSession();
  }, [logout]);

  useEffect(() => {
    const handleForcedLogout = () => logout();
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key !== apiConfig.tokenKey) return;

      if (!event.newValue) {
        logout();
        return;
      }

      setToken(event.newValue);
    };

    window.addEventListener("auth:logout", handleForcedLogout);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("auth:logout", handleForcedLogout);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [logout]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      loading,
      isAuthenticated: Boolean(token),
      login,
      registerUser,
      logout,
    }),
    [user, token, loading, login, registerUser, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
