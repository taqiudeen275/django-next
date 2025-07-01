# Fix Guide for Client Package Issues

## Problem
- Login requests going to `/auth` instead of full URL with base URL
- Configuration not being applied (login, user, and other paths)
- Authentication failing

## Solution

### Step 1: Regenerate Your API Client
Run the CLI again to get the updated API client with the fixes:

```bash
pnpm dlx @django-next/cli generate
```

### Step 2: Update Your Client Setup

**Option A: Recommended - Use createDjangoClient**

```typescript
// lib/api-client.ts
import { createDjangoClient } from '@django-next/client';
import { ApiClient } from './api/api'; // Your generated API client

export const { api, axiosInstance, config } = createDjangoClient({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  apiClass: ApiClient,
  auth: {
    loginUrl: '/api/auth/login/',
    logoutUrl: '/api/auth/logout/',
    userUrl: '/api/auth/me/',
    refreshUrl: '/api/auth/refresh/',
  },
  timeout: 30000,
  withCredentials: true,
});
```

**Option B: Direct API Client (if you prefer)**

```typescript
// lib/api-client.ts
import { ApiClient } from './api/api';

export const api = new ApiClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000', // ⚠️ IMPORTANT: Must include baseURL
  timeout: 30000,
  withCredentials: true,
  auth: {
    loginUrl: '/api/auth/login/',
    logoutUrl: '/api/auth/logout/',
    userUrl: '/api/auth/me/',
    refreshUrl: '/api/auth/refresh/',
  },
});
```

### Step 3: Update Your Providers

```typescript
// app/providers.tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ApiProvider, AuthProvider } from '@django-next/client';
import { api } from '../lib/api-client'; // Your configured API client
import { useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ApiProvider api={api}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </ApiProvider>
    </QueryClientProvider>
  );
}
```

### Step 4: Environment Variables

Make sure your environment variables are set correctly:

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## What Changed

1. **Generated API Client**: Now properly sets up the `_config` property for auth integration
2. **Auth Component**: Now validates that a proper axios instance is available
3. **Better Error Messages**: Clear errors when configuration is missing
4. **Documentation**: Updated with proper setup examples

## Testing

After making these changes, test your authentication:

```typescript
// In a component
import { useAuth } from '@django-next/client';

function LoginComponent() {
  const { login, user, isLoading, error } = useAuth();

  const handleLogin = async () => {
    try {
      await login({ username: 'test', password: 'test' });
      console.log('Login successful!');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div>
      {user ? (
        <p>Welcome, {user.username}!</p>
      ) : (
        <button onClick={handleLogin} disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      )}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}
```

The login should now properly use your base URL and configuration!
