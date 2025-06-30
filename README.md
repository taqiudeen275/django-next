# Django-Next SDK

[![npm version](https://badge.fury.io/js/%40django-next%2Fcli.svg)](https://badge.fury.io/js/%40django-next%2Fcli)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> The definitive bridge between Django and Next.js - Generate type-safe, production-ready API clients from your Django REST Framework APIs.

## 🚀 Features

- **🔒 Type-Safe**: Generate fully typed TypeScript clients from OpenAPI schemas
- **⚡ Modern Stack**: Built for Next.js 15+ with App Router, Server Components, and Server Actions
- **🔐 Secure by Default**: Automatic CSRF protection, JWT refresh, and httpOnly cookie support
- **📁 File Uploads**: Built-in file upload support with progress tracking
- **🎯 RBAC Ready**: Role-based access control with permissions and groups
- **🔄 Smart Caching**: Optimized React Query configuration for Django REST APIs
- **📚 Auto Documentation**: Comprehensive documentation generation
- **🛠 Developer Experience**: Enhanced CLI with verbose logging and error handling

## 📦 Installation

```bash
# Install the CLI globally
npm install -g @django-next/cli

# Or use with npx
npx @django-next/cli init

# Install the client package in your Next.js project
npm install @django-next/client axios @tanstack/react-query zod
```

## 🏃‍♂️ Quick Start

### 1. Initialize Configuration

```bash
# Create configuration file
django-next init

# Or with custom options
django-next init --schema http://localhost:8000/api/schema/ --output ./src/api
```

### 2. Generate SDK

```bash
# Generate type-safe client
django-next generate

# With verbose logging
django-next generate --verbose
```

### 3. Setup in Next.js

```typescript
// app/layout.tsx
import { ApiProvider, AuthProvider } from '@django-next/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ApiClient } from './lib/api/api'; // Generated SDK

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

// Create your API client instance with the generated SDK
const apiClient = new ApiClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  timeout: 30000,
  withCredentials: true,
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <ApiProvider api={apiClient}>
            <AuthProvider>
              {children}
            </AuthProvider>
          </ApiProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
```

## 🔗 Integration Architecture

### Generated SDK + Client Package Integration

The Django-Next CLI generates a complete SDK that seamlessly integrates with the `@django-next/client` package:

```
Your Next.js App
├── Generated SDK (from CLI)
│   ├── api.ts          → ApiClient class (extends base functionality)
│   ├── hooks.ts        → React Query hooks (uses ApiProvider)
│   ├── actions.ts      → Server Actions (uses ApiClient)
│   ├── types.ts        → TypeScript definitions
│   └── validators.ts   → Zod schemas with runtime validation
└── Client Package (@django-next/client)
    ├── ApiProvider     → Context for API client
    ├── AuthProvider    → Authentication state management
    ├── Protected       → RBAC components
    └── Utilities       → File upload, error handling, etc.
```

### How It Works

1. **Generated ApiClient**: The CLI creates an `ApiClient` class that includes all your Django endpoints as type-safe methods
2. **Client Package Integration**: The generated hooks use `useApi()` from the client package to access the ApiClient instance
3. **Shared Context**: Both packages share the same API client instance through React Context
4. **Type Safety**: Complete end-to-end type safety from Django models to React components

### Configuration Integration

The generated SDK respects your Django-Next configuration:

```typescript
// django.config.ts
const config: DjangoNextConfig = {
  schema: "http://localhost:8000/api/schema/",
  output: "./lib/api",
  baseUrl: "http://localhost:8000",
  auth: {
    loginUrl: "/api/auth/login/",
    logoutUrl: "/api/auth/logout/",
    userUrl: "/api/auth/me/",
    refreshUrl: "/api/auth/refresh/",
  },
};
```

This configuration is used to:
- Generate the correct API endpoints in `api.ts`
- Configure authentication URLs in the client package
- Set up proper base URLs for both client and server-side requests

### 4. Use Generated Hooks in Components

```typescript
// components/PostList.tsx
import { useApi_posts_list, useApi_posts_create } from '../lib/api/hooks'; // Generated
import { Protected } from '@django-next/client'; // Client package
import { useState } from 'react';

export function PostList() {
  const [page, setPage] = useState(1);

  // Generated hook with automatic caching and error handling
  const {
    data: posts,
    isLoading,
    error,
    refetch
  } = useApi_posts_list({
    page,
    page_size: 10
  });

  // Generated mutation hook
  const createPost = useApi_posts_create({
    onSuccess: () => {
      refetch(); // Refresh the list
    }
  });

  if (isLoading) return <div>Loading posts...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <Protected requirePermission="posts.view_post">
        <ul>
          {posts?.data.results.map(post => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
            </li>
          ))}
        </ul>

        {/* Pagination */}
        <div>
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={!posts?.data.previous}
          >
            Previous
          </button>
          <span>Page {page}</span>
          <button
            onClick={() => setPage(p => p + 1)}
            disabled={!posts?.data.next}
          >
            Next
          </button>
        </div>
      </Protected>

      <Protected requirePermission="posts.add_post">
        <button
          onClick={() => createPost.mutate({
            title: 'New Post',
            content: 'Post content',
            author: 1
          })}
          disabled={createPost.isPending}
        >
          {createPost.isPending ? 'Creating...' : 'Create Post'}
        </button>
      </Protected>
    </div>
  );
}
```

### 5. Server Actions with Revalidation

```typescript
// app/posts/actions.ts
import { api_posts_createAction, api_posts_updateAction } from '../lib/api/actions'; // Generated
import { revalidatePath } from 'next/cache';

export async function createPost(formData: FormData) {
  try {
    // Generated server action with automatic validation
    const result = await api_posts_createAction({
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      author: parseInt(formData.get('author') as string),
    });

    // Revalidate the posts page to show the new post
    revalidatePath('/posts');

    return { success: true, data: result };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

export async function updatePost(id: number, formData: FormData) {
  try {
    const result = await api_posts_updateAction({
      id,
      title: formData.get('title') as string,
      content: formData.get('content') as string,
    });

    revalidatePath('/posts');
    revalidatePath(`/posts/${id}`);

    return { success: true, data: result };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Update failed'
    };
  }
}
```

### 6. File Upload with Progress

```typescript
// components/FileUpload.tsx
import { useApi_upload_create } from '../lib/api/hooks'; // Generated
import { useFileUpload } from '@django-next/client'; // Client package
import { useState } from 'react';

export function FileUpload() {
  const [file, setFile] = useState<File | null>(null);

  // Generated hook with file upload support
  const uploadMutation = useApi_upload_create({
    onUploadProgress: (progress) => {
      console.log(`Upload progress: ${progress}%`);
    },
    onSuccess: (data) => {
      console.log('File uploaded:', data);
      setFile(null);
    }
  });

  // Client package hook for enhanced file handling
  const { uploadFile, progress, isUploading } = useFileUpload({
    onProgress: (progress) => console.log(`Progress: ${progress}%`),
    onComplete: (result) => console.log('Upload complete:', result),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    // Option 1: Use generated hook directly
    uploadMutation.mutate({
      file,
      title: 'My Upload',
      description: 'File description'
    });

    // Option 2: Use client package utility
    // await uploadFile(file, '/api/upload/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button
        type="submit"
        disabled={!file || uploadMutation.isPending}
      >
        {uploadMutation.isPending ? `Uploading... ${progress}%` : 'Upload'}
      </button>

      {uploadMutation.error && (
        <div>Error: {uploadMutation.error.message}</div>
      )}
    </form>
  );
}
```

### 7. Implementing the useApi Hook

The generated hooks expect a `useApi()` function to be available. You need to implement this in your app:

```typescript
// lib/hooks/useApi.ts
import { useContext } from 'react';
import { ApiContext } from '@django-next/client';
import type { ApiClient } from '../api/api'; // Generated

export function useApi(): ApiClient {
  const context = useContext(ApiContext);

  if (!context) {
    throw new Error('useApi must be used within an ApiProvider');
  }

  return context.api as ApiClient;
}

// Make it globally available (optional)
declare global {
  function useApi(): ApiClient;
}

// Export for use in generated hooks
(globalThis as any).useApi = useApi;
```

Or create a module declaration:

```typescript
// types/global.d.ts
import type { ApiClient } from '../lib/api/api';

declare global {
  function useApi(): ApiClient;
}
```

### 8. Authentication Integration

```typescript
// components/LoginForm.tsx
import { useAuth } from '@django-next/client';
import { useApi_auth_login_create } from '../lib/api/hooks'; // Generated

export function LoginForm() {
  const { login, isAuthenticated, user } = useAuth();

  // Generated login hook
  const loginMutation = useApi_auth_login_create({
    onSuccess: (data) => {
      // The client package will automatically handle the auth state
      console.log('Login successful:', data);
    }
  });

  if (isAuthenticated) {
    return <div>Welcome, {user?.username}!</div>;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    loginMutation.mutate({
      username: formData.get('username') as string,
      password: formData.get('password') as string,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" placeholder="Username" required />
      <input name="password" type="password" placeholder="Password" required />
      <button type="submit" disabled={loginMutation.isPending}>
        {loginMutation.isPending ? 'Logging in...' : 'Login'}
      </button>

      {loginMutation.error && (
        <div>Error: {loginMutation.error.message}</div>
      )}
    </form>
  );
}
```

## 📖 Documentation

### Core Concepts

- **[CLI Reference](./packages/cli/README.md)** - Command-line interface documentation
- **[Client Package](./packages/client/README.md)** - React client library documentation
- **[Configuration](./docs/configuration.md)** - Configuration options and examples
- **[Authentication](./docs/authentication.md)** - Authentication and RBAC setup
- **[File Uploads](./docs/file-uploads.md)** - File upload handling and validation
- **[Server Actions](./docs/server-actions.md)** - Next.js Server Actions integration

### Guides

- **[Getting Started](./docs/getting-started.md)** - Complete setup guide
- **[Migration Guide](./docs/migration.md)** - Upgrading from previous versions
- **[Best Practices](./docs/best-practices.md)** - Recommended patterns and practices
- **[Troubleshooting](./docs/troubleshooting.md)** - Common issues and solutions

### API Reference

- **[Generated API Client](./docs/api-client.md)** - API client methods and configuration
- **[React Hooks](./docs/react-hooks.md)** - React Query hooks reference
- **[Components](./docs/components.md)** - React components reference
- **[Utilities](./docs/utilities.md)** - Utility functions and helpers

## 🔧 Configuration

### Django Configuration

```typescript
// django.config.ts
import type { DjangoNextConfig } from '@django-next/cli';

const config: DjangoNextConfig = {
  schema: "http://127.0.0.1:8000/api/schema/",
  output: "./.django-next",
  baseUrl: "http://127.0.0.1:8000",
  auth: {
    loginUrl: "/api/auth/login/",
    logoutUrl: "/api/auth/logout/",
    userUrl: "/api/auth/me/",
    refreshUrl: "/api/auth/refresh/",
  },
};

export default config;
```

### Client Configuration

```typescript
import { createDjangoClient } from '@django-next/client';
import { ApiClient } from './api/api';

const client = createDjangoClient({
  baseUrl: 'http://localhost:8000',
  apiClass: ApiClient,
  timeout: 30000,
  onError: (error) => console.error('API Error:', error),
  onTokenRefresh: () => console.log('Token refreshed'),
  onLogout: () => window.location.href = '/login',
});
```

## 🔐 Authentication & RBAC

```typescript
import { useAuth, Protected, RequireRole } from '@django-next/client';

function Dashboard() {
  const { user, hasPermission, hasRole } = useAuth();

  return (
    <div>
      <h1>Welcome, {user?.username}!</h1>
      
      <Protected requiredPermissions={['posts.add_post']}>
        <CreatePostButton />
      </Protected>
      
      <RequireRole role="admin">
        <AdminPanel />
      </RequireRole>
      
      {hasPermission('posts.delete_post') && (
        <DeleteAllButton />
      )}
    </div>
  );
}
```

## 📁 File Uploads

```typescript
import { useFileUpload } from '@django-next/client';

function FileUploadForm() {
  const { files, addFiles, isUploading, progress, error } = useFileUpload({
    maxSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: ['image/jpeg', 'image/png'],
    maxFiles: 5,
  });

  const { mutate: uploadFiles } = useUploadFiles({
    onUploadProgress: (progress) => console.log(`Upload: ${progress}%`),
  });

  return (
    <div>
      <input
        type="file"
        multiple
        onChange={(e) => addFiles(e.target.files)}
      />
      
      {files.map((file, index) => (
        <div key={index}>{file.name}</div>
      ))}
      
      {isUploading && <div>Progress: {progress}%</div>}
      {error && <div>Error: {error.message}</div>}
      
      <button onClick={() => uploadFiles(files)}>
        Upload Files
      </button>
    </div>
  );
}
```

## 🧪 Testing

```bash
# Run CLI tests
cd packages/cli && npm test

# Run client tests
cd packages/client && npm test

# Run all tests
npm run test:all
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/your-org/django-next.git
cd django-next

# Install dependencies
pnpm install

# Build packages
pnpm build

# Run in development mode
pnpm dev
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- [Django REST Framework](https://www.django-rest-framework.org/) for the amazing API framework
- [Next.js](https://nextjs.org/) for the incredible React framework
- [TanStack Query](https://tanstack.com/query) for powerful data fetching
- [OpenAPI](https://www.openapis.org/) for API specification standards

---

**Made with ❤️ for the Django and Next.js communities**
