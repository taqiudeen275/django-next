import axios from 'axios';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface DjangoNextAuthConfig {
  loginUrl?: string;
  logoutUrl?: string;
  userUrl?: string;
  refreshUrl?: string;
}

export interface DjangoNextApi {
  _authConfig?: DjangoNextAuthConfig;
  // Add your generated endpoint methods here, e.g.:
  getUser?: (params: any) => Promise<any>;
  // ...
}

export interface AuthProviderProps {
  api: DjangoNextApi;
  auth?: DjangoNextAuthConfig;
  children: React.ReactNode;
}

export interface User {
  id: string;
  username: string;
  email: string;
  roles?: string[];
  permissions?: string[]; // Add permissions for RBAC
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: { username: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
});

function getAuthConfigFromApi(api: DjangoNextApi, runtimeAuth?: DjangoNextAuthConfig) {
  return { ...api?._authConfig, ...(runtimeAuth || {}) };
}

export function AuthProvider({ children, api, auth }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const authConfig = getAuthConfigFromApi(api, auth);

  const loginUrl = authConfig.loginUrl || '/api/auth/login/';
  const logoutUrl = authConfig.logoutUrl || '/api/auth/logout/';
  const userUrl = authConfig.userUrl || '/api/auth/me/';

  useEffect(() => {
    async function fetchSession() {
      setIsLoading(true);
      try {
        const res = await axios.get(userUrl, { withCredentials: true });
        setUser(res.data);
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }
    fetchSession();
  }, [userUrl]);

  const login = useCallback(
    async (credentials: { username: string; password: string }) => {
      setIsLoading(true);
      try {
        await axios.post(loginUrl, credentials, { withCredentials: true });
        const res = await axios.get(userUrl, { withCredentials: true });
        setUser(res.data);
      } catch {
        setUser(null);
        throw new Error('Login failed');
      } finally {
        setIsLoading(false);
      }
    },
    [loginUrl, userUrl]
  );

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await axios.post(logoutUrl, {}, { withCredentials: true });
    } finally {
      setUser(null);
      setIsLoading(false);
    }
  }, [logoutUrl]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
