// hooks-generator.ts: Generate React Query hooks
import fs from 'fs';
import path from 'path';
import { createLogger } from '../utils/logger';

const logger = createLogger('hooks-generator');

export async function generateHooks(config: any, endpoints: any[]): Promise<void> {
  logger.info(`Generating React Query hooks for ${endpoints.length} endpoints`);
  
  const hooksOut = path.join(config.output, 'hooks.ts');
  
  try {
    const content = generateHooksContent(endpoints);
    fs.writeFileSync(hooksOut, content);
    logger.info('Successfully generated hooks.ts');
  } catch (error) {
    logger.error('Failed to generate hooks.ts', error);
    throw error;
  }
}

function generateHooksContent(endpoints: any[]): string {
  const header = `// hooks.ts - Generated React Query hooks
// This file is auto-generated. Do not edit manually.
// Generated at: ${new Date().toISOString()}

import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  UseMutationOptions,
  QueryKey
} from '@tanstack/react-query';
import { ApiClient } from './api';
import * as types from './types';
import { AxiosResponse, AxiosError } from 'axios';

// Hook to get API client instance - you should implement this in your app
// Example: const useApi = () => useMemo(() => new ApiClient({ baseURL: 'your-api-url' }), []);
declare function useApi(): ApiClient;

// Hook options types
export interface QueryHookOptions<TData, TError = AxiosError> 
  extends Omit<UseQueryOptions<AxiosResponse<TData>, TError>, 'queryKey' | 'queryFn'> {}

export interface MutationHookOptions<TData, TVariables, TError = AxiosError>
  extends Omit<UseMutationOptions<AxiosResponse<TData>, TError, TVariables>, 'mutationFn'> {
  onUploadProgress?: (progress: number) => void;
}

// Query key factory for consistent cache management
export const queryKeys = {
`;

  // Generate query key factory
  const queryKeyFactory = generateQueryKeyFactory(endpoints);
  
  const hooks = endpoints.map(generateHook).join('\n\n');
  
  const footer = `
// Utility hooks for common patterns
export function useInvalidateQueries() {
  const queryClient = useQueryClient();
  
  return {
    invalidateAll: () => queryClient.invalidateQueries(),
    invalidateByTag: (tag: string) => queryClient.invalidateQueries({ queryKey: [tag] }),
    invalidateByOperation: (operationId: string) => queryClient.invalidateQueries({ queryKey: [operationId] }),
  };
}

export function usePrefetchQuery() {
  const queryClient = useQueryClient();
  const api = useApi();
  
  return {
    prefetch: async <T>(queryKey: QueryKey, queryFn: () => Promise<AxiosResponse<T>>) => {
      await queryClient.prefetchQuery({ queryKey, queryFn });
    },
  };
}
`;

  return header + queryKeyFactory + '};\n\n' + hooks + footer;
}

function generateQueryKeyFactory(endpoints: any[]): string {
  const queryOperations = endpoints.filter(ep => ep.method === 'get');
  
  return queryOperations.map(ep => {
    const tag = ep.tags?.[0] || 'default';
    return `  ${ep.operationId}: (params?: any) => ['${tag}', '${ep.operationId}', params] as const,`;
  }).join('\n');
}

function generateHook(endpoint: any): string {
  const { operationId, method, path, tags } = endpoint;
  const tag = tags?.[0] || 'default';
  const hookName = `use${capitalize(operationId)}`;
  
  const paramsType = `types.paths["${path}"]["${method}"] extends { parameters: infer P } ? P : undefined`;
  const responseType = `types.paths["${path}"]["${method}"] extends { responses: { 200: { content: infer R } } } ? R : any`;

  if (method === 'get') {
    return `/**
 * ${hookName} - Query hook for ${operationId}
 * @param params - Query parameters
 * @param options - React Query options
 */
export function ${hookName}(
  params?: ${paramsType},
  options?: QueryHookOptions<${responseType}>
) {
  const api = useApi();
  
  return useQuery({
    queryKey: queryKeys.${operationId}(params),
    queryFn: () => api.${operationId}(params),
    ...options,
  });
}`;
  } else {
    return `/**
 * ${hookName} - Mutation hook for ${operationId}
 * @param options - React Query mutation options
 */
export function ${hookName}(
  options?: MutationHookOptions<${responseType}, ${paramsType}>
) {
  const api = useApi();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: ${paramsType}) => {
      const config = options?.onUploadProgress
        ? { onUploadProgress: options.onUploadProgress } as any
        : undefined;
      return api.${operationId}(data, config);
    },
    onSuccess: (data, variables, context) => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ['${tag}'] });
      
      // Call user-provided onSuccess
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
}`;
  }
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
