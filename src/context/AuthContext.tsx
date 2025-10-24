import { createContext, useContext, useEffect, useMemo, useState } from "react";
import * as Splash from "expo-splash-screen";
import { useLogin, useRegister } from "@lib/auth";
import { clearToken, getToken, saveToken } from "@lib/storage";
import { setAuthToken } from "@lib/api";

Splash.preventAutoHideAsync().catch(() => {});

type AuthContextType = {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);

  const { mutateAsync: loginApi } = useLogin();
  const { mutateAsync: registerApi } = useRegister();

  useEffect(() => {
    (async () => {
      try {
        const t = await getToken();
        setToken(t);
        setAuthToken(t);
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
        const { accessToken } = await loginApi({ email, password });
        await saveToken(accessToken);
        setToken(accessToken);
        setAuthToken(accessToken);
      },
      register: async (name: string, email: string, password: string) => {
        const { accessToken } = await registerApi({ name, email, password });
        await saveToken(accessToken);
        setToken(accessToken);
        setAuthToken(accessToken);
      },
      logout: async () => {
        await clearToken();
        setToken(null);
        setAuthToken(null);
      },
    }),
    [isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
