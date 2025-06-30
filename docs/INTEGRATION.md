# Django-Next Integration Guide

This guide explains how the generated SDK integrates with the `@django-next/client` package and how to set up your Next.js application for optimal use.

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Your Next.js Application                 │
├─────────────────────────────────────────────────────────────┤
│  Generated SDK (CLI Output)        │  Client Package        │
│  ├── api.ts (ApiClient)           │  ├── ApiProvider       │
│  ├── hooks.ts (React Query)       │  ├── AuthProvider      │
│  ├── actions.ts (Server Actions)  │  ├── Protected         │
│  ├── types.ts (TypeScript)        │  ├── useFileUpload     │
│  └── validators.ts (Zod)          │  └── Utilities         │
├─────────────────────────────────────────────────────────────┤
│                    Shared Context                           │
│  ├── API Client Instance (Axios)                           │
│  ├── Authentication State                                  │
│  └── Configuration                                         │
└─────────────────────────────────────────────────────────────┘
```

## 🔧 Setup Process

### 1. Install Dependencies

```bash
# Core dependencies
npm install @django-next/client @tanstack/react-query axios zod

# Development dependencies
npm install -D @django-next/cli
```

### 2. Generate SDK

```bash
# Create configuration
echo 'export default {
  schema: "http://localhost:8000/api/schema/",
  output: "./lib/api",
  baseUrl: "http://localhost:8000"
};' > django.config.js

# Generate SDK
npx django-next generate
```

### 3. Configure Providers

```typescript
// app/providers.tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ApiProvider, AuthProvider } from '@django-next/client';
import { ApiClient } from '../lib/api/api';
import { useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 1,
      },
    },
  }));

  const [apiClient] = useState(() => new ApiClient({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
    timeout: 30000,
    withCredentials: true,
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <ApiProvider api={apiClient}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </ApiProvider>
    </QueryClientProvider>
  );
}
```

```typescript
// app/layout.tsx
import { Providers } from './providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
```

### 4. Implement useApi Hook

The generated hooks need access to your API client. Create this hook:

```typescript
// lib/hooks/useApi.ts
import { useContext } from 'react';
import { ApiContext } from '@django-next/client';
import type { ApiClient } from '../api/api';

export function useApi(): ApiClient {
  const context = useContext(ApiContext);
  
  if (!context) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  
  return context.api as ApiClient;
}

// Make it globally available for generated hooks
declare global {
  function useApi(): ApiClient;
}

(globalThis as any).useApi = useApi;
```

## 🎯 Usage Patterns

### Data Fetching with Generated Hooks

```typescript
// components/UserProfile.tsx
import { useApi_users_retrieve } from '../lib/api/hooks';
import { Protected } from '@django-next/client';

export function UserProfile({ userId }: { userId: number }) {
  const { data: user, isLoading, error } = useApi_users_retrieve({ id: userId });

  if (isLoading) return <div>Loading user...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Protected requireAuth>
      <div>
        <h1>{user?.data.username}</h1>
        <p>{user?.data.email}</p>
        
        <Protected requirePermission="users.change_user">
          <button>Edit User</button>
        </Protected>
      </div>
    </Protected>
  );
}
```

### Mutations with Optimistic Updates

```typescript
// components/PostActions.tsx
import { useApi_posts_update, useApi_posts_list } from '../lib/api/hooks';
import { useQueryClient } from '@tanstack/react-query';

export function PostActions({ postId }: { postId: number }) {
  const queryClient = useQueryClient();
  
  const updatePost = useApi_posts_update({
    onMutate: async (variables) => {
      // Optimistic update
      await queryClient.cancelQueries({ queryKey: ['posts', postId] });
      
      const previousPost = queryClient.getQueryData(['posts', postId]);
      
      queryClient.setQueryData(['posts', postId], (old: any) => ({
        ...old,
        data: { ...old?.data, ...variables }
      }));
      
      return { previousPost };
    },
    onError: (err, variables, context) => {
      // Rollback on error
      if (context?.previousPost) {
        queryClient.setQueryData(['posts', postId], context.previousPost);
      }
    },
    onSettled: () => {
      // Refetch to ensure consistency
      queryClient.invalidateQueries({ queryKey: ['posts', postId] });
    }
  });

  return (
    <button 
      onClick={() => updatePost.mutate({ 
        id: postId, 
        title: 'Updated Title' 
      })}
    >
      Update Post
    </button>
  );
}
```

### Server Actions with Form Handling

```typescript
// app/posts/create/page.tsx
import { api_posts_createAction } from '../../../lib/api/actions';
import { revalidatePath } from 'next/cache';

