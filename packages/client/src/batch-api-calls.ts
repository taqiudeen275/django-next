// batch-api-calls.ts
/**
 * Batch utility for running multiple API client methods in parallel.
 * @param calls - Array of functions that return promises (e.g., () => api.getUser(params))
 * @param options - { atom?: boolean } - if atom is true, fail on first error; if false, return results/errors per call
 * @returns Promise resolving to an array of results or errors in order
 */
export async function batchApiCalls<T>(
  calls: Array<() => Promise<T>>,
  options?: { atom?: boolean }
): Promise<(T | { error: string })[]> {
  const atom = options?.atom ?? true;
  if (atom) {
    // Fail on first error (classic Promise.all)
    try {
      return await Promise.all(calls.map(fn => fn()));
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : String(err));
    }
  } else {
    // Return all results, errors as { error: ... }
    return Promise.all(
      calls.map(async fn => {
        try {
          return await fn();
        } catch (err) {
          return { error: err instanceof Error ? err.message : String(err) };
        }
      })
    );
  }
}
