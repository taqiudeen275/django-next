# Django-Next

[![npm version](https://badge.fury.io/js/%40django-next%2Fcli.svg)](https://badge.fury.io/js/%40django-next%2Fcli)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Generate type-safe Next.js SDKs from Django REST APIs with React Query hooks, Server Actions, and comprehensive TypeScript support.

## 🌟 What is Django-Next?

Django-Next is a powerful toolkit that automatically generates type-safe TypeScript SDKs for your Django REST Framework APIs. It creates everything you need to build modern Next.js applications with full type safety, authentication, and best practices built-in.

**Perfect for beginners and experts alike!**

## 🚀 Features

- **🔧 Zero Configuration**: One command generates your entire SDK
- **📝 100% Type Safe**: End-to-end TypeScript from Django models to React components
- **🎯 Complete SDK**: API client, React hooks, Server Actions, and validators
- **🔐 Authentication Ready**: Built-in login, logout, and protected routes
- **📁 File Uploads**: Drag-and-drop file uploads with progress bars
- **🛡️ RBAC Support**: Role-based access control and permissions
- **⚡ Performance**: Optimized with React Query caching
- **📚 Auto Documentation**: Comprehensive guides generated for you

## 📦 Installation

```bash
# Step 1: Install the CLI tool globally
npm install -g @django-next/cli

# Step 2: Install client package in your Next.js project
npm install @django-next/client @tanstack/react-query axios zod
```

## 🏃‍♂️ Quick Start Guide

### Step 1: Create Configuration

In your Next.js project root, create a configuration file:

```bash
# This creates a django.config.js file
django-next init

# Or specify your Django API URL directly
django-next init --schema http://localhost:8000/api/schema/ --output ./lib/api
```

### Step 2: Generate Your SDK

```bash
# Generate complete TypeScript SDK
django-next generate

# See detailed output
django-next generate --verbose
```

This creates:
- `lib/api/types.ts` - TypeScript interfaces for all your Django models
- `lib/api/api.ts` - API client with all your endpoints
- `lib/api/hooks.ts` - React Query hooks for data fetching
- `lib/api/actions.ts` - Server Actions for forms
- `lib/api/validators.ts` - Runtime validation with Zod

### Step 3: Setup Your Next.js App

Create a providers file to wrap your app:

```typescript
// app/providers.tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ApiProvider, AuthProvider } from '@django-next/client';
import { ApiClient } from '../lib/api/api'; // Your generated API client
import { useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  // Create React Query client
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 1,
      },
    },
  }));

  // Create API client with your Django URL
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

Then use it in your layout:

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

### Step 4: Create the useApi Hook

The generated hooks need access to your API client. Create this file:

```typescript
// lib/hooks/useApi.ts
import { useContext } from 'react';
import { ApiContext } from '@django-next/client';
import type { ApiClient } from '../api/api'; // Your generated API client type

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

That's it! Your Django-Next setup is complete. 🎉

## 📖 Usage Examples

### Basic Data Fetching

```typescript
// components/PostList.tsx
import { useApi_posts_list } from '../lib/api/hooks'; // Generated hook

export function PostList() {
  const { data: posts, isLoading, error } = useApi_posts_list({
    page: 1,
    page_size: 10
  });

  if (isLoading) return <div>Loading posts...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Posts</h1>
      {posts?.data.results.map(post => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}
```

### Authentication & Login

```typescript
// components/LoginForm.tsx
import { useAuth } from '@django-next/client';
import { useApi_auth_login_create } from '../lib/api/hooks'; // Generated hook
import { useState } from 'react';

export function LoginForm() {
  const { isAuthenticated, user } = useAuth();
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const loginMutation = useApi_auth_login_create({
    onSuccess: (data) => {
      console.log('Login successful!', data);
      // Auth state is automatically updated
    },
    onError: (error) => {
      console.error('Login failed:', error);
    }
  });

  if (isAuthenticated) {
    return (
      <div>
        <p>Welcome back, {user?.username}!</p>
        <button onClick={() => window.location.reload()}>
          Logout
        </button>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(credentials);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={credentials.username}
          onChange={(e) => setCredentials(prev => ({
            ...prev,
            username: e.target.value
          }))}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={credentials.password}
          onChange={(e) => setCredentials(prev => ({
            ...prev,
            password: e.target.value
          }))}
          required
        />
      </div>
      <button
        type="submit"
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? 'Logging in...' : 'Login'}
      </button>
      {loginMutation.error && (
        <p style={{ color: 'red' }}>
          Error: {loginMutation.error.message}
        </p>
      )}
    </form>
  );
}
```

### Protected Routes & RBAC

```typescript
// components/AdminPanel.tsx
import { Protected } from '@django-next/client';
import { useApi_users_list } from '../lib/api/hooks'; // Generated hook

export function AdminPanel() {
  return (
    <Protected
      requireAuth={true}
      requirePermission="users.view_user"
      fallback={<div>Access denied. Admin permissions required.</div>}
    >
      <AdminContent />
    </Protected>
  );
}

function AdminContent() {
  const { data: users, isLoading } = useApi_users_list();

  if (isLoading) return <div>Loading users...</div>;

  return (
    <div>
      <h1>Admin Panel</h1>
      <h2>Users ({users?.data.count})</h2>
      {users?.data.results.map(user => (
        <div key={user.id}>
          <p>{user.username} - {user.email}</p>

          <Protected requirePermission="users.change_user">
            <button>Edit User</button>
          </Protected>

          <Protected requirePermission="users.delete_user">
            <button>Delete User</button>
          </Protected>
        </div>
      ))}
    </div>
  );
}
```

### File Uploads with Progress

```typescript
// components/FileUpload.tsx
import { useApi_files_create } from '../lib/api/hooks'; // Generated hook
import { useState } from 'react';

export function FileUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const uploadMutation = useApi_files_create({
    onUploadProgress: (progress) => {
      setUploadProgress(progress);
    },
    onSuccess: (data) => {
      console.log('File uploaded successfully!', data);
      setSelectedFile(null);
      setUploadProgress(0);
    },
    onError: (error) => {
      console.error('Upload failed:', error);
      setUploadProgress(0);
    }
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) return;

    uploadMutation.mutate({
      file: selectedFile,
      title: selectedFile.name,
      description: 'Uploaded via Django-Next'
    });
  };

  return (
    <div>
      <h2>Upload File</h2>

      <input
        type="file"
        onChange={handleFileSelect}
        accept="image/*,.pdf,.doc,.docx"
      />

      {selectedFile && (
        <div>
          <p>Selected: {selectedFile.name}</p>
          <p>Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>

          <button
            onClick={handleUpload}
            disabled={uploadMutation.isPending}
          >
            {uploadMutation.isPending ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      )}

      {uploadMutation.isPending && (
        <div>
          <div>Progress: {uploadProgress}%</div>
          <div style={{
            width: '100%',
            height: '10px',
            backgroundColor: '#f0f0f0',
            borderRadius: '5px'
          }}>
            <div style={{
              width: `${uploadProgress}%`,
              height: '100%',
              backgroundColor: '#4CAF50',
              borderRadius: '5px',
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>
      )}

      {uploadMutation.error && (
        <p style={{ color: 'red' }}>
          Upload failed: {uploadMutation.error.message}
        </p>
      )}
    </div>
  );
}
```

### Server Actions for Forms

```typescript
// app/posts/create/page.tsx
import { api_posts_createAction } from '../../../lib/api/actions'; // Generated action
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

async function createPostAction(formData: FormData) {
  'use server';

  try {
    const result = await api_posts_createAction({
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      author: 1, // Get from session in real app
    });

    // Refresh the posts page to show the new post
    revalidatePath('/posts');

    // Redirect to the new post
    redirect(`/posts/${result.data.id}`);
  } catch (error) {
    console.error('Failed to create post:', error);
    // Handle error (you might want to use a state management solution)
    throw error;
  }
}

export default function CreatePostPage() {
  return (
    <div>
      <h1>Create New Post</h1>

      <form action={createPostAction}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            required
            placeholder="Enter post title"
          />
        </div>

        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            name="content"
            required
            rows={10}
            placeholder="Write your post content here..."
          />
        </div>

        <button type="submit">
          Create Post
        </button>
      </form>
    </div>
  );
}
```

### Creating Data with Mutations

```typescript
// components/CreatePost.tsx
import { useApi_posts_create } from '../lib/api/hooks'; // Generated hook
import { useState } from 'react';

export function CreatePost() {
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });

  const createPostMutation = useApi_posts_create({
    onSuccess: (data) => {
      console.log('Post created!', data);
      setFormData({ title: '', content: '' }); // Reset form
      // Optionally redirect or show success message
    },
    onError: (error) => {
      console.error('Failed to create post:', error);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createPostMutation.mutate({
      title: formData.title,
      content: formData.content,
      author: 1 // Get from auth context in real app
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            title: e.target.value
          }))}
          required
        />
      </div>

      <div>
        <label>Content:</label>
        <textarea
          value={formData.content}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            content: e.target.value
          }))}
          required
          rows={5}
        />
      </div>

      <button
        type="submit"
        disabled={createPostMutation.isPending}
      >
        {createPostMutation.isPending ? 'Creating...' : 'Create Post'}
      </button>

      {createPostMutation.error && (
        <p style={{ color: 'red' }}>
          Error: {createPostMutation.error.message}
        </p>
      )}
    </form>
  );
}
```

## 🔗 How It Works

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

## 🔧 Troubleshooting

### Common Issues

#### "useApi must be used within an ApiProvider"
**Problem**: Generated hooks can't find the API client.
**Solution**: Make sure you've implemented the `useApi` hook and wrapped your app with providers:

```typescript
// lib/hooks/useApi.ts - Create this file!
import { useContext } from 'react';
import { ApiContext } from '@django-next/client';
import type { ApiClient } from '../api/api';

export function useApi(): ApiClient {
  const context = useContext(ApiContext);
  if (!context) throw new Error('useApi must be used within ApiProvider');
  return context.api as ApiClient;
}

(globalThis as any).useApi = useApi;
```

#### "Cannot find module '../lib/api/hooks'"
**Problem**: SDK not generated or wrong path.
**Solution**:
1. Run `django-next generate` to create the SDK
2. Check your `django.config.js` output path
3. Make sure import paths match your output directory

#### "Network Error" or CORS issues
**Problem**: Django server not configured for frontend requests.
**Solution**: In your Django settings:

```python
# settings.py
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # Your Next.js dev server
]

CORS_ALLOW_CREDENTIALS = True

# For development only
CORS_ALLOW_ALL_ORIGINS = True  # Remove in production!
```

#### "CSRF token missing"
**Problem**: Django CSRF protection blocking requests.
**Solution**: The client package handles this automatically, but make sure:

1. Your Django API includes CSRF tokens in responses
2. You're using `withCredentials: true` in the API client
3. Your Django settings allow the frontend origin

#### TypeScript errors in generated files
**Problem**: Generated code has type errors.
**Solution**:
1. Make sure your Django API is running when generating
2. Check that your OpenAPI schema is valid
3. Regenerate with `django-next generate --verbose` to see detailed errors

### Getting Help

1. **Check the generated README**: After running `django-next generate`, check the README in your output directory
2. **Enable verbose logging**: Use `django-next generate --verbose` to see detailed output
3. **Check your Django API**: Make sure your OpenAPI schema is accessible at the configured URL
4. **Verify file paths**: Ensure all import paths in examples match your project structure

### File Structure Reference

After setup, your project should look like this:

```
your-nextjs-app/
├── app/
│   ├── layout.tsx          # Root layout with providers
│   ├── providers.tsx       # React Query and Django-Next providers
│   └── page.tsx           # Your pages
├── lib/
│   ├── api/               # Generated SDK (from django-next generate)
│   │   ├── types.ts       # TypeScript interfaces
│   │   ├── api.ts         # API client
│   │   ├── hooks.ts       # React Query hooks
│   │   ├── actions.ts     # Server Actions
│   │   └── validators.ts  # Zod schemas
│   └── hooks/
│       └── useApi.ts      # Your useApi implementation
├── components/            # Your React components
├── django.config.js       # Django-Next configuration
└── package.json
```

## 📚 Documentation

- **[CLI Reference](./packages/cli/README.md)** - Command-line interface documentation
- **[Client Package](./packages/client/README.md)** - React client package documentation
- **[Integration Guide](./docs/INTEGRATION.md)** - Detailed setup and usage guide

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- [Django REST Framework](https://www.django-rest-framework.org/) for the amazing API framework
- [Next.js](https://nextjs.org/) for the incredible React framework
- [TanStack Query](https://tanstack.com/query) for powerful data fetching
- [OpenAPI](https://www.openapis.org/) for API specification standards

---

**Made with ❤️ for the Django and Next.js communities**

**Ready to build something amazing? Start with `npm install -g @django-next/cli` and `django-next init`!** 🚀
