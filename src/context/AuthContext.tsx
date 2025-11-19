import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import * as Splash from 'expo-splash-screen';
import { useLogin, useRegister } from '@lib/auth';
import { clearToken, getToken, saveToken } from '@lib/storage';
import { setAuthToken } from '@lib/api';
import { jwtDecode } from 'jwt-decode';
import { useQueryClient } from '@tanstack/react-query';

Splash.preventAutoHideAsync().catch(() => {});

type DecodedToken = {
  exp?: number;
  [keyof: string]: any;
};

type AuthContextType = {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = useQueryClient();
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);

  const { mutateAsync: loginApi } = useLogin();
  const { mutateAsync: registerApi } = useRegister();

  const isTokenValid = (token: string | null): boolean => {
    if (!token) return false;
    try {
      const decoded: DecodedToken = jwtDecode(token);
      if (!decoded.exp) return false;
      const now = Math.floor(Date.now() / 1000);
      return decoded.exp > now;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const t = await getToken();

        if (isTokenValid(t)) {
          setToken(t);
          setAuthToken(t);
        } else {
          await clearToken();
          setToken(null);
          setAuthToken(null);
        }
      } finally {
        setLoading(false);
        Splash.hideAsync().catch(() => {});
      }
    })();
  }, []);

  const value = useMemo(
    () => ({
      token,
      isAuthenticated: !!token,
      isLoading,
      login: async (email: string, password: string) => {
        const { token } = await loginApi({ email, password });
        await saveToken(token);
        setToken(token);
        setAuthToken(token);
      },
      register: async (name: string, email: string, password: string) => {
        const { token } = await registerApi({ name, email, password });
        await saveToken(token);
        setToken(token);
        setAuthToken(token);
      },
      logout: async () => {
        await clearToken();
        queryClient.clear();
        setToken(null);
        setAuthToken(null);
      },
    }),
    [isLoading, token],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
