import React, { createContext, useContext, useMemo, useState, useCallback, useEffect } from 'react';
import { QueryClient, QueryClientProvider, QueryClientConfig } from '@tanstack/react-query';
import { AxiosInstance, AxiosError } from 'axios';
import { AuthProvider, DjangoNextAuthConfig } from './auth';

// Enhanced type-safe API context
export interface DjangoApiContextValue<TApiClient = any> {
  client: TApiClient;
  axiosInstance: AxiosInstance;
  config: DjangoNextConfig;
  baseUrl: string;
  isReady: boolean;
  error: Error | null;
  updateConfig: (updates: Partial<DjangoNextConfig>) => void;
}

export interface DjangoNextConfig {
  baseUrl: string;
  timeout?: number;
  withCredentials?: boolean;
  headers?: Record<string, string>;
  auth?: DjangoNextAuthConfig;
}

export interface DjangoNextProviderProps<TApiClient = any> {
  children: React.ReactNode;
  apiClient: TApiClient;
  config?: DjangoNextConfig;
  queryClient?: QueryClient;
  queryConfig?: QueryClientConfig;
  authConfig?: DjangoNextAuthConfig;
  errorBoundary?: boolean;
  enableDevtools?: boolean;
  onError?: (error: Error) => void;
  onConfigUpdate?: (config: DjangoNextConfig) => void;
}

// Create the enhanced API context
export const DjangoApiContext = createContext<DjangoApiContextValue | null>(null);

// Default query client configuration optimized for Django APIs
const defaultQueryConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors except 401 (auth might be refreshed)
        if (error instanceof Error && 'response' in error) {
          const axiosError = error as AxiosError;
          const status = axiosError.response?.status;
          if (status && status >= 400 && status < 500 && status !== 401) {
            return false;
          }
        }
        return failureCount < 2;
      },
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    },
    mutations: {
      retry: (failureCount, error) => {
        // Don't retry mutations on client errors
        if (error instanceof Error && 'response' in error) {
          const axiosError = error as AxiosError;
          const status = axiosError.response?.status;
          if (status && status >= 400 && status < 500) {
            return false;
          }
        }
        return failureCount < 1;
      },
    },
  },
};

