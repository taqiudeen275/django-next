import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';

export interface DjangoClientConfig {
  baseUrl: string;
  apiClass: any;
  hooksObject?: any;
  auth?: AuthConfig;
  timeout?: number;
  withCredentials?: boolean;
  headers?: Record<string, string>;
  onError?: (error: AxiosError) => void;
  onTokenRefresh?: () => void;
  onLogout?: () => void;
}

export interface AuthConfig {
  loginUrl?: string;
  logoutUrl?: string;
  userUrl?: string;
  refreshUrl?: string;
  tokenHeader?: string;
}

export interface RuntimeConfig {
  auth?: Partial<AuthConfig>;
  headers?: Record<string, string>;
}

// Enhanced CSRF token helper with better error handling
function getCsrfToken(): string {
  if (typeof document === 'undefined') return '';

  try {
    // Try multiple cookie names (Django variations)
    const cookieNames = ['csrftoken', 'csrf_token', 'CSRF-TOKEN'];

    for (const name of cookieNames) {
      const match = document.cookie.match(new RegExp(`${name}=([^;]+)`));
      if (match) {
        return decodeURIComponent(match[1]);
      }
    }

    // Try meta tag as fallback
    const metaTag = document.querySelector('meta[name="csrf-token"]');
    if (metaTag) {
      return metaTag.getAttribute('content') || '';
    }

    return '';
  } catch (error) {
    console.warn('Failed to get CSRF token:', error);
    return '';
  }
}

// Helper to merge auth configurations
function mergeAuthConfig(baseAuth?: AuthConfig, runtimeAuth?: Partial<AuthConfig>): AuthConfig {
  return {
    loginUrl: '/api/auth/login/',
    logoutUrl: '/api/auth/logout/',
    userUrl: '/api/auth/me/',
    refreshUrl: '/api/auth/refresh/',
    tokenHeader: 'Authorization',
    ...baseAuth,
    ...runtimeAuth,
  };
}

// Enhanced client creation with better configuration and error handling
export function createDjangoClient(config: DjangoClientConfig, runtimeConfig?: RuntimeConfig) {
  // Merge configurations
  const authConfig = mergeAuthConfig(config.auth, runtimeConfig?.auth);

  // Create axios instance with enhanced configuration
  const axiosInstance: AxiosInstance = axios.create({
    baseURL: config.baseUrl,
    timeout: config.timeout || 30000,
    withCredentials: config.withCredentials ?? true,
    headers: {
      'Content-Type': 'application/json',
      ...config.headers,
      ...runtimeConfig?.headers,
    },
  });

  // Enhanced CSRF interceptor
  axiosInstance.interceptors.request.use(
    (requestConfig) => {
      const method = (requestConfig.method || '').toLowerCase();

      // Add CSRF token for state-changing requests
      if (['post', 'put', 'patch', 'delete'].includes(method)) {
        const csrfToken = getCsrfToken();
        if (csrfToken) {
          requestConfig.headers = requestConfig.headers || {};
          requestConfig.headers['X-CSRFToken'] = csrfToken;
        }
      }

      return requestConfig;
    },
    (error) => Promise.reject(error)
  );

  // Enhanced auth refresh interceptor with better error handling
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

      // Handle 401/403 errors with token refresh
      if (
        (error.response?.status === 401 || error.response?.status === 403) &&
        !originalRequest._retry &&
        originalRequest.url !== authConfig.refreshUrl
      ) {
        originalRequest._retry = true;

        try {
          await axiosInstance.post(authConfig.refreshUrl!, {}, { withCredentials: true });

          // Notify about successful token refresh
          config.onTokenRefresh?.();

          // Retry original request
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          // Token refresh failed - trigger logout
          console.warn('Token refresh failed:', refreshError);
          config.onLogout?.();

          // Redirect to login if in browser
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }

          return Promise.reject(refreshError);
        }
      }

      // Call error handler if provided
      config.onError?.(error);

      return Promise.reject(error);
    }
  );

  // Create API instance with enhanced configuration
  const api = new config.apiClass(axiosInstance);

  // Attach configuration for use by other components
  api._config = {
    auth: authConfig,
    baseUrl: config.baseUrl,
    axiosInstance,
  };

  // Return enhanced client object
  return {
    api,
    axiosInstance,
    config: authConfig,
    ...config.hooksObject,
  };
}
