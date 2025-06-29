// batch-api-calls.ts
/**
 * Batch utility for running multiple API client methods in parallel.
 * @param calls - Array of functions that return promises (e.g., () => api.getUser(params))
 * @returns Promise resolving to an array of results in order
 */
export async function batchApiCalls<T>(calls: Array<() => Promise<T>>): Promise<T[]> {
  return Promise.all(calls.map(fn => fn()));
}
