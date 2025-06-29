import axios, { AxiosInstance } from 'axios';

// Helper to get CSRF token from cookies (Django default)
function getCsrfToken() {
  if (typeof document === 'undefined') return '';
  const match = document.cookie.match(/csrftoken=([^;]+)/);
  return match ? match[1] : '';
}

// Helper to get endpoint from config with fallback
function getAuthEndpoint(runtimeAuth: any, codegenAuth: any, key: string, fallback: string) {
  return (runtimeAuth && runtimeAuth[key]) || (codegenAuth && codegenAuth[key]) || fallback;
}

export function createDjangoClient(config: { baseUrl: string; apiClass: any; hooksObject: any; auth?: any }, runtimeConfig?: { auth?: any }) {
  // Create an axios instance with base URL
  const axiosInstance: AxiosInstance = axios.create({ baseURL: config.baseUrl, withCredentials: true });

  // CSRF Interceptor (for POST, PUT, PATCH, DELETE)
  axiosInstance.interceptors.request.use((req) => {
    if (["post", "put", "patch", "delete"].includes((req.method || '').toLowerCase())) {
      req.headers = req.headers || {};
      req.headers['X-CSRFToken'] = getCsrfToken();
    }
    return req;
  });

  // Auth refresh interceptor for JWT (http-only cookie)
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      // If 401/403, try to refresh token (if not already tried)
      if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          // Use runtime config, then codegen config, then fallback
          const refreshUrl = getAuthEndpoint(runtimeConfig?.auth, config.auth, 'refreshUrl', '/api/auth/refresh/');
          await axiosInstance.post(refreshUrl, {}, { withCredentials: true });
          // Retry original request
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          // If refresh fails, logout user (optional: emit event)
        }
      }
      return Promise.reject(error);
    }
  );

  // Attach merged auth config to api instance for use in AuthProvider
  const mergedAuth = { ...config.auth, ...(runtimeConfig?.auth || {}) };
  const api = new config.apiClass(axiosInstance);
  api._authConfig = mergedAuth;

  // Return the API client and hooks
  return {
    api,
    ...config.hooksObject,
  };
}
