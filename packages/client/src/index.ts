// Entry point for @django-next/client
export * from './client';
export * from './auth';
export * from './components/Protected';
export * from './upload-file';
export * from './hooks/use-file-upload';

// Legacy API context exports (for backward compatibility)
export { ApiProvider, useApi, useAxiosInstance } from './api-context';

// New unified provider exports (recommended)
export {
  DjangoNextProvider,
  useApiContext,
  useApiClient,
  useApiConfig,
  DjangoApiContext
} from './django-next-provider';

// Re-export commonly used types
export type {
  DjangoClientConfig,
  AuthConfig,
  RuntimeConfig,
} from './client';

export type {
  User,
  AuthError,
  LoginCredentials,
  DjangoNextAuthConfig,
} from './auth';

export type {
  FileUploadError,
  FileUploadResult,
  UploadFileOptions,
} from './upload-file';

export type {
  ApiContextValue,
  ApiProviderProps,
} from './api-context';

// export type {
//   DjangoNextQueryProviderProps,
// } from './query-provider'; // Excluded due to missing dev dependencies
