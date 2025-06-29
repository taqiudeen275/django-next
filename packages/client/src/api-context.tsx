import React, { createContext, useContext } from 'react';

export const ApiContext = createContext<any>(null);

export function ApiProvider({ api, children }: { api: any; children: React.ReactNode }) {
  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
}

export function useApi<T = any>() {
  const api = useContext(ApiContext);
  if (!api) throw new Error('useApi must be used within an ApiProvider');
  return api as T;
}
