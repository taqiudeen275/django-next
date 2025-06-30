// Entry point for @django-next/client
export * from './client';
export * from './api-context';
export * from './auth';
// export * from './query-provider'; // Excluded due to missing dev dependencies
export * from './components/Protected';
export * from './upload-file';
export * from './hooks/use-file-upload';

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
