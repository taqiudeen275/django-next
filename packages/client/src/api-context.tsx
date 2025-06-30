import React, { createContext, useContext, useMemo } from 'react';
import { AxiosInstance } from 'axios';

export interface ApiContextValue {
  api: any;
  axiosInstance: AxiosInstance;
  config: any;
  baseUrl: string;
}

// Enhanced context to provide the API client and related utilities to hooks
export const ApiContext = createContext<ApiContextValue | null>(null);

export interface ApiProviderProps {
  children: React.ReactNode;
  api: any;
  axiosInstance?: AxiosInstance;
  config?: any;
  baseUrl?: string;
}

export function ApiProvider({
  api,
  children,
  axiosInstance,
  config,
  baseUrl
}: ApiProviderProps) {
  const contextValue = useMemo(() => ({
    api,
    axiosInstance: axiosInstance || api._config?.axiosInstance,
    config: config || api._config,
    baseUrl: baseUrl || api._config?.baseUrl || '',
  }), [api, axiosInstance, config, baseUrl]);

  return (
    <ApiContext.Provider value={contextValue}>
      {children}
    </ApiContext.Provider>
  );
}

export function useApi<T = any>() {
  const context = useContext(ApiContext);

  if (!context) {
    throw new Error('useApi must be used within an ApiProvider');
  }

  return context.api as T;
}

export function useApiContext() {
  const context = useContext(ApiContext);

  if (!context) {
    throw new Error('useApiContext must be used within an ApiProvider');
  }

  return context;
}

export function useAxiosInstance() {
  const context = useContext(ApiContext);

  if (!context) {
    throw new Error('useAxiosInstance must be used within an ApiProvider');
  }

  return context.axiosInstance;
}
