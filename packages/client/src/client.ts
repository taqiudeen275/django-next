import axios, { AxiosInstance } from 'axios';

// Helper to get CSRF token from cookies (Django default)
function getCsrfToken() {
  if (typeof document === 'undefined') return '';
  const match = document.cookie.match(/csrftoken=([^;]+)/);
  return match ? match[1] : '';
}

// createDjangoClient function and core logic placeholder
export function createDjangoClient(config: { baseUrl: string; apiClass: any; hooksObject: any; }) {
  // Create an axios instance with base URL
  const axiosInstance: AxiosInstance = axios.create({ baseURL: config.baseUrl });

  // CSRF Interceptor (for POST, PUT, PATCH, DELETE)
  axiosInstance.interceptors.request.use((req) => {
    if (['post', 'put', 'patch', 'delete'].includes((req.method || '').toLowerCase())) {
      req.headers = req.headers || {};
      req.headers['X-CSRFToken'] = getCsrfToken();
    }
    return req;
  });

  // Auth refresh interceptor (placeholder, needs real logic)
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      // TODO: Implement token refresh logic if 401/403
      return Promise.reject(error);
    }
  );

  // Instantiate the API client with the axios instance
  const api = new config.apiClass(axiosInstance);

  // Return the API client and hooks
  return {
    api,
    ...config.hooksObject,
  };
}
