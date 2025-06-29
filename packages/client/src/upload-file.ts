import { AxiosInstance } from 'axios';

export interface UploadFileOptions {
  onProgress?: (progress: number) => void;
  headers?: Record<string, string>;
}

/**
 * Upload a file to a given endpoint using FormData and axios instance.
 * @param axiosInstance - The axios instance to use (with auth, CSRF, etc.)
 * @param endpoint - The API endpoint (e.g., '/api/upload/')
 * @param file - The file to upload
 * @param data - Additional form fields (optional)
 * @param options - Progress and headers options
 */
export async function uploadFile(
  axiosInstance: AxiosInstance,
  endpoint: string,
  file: File,
  data?: Record<string, any>,
  options?: UploadFileOptions
) {
  const formData = new FormData();
  formData.append('file', file);
  if (data) {
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
  }
  const response = await axiosInstance.post(endpoint, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      ...(options?.headers || {}),
    },
    onUploadProgress: (event) => {
      if (options?.onProgress && event.total) {
        options.onProgress(Math.round((event.loaded * 100) / event.total));
      }
    },
  });
  return response.data;
}
