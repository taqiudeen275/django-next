import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface User {
  id: string;
  username: string;
  email: string;
  roles?: string[];
  // ...add more fields as needed
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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate session check on mount
  useEffect(() => {
    // TODO: Replace with real session check (e.g., fetch /me endpoint)
    setIsLoading(false);
  }, []);

  const login = useCallback(
    async (credentials: { username: string; password: string }) => {
      // TODO: Implement real login logic (call API, set user)
      setUser({ id: '1', username: credentials.username, email: '', roles: ['user'] });
    },
    []
  );

  const logout = useCallback(async () => {
    // TODO: Implement real logout logic (call API, clear user)
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
