// Entry point for @django-next/client
export * from './client';
export * from './auth';
export * from './components/Protected';
export * from './upload-file';
export * from './hooks/use-file-upload';

// Unified provider exports
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

// Legacy types removed - use DjangoNextProvider types instead // Excluded due to missing dev dependencies