async function createPostAction(formData: FormData) {
  'use server';
  
  try {
    const result = await api_posts_createAction({
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      author: 1, // Get from session
    });
    
    revalidatePath('/posts');
    return { success: true, data: result };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to create post' 
    };
  }
}

export default function CreatePostPage() {
  return (
    <form action={createPostAction}>
      <input name="title" placeholder="Post title" required />
      <textarea name="content" placeholder="Post content" required />
      <button type="submit">Create Post</button>
    </form>
  );
}
```

## 🔐 Authentication Integration

### Login Flow

```typescript
// components/AuthForm.tsx
import { useAuth } from '@django-next/client';
import { useApi_auth_login_create } from '../lib/api/hooks';

export function AuthForm() {
  const { isAuthenticated, user, logout } = useAuth();
  
  const loginMutation = useApi_auth_login_create({
    onSuccess: (data) => {
      // Auth state is automatically updated by the client package
      console.log('Login successful');
    }
  });

  if (isAuthenticated) {
    return (
      <div>
        <p>Welcome, {user?.username}!</p>
        <button onClick={logout}>Logout</button>
      </div>
    );
  }

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    loginMutation.mutate({
      username: formData.get('username') as string,
      password: formData.get('password') as string,
    });
  };

  return (
    <form onSubmit={handleLogin}>
      <input name="username" placeholder="Username" required />
      <input name="password" type="password" placeholder="Password" required />
      <button type="submit" disabled={loginMutation.isPending}>
        {loginMutation.isPending ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
```

## 📁 File Upload Integration

```typescript
// components/FileUploadForm.tsx
import { useApi_files_create } from '../lib/api/hooks';
import { useFileUpload } from '@django-next/client';
import { useState } from 'react';

export function FileUploadForm() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  // Generated hook with progress support
  const uploadMutation = useApi_files_create({
    onUploadProgress: (progress) => {
      console.log(`Upload progress: ${progress}%`);
    }
  });

  // Client package utility for enhanced file handling
  const { uploadFile, progress, isUploading } = useFileUpload({
    onProgress: (progress) => console.log(`Progress: ${progress}%`),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    // Use generated hook
    uploadMutation.mutate({
      file: selectedFile,
      title: 'My File',
      description: 'File description'
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
      />
      <button type="submit" disabled={!selectedFile || uploadMutation.isPending}>
        {uploadMutation.isPending ? 'Uploading...' : 'Upload'}
      </button>
      
      {uploadMutation.isPending && (
        <div>Progress: {progress}%</div>
      )}
    </form>
  );
}
```

## 🔄 State Management

The integration provides several layers of state management:

1. **React Query**: Automatic caching, background updates, optimistic updates
2. **Auth State**: Global authentication state via AuthProvider
3. **API State**: Shared API client configuration via ApiProvider
4. **Form State**: Server Actions for form submissions with revalidation

## 🚀 Best Practices

1. **Use TypeScript**: The generated SDK provides complete type safety
2. **Implement Error Boundaries**: Handle API errors gracefully
3. **Use Optimistic Updates**: For better UX in mutations
4. **Cache Management**: Leverage React Query's caching strategies
5. **Authentication**: Use Protected components for RBAC
6. **File Uploads**: Use progress tracking for better UX
7. **Server Actions**: For form submissions and server-side operations

## 🔧 Troubleshooting

### Common Issues

1. **useApi not found**: Make sure you've implemented the global useApi hook
2. **Context errors**: Ensure components are wrapped in providers
3. **Type errors**: Regenerate SDK after Django model changes
4. **Auth issues**: Check CSRF tokens and CORS configuration
5. **Upload failures**: Verify file size limits and content types

### Debug Mode

Enable verbose logging:

```typescript
const apiClient = new ApiClient({
  baseURL: 'http://localhost:8000',
  // Add request/response interceptors for debugging
});
```

## 📚 Next Steps

- [CLI Reference](../packages/cli/README.md)
- [Client Package API](../packages/client/README.md)
- [Examples Repository](./examples/)
- [Troubleshooting Guide](./TROUBLESHOOTING.md)
