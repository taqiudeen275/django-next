# @django-next/client

## Purpose and Functionality
This package provides the type-safe client SDK for integrating Django REST Framework APIs with Next.js apps. It includes a generated API client, React hooks, authentication/session management, RBAC utilities, file upload, and batch utilities.

## Pseudocode / Logic Flow
- `createDjangoClient`: Initializes axios, sets up interceptors, returns SDK object
- `AuthProvider`/`useAuth`: Provides session state and auth actions
- `Protected`: Conditionally renders children based on user roles/permissions
- `uploadFile`: Utility for file uploads with progress
- `batchApiCalls`: Utility for batching API client methods
- `useBatchQuery`: React Query hook for batching queries

## Key Functions
- `createDjangoClient(config)`
- `AuthProvider`, `useAuth`, `Protected`
- `uploadFile(axiosInstance, endpoint, file, data?, options?)`
- `batchApiCalls([fn1, fn2, ...])`
- `useBatchQuery([query1, query2, ...])`

## File Upload Utility

The `uploadFile` utility provides a simple way to upload files to your Django REST API using an axios instance. It supports progress tracking and additional form fields.

### Usage
```typescript
import { uploadFile } from '@django-next/client/upload-file';
await uploadFile(api.axios, '/api/upload/', file, { extraField: 'value' }, {
  onProgress: (percent) => console.log(`Upload: ${percent}%`)
});
```

## Batch API Calls Utility

The `batchApiCalls` utility lets you run multiple API client methods in parallel and get all results in order.

### Usage
```typescript
import { batchApiCalls } from '@django-next/client/batch-api-calls';
const results = await batchApiCalls([
  () => api.getUser({ id: 1 }),
  () => api.getPosts({ page: 1 }),
]);
```

## Batch Query Hook

The `useBatchQuery` hook lets you run multiple queries in parallel in React components using React Query.

### Usage
```typescript
import { useBatchQuery } from '@django-next/client/use-batch-query';
const results = useBatchQuery([
  { queryKey: ['user', 1], queryFn: () => api.getUser({ id: 1 }) },
  { queryKey: ['posts', 1], queryFn: () => api.getPosts({ page: 1 }) },
]);
```

Each result in the array is a React Query result object (with `data`, `isLoading`, etc).

## API Client and AuthProvider Interfaces

### API Client Interface Example
```typescript
export interface DjangoNextApi {
  _authConfig?: DjangoNextAuthConfig;
  // Add your generated endpoint methods here, e.g.:
  getUser(params: any): Promise<any>;
  // ...
}

export interface DjangoNextAuthConfig {
  loginUrl?: string;
  logoutUrl?: string;
  userUrl?: string;
  refreshUrl?: string;
}
```

### AuthProvider Props Interface
```typescript
import { DjangoNextApi, DjangoNextAuthConfig } from '@django-next/client';

interface AuthProviderProps {
  api: DjangoNextApi;
  auth?: DjangoNextAuthConfig; // Optional runtime override
  children: React.ReactNode;
}
```

### Usage Example (with runtime config)
```typescript
import { createDjangoClient, AuthProvider } from '@django-next/client';

const client = createDjangoClient(
  { baseUrl, apiClass, hooksObject, auth: { /* codegen defaults */ } },
  { auth: { loginUrl: '/custom/login/', userUrl: '/custom/me/' } } // runtime override
);

<AuthProvider api={client.api} auth={{ loginUrl: '/custom/login/' }}>
  {/* ... */}
</AuthProvider>
```

## Dependencies
- `axios`, `@tanstack/react-query`, `@tanstack/react-query-next-experimental`

## Debugging Scenarios
- Auth/session issues: Check cookies and API endpoints
- Query/mutation errors: Inspect hook usage and API responses
- Type errors: Run `npx tsc --noEmit` for diagnostics
