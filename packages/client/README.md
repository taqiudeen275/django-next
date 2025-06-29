# @django-next/client

## Overview
A type-safe, modern SDK for integrating Django REST Framework APIs with Next.js apps. Includes a generated API client, React hooks, authentication/session management, RBAC, file upload, and batch utilities.

## Features
- Fully-typed API client and React hooks (generated from OpenAPI)
- AuthProvider and useAuth for session management
- Protected component for RBAC (roles & permissions)
- File upload utility with progress tracking
- Batch API calls and batch query hooks
- Works with Next.js App Router, Server Components, and Server Actions

## Backend Security Checklist (for Django)
To ensure secure authentication and session management, configure your Django backend as follows:
- **JWT in httpOnly Cookies:** Issue JWT access and refresh tokens only in `httpOnly`, `Secure`, `SameSite=Strict` cookies. Do not expose tokens in localStorage or headers.
- **CSRF Protection:** Enable Django's CSRF middleware. Rotate CSRF tokens on login/logout and ensure the client updates the token.
- **Token Expiry Handling:** On refresh token expiry or invalidation, return a clear error so the client can log out the user.
- **Secure Cookie Flags:** Always set cookies with `Secure`, `HttpOnly`, and `SameSite=Strict` in production.
- **No Sensitive Data in LocalStorage:** Never store sensitive tokens or user info in localStorage/sessionStorage.
- **CORS:** Configure CORS to only allow trusted origins and support credentials.
- **Session Logout:** Invalidate refresh tokens on logout and clear cookies on both client and server.

## Quick Start
1. Generate the SDK using the CLI:
   ```sh
   pnpm dlx @django-next/cli generate
   ```
2. Import and use the generated files in your Next.js app.

## Usage Examples
### API Client
```ts
import { API } from './.django-next/api';
const api = new API();
const data = await api.someEndpoint(params);
```

### React Query Hooks
```tsx
import { useSomeEndpoint } from './.django-next/hooks';
const { data, isLoading, error, isError } = useSomeEndpoint(params);
if (isError) {
  // Handle or display error.message
}
```

### AuthProvider & useAuth
```tsx
import { AuthProvider, useAuth } from '@django-next/client';
<AuthProvider api={api}>
  <YourApp />
</AuthProvider>
```

### Protected (RBAC)
```tsx
import { Protected } from '@django-next/client';
<Protected hasAll={['admin']} fallback={<div>Access denied</div>}>
  <AdminPanel />
</Protected>
```

### File Upload
```ts
import { uploadFile } from '@django-next/client/upload-file';
await uploadFile(api.axios, '/api/upload/', file, { extraField: 'value' }, {
  onProgress: (percent) => console.log(`Upload: ${percent}%`)
});
```

### Batch API Calls
```ts
import { batchApiCalls } from '@django-next/client/batch-api-calls';
// Atom mode (default): fail on first error
try {
  const results = await batchApiCalls([
    () => api.getUser({ id: 1 }),
    () => api.getPosts({ page: 1 }),
  ]);
} catch (err) {
  // Handle/log error, inspect which call failed
}
// Non-atom mode: get all results/errors
const results = await batchApiCalls([
  () => api.getUser({ id: 1 }),
  () => api.getPosts({ page: 1 }),
], { atom: false });
results.forEach((res, i) => {
  if ('error' in res) {
    // Handle error for call i
  } else {
    // Use result for call i
  }
});
```

### Batch Query Hook
```tsx
import { useBatchQuery } from '@django-next/client/use-batch-query';
const { data, isLoading, error } = useBatchQuery([
  { queryKey: ['user'], queryFn: () => api.getUser({ id: 1 }) },
  { queryKey: ['posts'], queryFn: () => api.getPosts({ page: 1 }) },
]);
if (error) {
  // Show error message in UI
}
```

### Server Actions (Next.js)
```ts
import { someEndpointAction } from './.django-next/actions';
export async function action(formData) {
  try {
    return await someEndpointAction(formData);
  } catch (err) {
    // Handle/log error, return custom error response, etc.
    return { error: err instanceof Error ? err.message : String(err) };
  }
}
```

## Error Handling
- **Hooks:** Use `error`/`isError` from React Query hooks to display or handle errors in your UI.
- **Batch:**
  - With `atom: true` (default): use try/catch to handle the first error.
  - With `atom: false`: inspect each result; errors are returned as `{ error: string }` objects.
- **Server Actions:** Always wrap generated actions in try/catch to handle errors gracefully. Actions return `{ error: string }` on failure.

## Troubleshooting
- **Type errors:** Re-run codegen to sync with your API schema.
- **Auth/session issues:** Check your Django backend and config.
- **File upload issues:** Ensure your endpoint accepts `multipart/form-data`.

---
For more, see the generated SDK docs in `.django-next/` after running the CLI.