// Error boundary component
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class DjangoNextErrorBoundary extends React.Component<
  { children: React.ReactNode; onError?: (error: Error) => void },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode; onError?: (error: Error) => void }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('DjangoNext Error Boundary caught an error:', error, errorInfo);
    this.props.onError?.(error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', border: '1px solid #ff6b6b', borderRadius: '4px', backgroundColor: '#ffe0e0' }}>
          <h2>Something went wrong with Django-Next</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            <summary>Error Details</summary>
            {this.state.error?.message}
            {'\n'}
            {this.state.error?.stack}
          </details>
          <button onClick={() => this.setState({ hasError: false, error: null })}>
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Enhanced API Provider with configuration management
function EnhancedApiProvider<TApiClient>({
  children,
  apiClient,
  config: initialConfig,
  onError,
  onConfigUpdate,
}: {
  children: React.ReactNode;
  apiClient: TApiClient;
  config?: DjangoNextConfig;
  onError?: (error: Error) => void;
  onConfigUpdate?: (config: DjangoNextConfig) => void;
}) {
  const [config, setConfig] = useState<DjangoNextConfig>(() => ({
    baseUrl: 'http://localhost:8000',
    timeout: 30000,
    withCredentials: true,
    ...initialConfig,
  }));

  const [error, setError] = useState<Error | null>(null);

  // Extract axios instance from API client
  const axiosInstance = useMemo(() => {
    if (apiClient && typeof apiClient === 'object' && '_config' in apiClient) {
      return (apiClient as any)._config?.axiosInstance;
    }
    return null;
  }, [apiClient]);

  // Update configuration
  const updateConfig = useCallback((updates: Partial<DjangoNextConfig>) => {
    setConfig(prev => {
      const newConfig = { ...prev, ...updates };
      onConfigUpdate?.(newConfig);
      return newConfig;
    });
  }, [onConfigUpdate]);

  // Synchronous validation and initialization
  const { isReady, initError } = useMemo(() => {
    try {
      // Validate API client
      if (!apiClient) {
        return { isReady: false, initError: new Error('ApiClient is required for DjangoNextProvider') };
      }

      // Validate axios instance (warning only, not blocking)
      if (!axiosInstance) {
        console.warn(
          'No axios instance found in API client. Make sure your API client is properly configured.'
        );
      }

      return { isReady: true, initError: null };
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown initialization error');
      return { isReady: false, initError: error };
    }
  }, [apiClient, axiosInstance]);

  // Handle initialization errors
  useEffect(() => {
    if (initError) {
      setError(initError);
      onError?.(initError);
    } else {
      setError(null);
    }
  }, [initError, onError]);

  const contextValue = useMemo<DjangoApiContextValue<TApiClient>>(() => ({
    client: apiClient,
    axiosInstance,
    config,
    baseUrl: config.baseUrl,
    isReady,
    error: error || initError,
    updateConfig,
  }), [apiClient, axiosInstance, config, isReady, error, initError, updateConfig]);

  return (
    <DjangoApiContext.Provider value={contextValue}>
      {children}
    </DjangoApiContext.Provider>
  );
}

// Main unified provider
export function DjangoNextProvider<TApiClient = any>({
  children,
  apiClient,
  config,
  queryClient,
  queryConfig,
  authConfig,
  errorBoundary = true,
  enableDevtools = process.env.NODE_ENV === 'development',
  onError,
  onConfigUpdate,
}: DjangoNextProviderProps<TApiClient>) {
  // Create query client with merged configuration
  const client = useMemo(() => {
    if (queryClient) return queryClient;

    const mergedConfig = {
      ...defaultQueryConfig,
      ...queryConfig,
      defaultOptions: {
        ...defaultQueryConfig.defaultOptions,
        ...queryConfig?.defaultOptions,
        queries: {
          ...defaultQueryConfig.defaultOptions?.queries,
          ...queryConfig?.defaultOptions?.queries,
        },
        mutations: {
          ...defaultQueryConfig.defaultOptions?.mutations,
          ...queryConfig?.defaultOptions?.mutations,
        },
      },
    };

    return new QueryClient(mergedConfig);
  }, [queryClient, queryConfig]);

  const content = (
    <QueryClientProvider client={client}>
      <EnhancedApiProvider
        apiClient={apiClient}
        config={config}
        onError={onError}
        onConfigUpdate={onConfigUpdate}
      >
        <AuthProvider api={apiClient as any} auth={authConfig}>
          {children}
        </AuthProvider>
      </EnhancedApiProvider>
      {enableDevtools && process.env.NODE_ENV === 'development' && (
        <div>
          {/* React Query Devtools would go here if @tanstack/react-query-devtools is installed */}
        </div>
      )}
    </QueryClientProvider>
  );

  if (errorBoundary) {
    return (
      <DjangoNextErrorBoundary onError={onError}>
        {content}
      </DjangoNextErrorBoundary>
    );
  }

  return content;
}

// Enhanced hook to access API context with type safety
export function useApiContext<TApiClient = any>(): DjangoApiContextValue<TApiClient> {
  const context = useContext(DjangoApiContext);

  if (!context) {
    throw new Error(
      'useApiContext must be used within a DjangoNextProvider. ' +
      'Make sure you have wrapped your app with <DjangoNextProvider>.'
    );
  }

  if (!context.isReady) {
    if (context.error) {
      throw new Error(
        `API context initialization failed: ${context.error.message}. ` +
        'Check your API client configuration and ensure it has a valid axios instance.'
      );
    }
    throw new Error(
      'API context is not ready. This might indicate an initialization error. ' +
      'Check the console for more details and ensure your API client is properly configured.'
    );
  }

  return context as DjangoApiContextValue<TApiClient>;
}

// Convenience hook for accessing just the API client
export function useApiClient<TApiClient = any>(): TApiClient {
  const { client } = useApiContext<TApiClient>();
  return client;
}

// Hook for configuration management
export function useApiConfig() {
  const { config, updateConfig } = useApiContext();

  return {
    config,
    updateConfig,
    updateBaseUrl: (baseUrl: string) => updateConfig({ baseUrl }),
    updateHeaders: (headers: Record<string, string>) => updateConfig({ headers }),
    updateTimeout: (timeout: number) => updateConfig({ timeout }),
  };
}
