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

import React from 'react';
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  UseMutationOptions,
  QueryKey
} from '@tanstack/react-query';
import { useApiClient } from '@django-next/client';
import { ApiClient } from './api';
import * as types from './types';
import * as validators from './validators';
import { AxiosResponse, AxiosError } from 'axios';

// Hook options types
export interface QueryHookOptions<TData, TError = AxiosError>
  extends Omit<UseQueryOptions<AxiosResponse<TData>, TError>, 'queryKey' | 'queryFn'> {}

export interface MutationHookOptions<TData, TVariables, TError = AxiosError>
  extends Omit<UseMutationOptions<AxiosResponse<TData>, TError, TVariables>, 'mutationFn'> {
  onUploadProgress?: (progress: number) => void;
}

// Enhanced mutation result with upload progress
export interface MutationWithProgressResult<TData, TVariables, TError = AxiosError> {
  mutate: (variables: TVariables) => void;
  mutateAsync: (variables: TVariables) => Promise<AxiosResponse<TData>>;
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: TError | null;
  data: AxiosResponse<TData> | undefined;
  progress: number;
  isUploading: boolean;
  reset: () => void;
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
  const api = useApiClient<ApiClient>();

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
  const { operationId, method, path, tags, validatorName } = endpoint;
  const tag = tags?.[0] || 'default';
  const hookName = `use${capitalize(operationId)}`;

  // Extract proper parameter types based on HTTP method
  let paramsType: string;
  if (method === 'get') {
    // For GET requests, use query parameters
    paramsType = `types.paths["${path}"]["${method}"] extends { parameters: infer P } ? P : undefined`;
  } else {
    // For POST/PUT/PATCH requests, use request body (try multiple content types)
    paramsType = `types.paths["${path}"]["${method}"] extends { requestBody: { content: { "application/json": infer B } } } ? B :
                  types.paths["${path}"]["${method}"] extends { requestBody: { content: { "multipart/form-data": infer B } } } ? B :
                  types.paths["${path}"]["${method}"] extends { requestBody: { content: { "application/x-www-form-urlencoded": infer B } } } ? B : any`;
  }

  // Extract response type (try multiple status codes)
  const responseType = `types.paths["${path}"]["${method}"] extends { responses: { 200: { content: { "application/json": infer R } } } } ? R :
                        types.paths["${path}"]["${method}"] extends { responses: { 201: { content: { "application/json": infer R } } } } ? R : any`;

  // Generate validation check if validator exists
  const validationCheck = validatorName ? `
    // Validate input parameters
    if (params) {
      try {
        validators.${validatorName}Validator.parse(params);
      } catch (error) {
        throw new Error(\`Validation failed for ${operationId}: \${error.message}\`);
      }
    }` : '';

  const mutationValidationCheck = validatorName ? `
      // Validate input parameters
      if (data) {
        try {
          validators.${validatorName}Validator.parse(data);
        } catch (error) {
          throw new Error(\`Validation failed for ${operationId}: \${error.message}\`);
        }
      }` : '';

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
  const api = useApiClient<ApiClient>();
  ${validationCheck}

  return useQuery<AxiosResponse<${responseType}>, AxiosError>({
    queryKey: queryKeys.${operationId}(params),
    queryFn: () => api.${operationId}(params),
    ...options,
  });
}`;
  } else {
    // Check if this endpoint likely handles file uploads
    const isFileUpload = path.includes('upload') || path.includes('file') ||
                        endpoint.requestBody?.content?.['multipart/form-data'];

    if (isFileUpload) {
      return `/**
 * ${hookName} - Mutation hook for ${operationId} with file upload progress
 * @param options - React Query mutation options with upload progress
 */
export function ${hookName}(
  options?: MutationHookOptions<${responseType}, ${paramsType}>
): MutationWithProgressResult<${responseType}, ${paramsType}> {
  const api = useApiClient<ApiClient>();
  const queryClient = useQueryClient();
  const [progress, setProgress] = React.useState(0);
  const [isUploading, setIsUploading] = React.useState(false);

  const mutation = useMutation<AxiosResponse<${responseType}>, AxiosError, ${paramsType}>({
    mutationFn: (data: ${paramsType}) => {
      ${mutationValidationCheck}
      setIsUploading(true);
      setProgress(0);

      const config = {
        onUploadProgress: (progressValue: number) => {
          setProgress(progressValue);
          options?.onUploadProgress?.(progressValue);
        }
      } as any;

      return api.${operationId}(data, config);
    },
    onSuccess: (data, variables, context) => {
      setIsUploading(false);
      setProgress(100);

      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ['${tag}'] });

      // Call user-provided onSuccess
      options?.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      setIsUploading(false);
      setProgress(0);

      // Call user-provided onError
      options?.onError?.(error, variables, context);
    },
    onSettled: (data, error, variables, context) => {
      setIsUploading(false);

      // Call user-provided onSettled
      options?.onSettled?.(data, error, variables, context);
    },
    ...options,
  });

  return {
    ...mutation,
    progress,
    isUploading: isUploading && mutation.isPending,
  };
}`;
    } else {
      return `/**
 * ${hookName} - Mutation hook for ${operationId}
 * @param options - React Query mutation options
 */
export function ${hookName}(
  options?: MutationHookOptions<${responseType}, ${paramsType}>
) {
  const api = useApiClient<ApiClient>();
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<${responseType}>, AxiosError, ${paramsType}>({
    mutationFn: (data: ${paramsType}) => {
      ${mutationValidationCheck}
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
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
