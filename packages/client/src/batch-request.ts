import { AxiosInstance } from 'axios';

export interface BatchRequestItem {
  method: 'get' | 'post' | 'put' | 'patch' | 'delete';
  url: string;
  data?: any;
  headers?: Record<string, string>;
}

/**
 * Send a batch of API requests to a batch endpoint.
 * @param axiosInstance - The axios instance to use (with auth, CSRF, etc.)
 * @param batchEndpoint - The batch API endpoint (e.g., '/api/batch/')
 * @param requests - Array of request items
 * @returns Array of responses (order matches requests)
 */
export async function batchRequest(
  axiosInstance: AxiosInstance,
  batchEndpoint: string,
  requests: BatchRequestItem[]
) {
  const response = await axiosInstance.post(batchEndpoint, { requests });
  // Assumes the backend returns an array of responses in the same order
  return response.data;
}
