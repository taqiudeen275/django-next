// Enhanced QueryClientProvider wrapper with Django-specific defaults
import { QueryClient, QueryClientProvider, QueryClientConfig } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React, { useMemo } from 'react';

export interface DjangoNextQueryProviderProps {
  children: React.ReactNode;
  queryClient?: QueryClient;
  config?: QueryClientConfig;
  enableDevtools?: boolean;
  devtoolsOptions?: {
    initialIsOpen?: boolean;
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  };
}

// Default configuration optimized for Django REST APIs
const defaultQueryConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      // Stale time - how long data is considered fresh
      staleTime: 5 * 60 * 1000, // 5 minutes

      // Cache time - how long data stays in cache after becoming unused
      gcTime: 10 * 60 * 1000, // 10 minutes (was cacheTime in v4)

      // Retry configuration
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx errors (client errors)
        if (error?.response?.status >= 400 && error?.response?.status < 500) {
          return false;
        }
        // Retry up to 3 times for other errors
        return failureCount < 3;
      },

      // Retry delay with exponential backoff
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),

      // Refetch on window focus for important data
      refetchOnWindowFocus: false,

      // Refetch on reconnect
      refetchOnReconnect: true,

      // Background refetch interval (disabled by default)
      refetchInterval: false,
    },
    mutations: {
      // Retry mutations once on network errors
      retry: (failureCount, error: any) => {
        if (error?.response?.status >= 400 && error?.response?.status < 500) {
          return false;
        }
        return failureCount < 1;
      },

      // Retry delay for mutations
      retryDelay: 1000,
    },
  },
};

export function DjangoNextQueryProvider({
  children,
  queryClient,
  config,
  enableDevtools = process.env.NODE_ENV === 'development',
  devtoolsOptions = {}
}: DjangoNextQueryProviderProps) {
  // Create query client with merged configuration
  const client = useMemo(() => {
    if (queryClient) return queryClient;

    const mergedConfig = {
      ...defaultQueryConfig,
      ...config,
      defaultOptions: {
        ...defaultQueryConfig.defaultOptions,
        ...config?.defaultOptions,
        queries: {
          ...defaultQueryConfig.defaultOptions?.queries,
          ...config?.defaultOptions?.queries,
        },
        mutations: {
          ...defaultQueryConfig.defaultOptions?.mutations,
          ...config?.defaultOptions?.mutations,
        },
      },
    };

    return new QueryClient(mergedConfig);
  }, [queryClient, config]);

  return (
    <QueryClientProvider client={client}>
      {children}
      {enableDevtools && (
        <ReactQueryDevtools
          initialIsOpen={devtoolsOptions.initialIsOpen ?? false}
          position={devtoolsOptions.position ?? 'bottom-right'}
        />
      )}
    </QueryClientProvider>
  );
}

// Convenience hook to get the query client
export function useDjangoQueryClient() {
  const { QueryClient } = require('@tanstack/react-query');
  return QueryClient;
}

// Export default query client for advanced usage
export function createDjangoQueryClient(config?: QueryClientConfig) {
  const mergedConfig = {
    ...defaultQueryConfig,
    ...config,
    defaultOptions: {
      ...defaultQueryConfig.defaultOptions,
      ...config?.defaultOptions,
      queries: {
        ...defaultQueryConfig.defaultOptions?.queries,
        ...config?.defaultOptions?.queries,
      },
      mutations: {
        ...defaultQueryConfig.defaultOptions?.mutations,
        ...config?.defaultOptions?.mutations,
      },
    },
  };

  return new QueryClient(mergedConfig);
}
