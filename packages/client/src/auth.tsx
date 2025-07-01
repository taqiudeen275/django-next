import { AxiosError } from 'axios';
import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

export interface DjangoNextAuthConfig {
  loginUrl?: string;
  logoutUrl?: string;
  userUrl?: string;
  refreshUrl?: string;
  onAuthError?: (error: AuthError) => void;
  onLoginSuccess?: (user: User) => void;
  onLogoutSuccess?: () => void;
}

export interface DjangoNextApi {
  _config?: {
    auth?: DjangoNextAuthConfig;
    baseUrl?: string;
    axiosInstance?: any;
  };
  // Add your generated endpoint methods here, e.g.:
  getUser?: (params: any) => Promise<any>;
  // ...
}

export interface AuthProviderProps {
  api: DjangoNextApi;
  auth?: DjangoNextAuthConfig;
  children: React.ReactNode;
  fallbackComponent?: React.ComponentType<{ error: AuthError }>;
}

export interface User {
  id: string | number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  is_staff?: boolean;
  is_superuser?: boolean;
  roles?: string[];
  permissions?: string[];
  groups?: string[];
  profile?: Record<string, any>;
}

export interface AuthError {
  message: string;
  code?: string;
  status?: number;
  details?: any;
}

export interface LoginCredentials {
  username?: string;
  email?: string;
  password: string;
  remember_me?: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: AuthError | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  hasPermission: (permission: string) => boolean;
  hasRole: (role: string) => boolean;
  hasAnyRole: (roles: string[]) => boolean;
  hasAllRoles: (roles: string[]) => boolean;
  clearError: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  login: async () => {},
  logout: async () => {},
  refreshUser: async () => {},
  hasPermission: () => false,
  hasRole: () => false,
  hasAnyRole: () => false,
  hasAllRoles: () => false,
  clearError: () => {},
});

function getAuthConfigFromApi(api: DjangoNextApi, runtimeAuth?: DjangoNextAuthConfig): DjangoNextAuthConfig {
  const baseConfig = {
    loginUrl: '/api/auth/login/',
    logoutUrl: '/api/auth/logout/',
    userUrl: '/api/auth/me/',
    refreshUrl: '/api/auth/refresh/',
  };

  return {
    ...baseConfig,
    ...api?._config?.auth,
    ...runtimeAuth,
  };
}

function createAuthError(message: string, error?: any): AuthError {
  if (error instanceof AxiosError) {
    return {
      message,
      code: error.code,
      status: error.response?.status,
      details: error.response?.data,
    };
  }

  return {
    message,
    details: error,
  };
}

export function AuthProvider({ children, api, auth, fallbackComponent: FallbackComponent }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<AuthError | null>(null);
  const authConfig = getAuthConfigFromApi(api, auth);
  const initializationRef = useRef(false);

  // Ensure we always have a properly configured axios instance
  const axiosInstance = api._config?.axiosInstance;

  if (!axiosInstance) {
    throw new Error(
      'AuthProvider requires an API client with a configured axios instance. ' +
      'Make sure you created your API client using createDjangoClient() or ' +
      'passed a properly configured axios instance to your API client constructor.'
    );
  }

  // Permission and role checking functions
  const hasPermission = useCallback((permission: string): boolean => {
    return user?.permissions?.includes(permission) ?? false;
  }, [user]);

  const hasRole = useCallback((role: string): boolean => {
    return user?.roles?.includes(role) ?? false;
  }, [user]);

  const hasAnyRole = useCallback((roles: string[]): boolean => {
    return roles.some(role => hasRole(role));
  }, [hasRole]);

  const hasAllRoles = useCallback((roles: string[]): boolean => {
    return roles.every(role => hasRole(role));
  }, [hasRole]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Enhanced user fetching with better error handling
  const refreshUser = useCallback(async () => {
    try {
      setError(null);
      const res = await axiosInstance.get(authConfig.userUrl!, { withCredentials: true });
      const userData = res.data;

      setUser(userData);
      authConfig.onLoginSuccess?.(userData);

      return userData;
    } catch (err) {
      const authError = createAuthError('Failed to fetch user session', err);
      setError(authError);
      setUser(null);
      authConfig.onAuthError?.(authError);
      throw authError;
    }
  }, [axiosInstance, authConfig]);

  // Initialize user session on mount
  useEffect(() => {
    if (initializationRef.current) return;
    initializationRef.current = true;

    async function initializeAuth() {
      setIsLoading(true);
      try {
        await refreshUser();
      } catch {
        // Ignore errors during initialization
      } finally {
        setIsLoading(false);
      }
    }

    initializeAuth();
  }, [refreshUser]);

  // Enhanced login with better error handling
  const login = useCallback(
    async (credentials: LoginCredentials) => {
      setIsLoading(true);
      setError(null);

      try {
        await axiosInstance.post(authConfig.loginUrl!, credentials, { withCredentials: true });
        await refreshUser();
      } catch (err) {
        const authError = createAuthError('Login failed', err);
        setError(authError);
        authConfig.onAuthError?.(authError);
        throw authError;
      } finally {
        setIsLoading(false);
      }
    },
    [axiosInstance, authConfig, refreshUser]
  );

  // Enhanced logout with better error handling
  const logout = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      await axiosInstance.post(authConfig.logoutUrl!, {}, { withCredentials: true });
      authConfig.onLogoutSuccess?.();
    } catch (err) {
      const authError = createAuthError('Logout failed', err);
      setError(authError);
      authConfig.onAuthError?.(authError);
    } finally {
      setUser(null);
      setIsLoading(false);
    }
  }, [axiosInstance, authConfig]);

  const contextValue: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    logout,
    refreshUser,
    hasPermission,
    hasRole,
    hasAnyRole,
    hasAllRoles,
    clearError,
  };

  // Show fallback component if there's a critical error
  if (error && FallbackComponent) {
    return <FallbackComponent error={error} />;
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

// Utility hooks for common auth patterns
export function useRequireAuth() {
  const auth = useAuth();

  useEffect(() => {
    if (!auth.isLoading && !auth.isAuthenticated) {
      // Redirect to login or throw error
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
  }, [auth.isLoading, auth.isAuthenticated]);

  return auth;
}

export function usePermission(permission: string) {
  const { hasPermission, user, isLoading } = useAuth();

  return {
    hasPermission: hasPermission(permission),
    user,
    isLoading,
  };
}

export function useRole(role: string) {
  const { hasRole, user, isLoading } = useAuth();

  return {
    hasRole: hasRole(role),
    user,
    isLoading,
  };
}

// Higher-order component for protected routes
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  options?: {
    requiredPermissions?: string[];
    requiredRoles?: string[];
    fallback?: React.ComponentType;
  }
) {
  return function AuthenticatedComponent(props: P) {
    const auth = useAuth();

    if (auth.isLoading) {
      return options?.fallback ? <options.fallback /> : <div>Loading...</div>;
    }

    if (!auth.isAuthenticated) {
      return options?.fallback ? <options.fallback /> : <div>Access denied</div>;
    }

    if (options?.requiredPermissions) {
      const hasAllPermissions = options.requiredPermissions.every(permission =>
        auth.hasPermission(permission)
      );
      if (!hasAllPermissions) {
        return options?.fallback ? <options.fallback /> : <div>Insufficient permissions</div>;
      }
    }

    if (options?.requiredRoles) {
      const hasRequiredRole = auth.hasAnyRole(options.requiredRoles);
      if (!hasRequiredRole) {
        return options?.fallback ? <options.fallback /> : <div>Insufficient role</div>;
      }
    }

    return <Component {...props} />;
  };
}
