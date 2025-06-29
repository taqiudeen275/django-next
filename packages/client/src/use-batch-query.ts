import { useQueries, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';

/**
 * Batch hook for running multiple queries in parallel using React Query.
 * @param queries - Array of query configs (queryKey, queryFn, etc.)
 * @returns Array of query results in order
 */
export function useBatchQuery<T = unknown>(queries: UseQueryOptions<T, any, T, any>[]): UseQueryResult<T, any>[] {
  return useQueries({ queries });
}
