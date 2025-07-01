// docs-generator.ts: Generate comprehensive documentation
import fs from 'fs';
import path from 'path';
import { createLogger } from '../utils/logger';

const logger = createLogger('docs-generator');

export async function generateDocumentation(config: any, endpoints: any[]): Promise<void> {
  logger.info('Generating comprehensive documentation');
  
  try {
    // Generate main README
    fs.writeFileSync(path.join(config.output, 'README.md'), generateMainReadme(endpoints));
    
    // Generate API documentation
    fs.writeFileSync(path.join(config.output, 'api.md'), generateApiDocs(endpoints));
    
    // Generate hooks documentation
    fs.writeFileSync(path.join(config.output, 'hooks.md'), generateHooksDocs(endpoints));
    
    // Generate actions documentation
    fs.writeFileSync(path.join(config.output, 'actions.md'), generateActionsDocs(endpoints));
    
    // Generate troubleshooting guide
    fs.writeFileSync(path.join(config.output, 'TROUBLESHOOTING.md'), generateTroubleshootingGuide());
    
    // Generate changelog
    fs.writeFileSync(path.join(config.output, 'CHANGELOG.md'), generateChangelog());
    
    logger.info('Successfully generated all documentation files');
  } catch (error) {
    logger.error('Failed to generate documentation', error);
    throw error;
  }
}

function generateMainReadme(endpoints: any[]): string {
  const queryEndpoints = endpoints.filter(ep => ep.method === 'get');
  const mutationEndpoints = endpoints.filter(ep => ep.method !== 'get');
  
  return `# Django-Next Generated SDK

## 📋 Overview

This directory contains a fully type-safe, auto-generated SDK for your Django REST API. The SDK provides:

- **TypeScript Types** (\`types.ts\`) - Complete type definitions from your OpenAPI schema
- **Zod Validators** (\`validators.ts\`) - Runtime validation schemas
- **API Client** (\`api.ts\`) - Type-safe HTTP client with file upload support
- **React Hooks** (\`hooks.ts\`) - React Query hooks for data fetching and mutations
- **Server Actions** (\`actions.ts\`) - Next.js server actions for server-side operations

## 📊 API Statistics

- **Total Endpoints**: ${endpoints.length}
- **Query Endpoints**: ${queryEndpoints.length} (GET operations)
- **Mutation Endpoints**: ${mutationEndpoints.length} (POST, PUT, PATCH, DELETE)
- **Generated at**: ${new Date().toISOString()}

## 🚀 Quick Start

### 1. Installation

Ensure you have the required dependencies:

\`\`\`bash
npm install axios @tanstack/react-query zod
# For Next.js projects
npm install @tanstack/react-query-next-experimental
\`\`\`

### 2. Setup API Client

\`\`\`typescript
import { ApiClient } from './.django-next/api';
import { createDjangoClient } from '@django-next/client';

// Create API client
const apiClient = new ApiClient({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
});

// Create Django client with generated API
const client = createDjangoClient({
  baseUrl: 'http://localhost:8000',
  apiClass: ApiClient,
  hooksObject: {}, // Import hooks if needed
});
\`\`\`

### 3. Use in React Components

\`\`\`typescript
import { useQuery } from '@tanstack/react-query';
import { ApiClient } from './.django-next/api';

function MyComponent() {
  const api = new ApiClient();
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['example'],
    queryFn: () => api.someEndpoint(),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return <div>{JSON.stringify(data)}</div>;
}
\`\`\`

### 4. Server Actions (Next.js)

\`\`\`typescript
import { someEndpointAction } from './.django-next/actions';

export async function handleSubmit(formData: FormData) {
  try {
    const result = await someEndpointAction({
      // your parameters
    });
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
\`\`\`

## 📚 Documentation

- [API Client Documentation](./api.md) - Detailed API client usage
- [React Hooks Documentation](./hooks.md) - React Query hooks guide
- [Server Actions Documentation](./actions.md) - Next.js server actions guide
- [Troubleshooting Guide](./TROUBLESHOOTING.md) - Common issues and solutions

## 🔧 Configuration

The SDK supports various configuration options:

\`\`\`typescript
const apiClient = new ApiClient({
  baseURL: 'https://api.example.com',
  timeout: 30000,
  withCredentials: true,
  headers: {
    'Custom-Header': 'value',
  },
});
\`\`\`

## 🔒 Authentication

The SDK automatically handles:
- CSRF token management
- JWT token refresh
- Cookie-based authentication

## 📁 File Uploads

File uploads are automatically detected and handled:

\`\`\`typescript
const formData = {
  file: fileInput.files[0],
  description: 'My file',
};

// Automatically converts to multipart/form-data
await api.uploadEndpoint(formData, {
  onUploadProgress: (progress) => {
    console.log(\`Upload progress: \${progress}%\`);
  },
});
\`\`\`

## 🔄 Cache Management

React Query provides automatic cache management:

\`\`\`typescript
import { useInvalidateQueries } from './.django-next/hooks';

function MyComponent() {
  const { invalidateByTag } = useInvalidateQueries();
  
  const handleRefresh = () => {
    invalidateByTag('posts'); // Invalidate all post-related queries
  };
}
\`\`\`

## 🐛 Error Handling

The SDK provides comprehensive error handling:

\`\`\`typescript
import { isApiError } from './.django-next/types';

try {
  const result = await api.someEndpoint();
} catch (error) {
  if (isApiError(error)) {
    console.error('API Error:', error.message, error.status);
  }
}
\`\`\`

---

**Generated by Django-Next CLI v1.1.0**
`;
}

function generateApiDocs(endpoints: any[]): string {
  return `# API Client Documentation

## Overview

The \`api.ts\` file contains the generated API client class that provides type-safe methods for each endpoint in your OpenAPI schema.

## Features

- **Type Safety**: All methods are fully typed based on your OpenAPI schema
- **File Upload Support**: Automatic detection and handling of file uploads with progress tracking
- **Error Handling**: Comprehensive error handling with custom error types
- **Validation**: Optional Zod validation for request parameters
- **Axios Integration**: Built on Axios with full configuration support

## Usage

### Basic Usage

\`\`\`typescript
import { ApiClient } from './api';

const api = new ApiClient({
  baseURL: 'http://localhost:8000',
  timeout: 30000,
  withCredentials: true,
});

// Make API calls
const response = await api.someEndpoint(params);
\`\`\`

### File Uploads

\`\`\`typescript
const uploadData = {
  file: fileInput.files[0],
  title: 'My Upload',
};

const response = await api.uploadEndpoint(uploadData, {
  onUploadProgress: (progress) => {
    console.log(\`Progress: \${progress}%\`);
  },
});
\`\`\`

### Advanced Configuration

\`\`\`typescript
// Get underlying Axios instance for advanced configuration
const axiosInstance = api.getAxiosInstance();

// Add request interceptor
axiosInstance.interceptors.request.use((config) => {
  config.headers['Custom-Header'] = 'value';
  return config;
});
\`\`\`

## Generated Methods

${endpoints.map(ep => `### \`${ep.operationId}\`

- **Method**: ${ep.method.toUpperCase()}
- **Path**: ${ep.path}
- **Tags**: ${ep.tags?.join(', ') || 'None'}

\`\`\`typescript
await api.${ep.operationId}(params);
\`\`\`
`).join('\n')}

## Error Handling

The API client throws typed errors that can be caught and handled:

\`\`\`typescript
import { ApiError } from './types';

try {
  await api.someEndpoint();
} catch (error) {
  if (error instanceof ApiError) {
    console.error('API Error:', error.message, error.status);
  }
}
\`\`\`
`;
}

function generateHooksDocs(endpoints: any[]): string {
  const queryHooks = endpoints.filter(ep => ep.method === 'get');
  const mutationHooks = endpoints.filter(ep => ep.method !== 'get');
  
  return `# React Hooks Documentation

## Overview

The \`hooks.ts\` file contains React Query hooks for each API endpoint, providing declarative data fetching and state management.

## Features

- **Automatic Caching**: React Query handles caching automatically
- **Background Refetching**: Data stays fresh with background updates
- **Optimistic Updates**: UI updates immediately with rollback on error
- **Loading States**: Built-in loading, error, and success states
- **Cache Invalidation**: Automatic cache invalidation on mutations

## Query Hooks (${queryHooks.length} total)

${queryHooks.map(ep => `### \`use${capitalize(ep.operationId)}\`

\`\`\`typescript
const { data, isLoading, error, refetch } = use${capitalize(ep.operationId)}(params, options);
\`\`\`

- **Endpoint**: ${ep.method.toUpperCase()} ${ep.path}
- **Cache Key**: \`['${ep.tags?.[0] || 'default'}', '${ep.operationId}', params]\`
`).join('\n')}

## Mutation Hooks (${mutationHooks.length} total)

${mutationHooks.map(ep => `### \`use${capitalize(ep.operationId)}\`

\`\`\`typescript
const { mutate, isLoading, error, data } = use${capitalize(ep.operationId)}(options);
\`\`\`

- **Endpoint**: ${ep.method.toUpperCase()} ${ep.path}
- **Auto-invalidates**: \`['${ep.tags?.[0] || 'default'}']\` queries
`).join('\n')}

## Utility Hooks

### \`useInvalidateQueries\`

\`\`\`typescript
const { invalidateAll, invalidateByTag, invalidateByOperation } = useInvalidateQueries();

// Invalidate all queries
invalidateAll();

// Invalidate by tag
invalidateByTag('posts');

// Invalidate specific operation
invalidateByOperation('getPosts');
\`\`\`

### \`usePrefetchQuery\`

\`\`\`typescript
const { prefetch } = usePrefetchQuery();

// Prefetch data
await prefetch(['posts'], () => api.getPosts());
\`\`\`

## Examples

### Basic Query

\`\`\`typescript
function PostsList() {
  const { data: posts, isLoading, error } = useGetPosts();
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <ul>
      {posts?.data.results.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
\`\`\`

### Mutation with File Upload

\`\`\`typescript
function CreatePost() {
  const { mutate: createPost, isLoading } = useCreatePost({
    onUploadProgress: (progress) => {
      console.log(\`Upload: \${progress}%\`);
    },
    onSuccess: () => {
      alert('Post created!');
    },
  });
  
  const handleSubmit = (formData) => {
    createPost({
      title: formData.title,
      image: formData.image, // File object
    });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button disabled={isLoading}>
        {isLoading ? 'Creating...' : 'Create Post'}
      </button>
    </form>
  );
}
\`\`\`
`;
}

function generateActionsDocs(endpoints: any[]): string {
  const actionEndpoints = endpoints.filter(ep => ep.method !== 'get');
  
  return `# Server Actions Documentation

## Overview

The \`actions.ts\` file contains Next.js Server Actions for mutation endpoints, enabling server-side data operations with automatic revalidation.

## Features

- **Server-Side Execution**: Actions run on the server for security
- **Automatic Revalidation**: Cache invalidation and path revalidation
- **Type Safety**: Fully typed parameters and responses
- **Error Handling**: Comprehensive error handling with custom error types
- **Validation**: Zod validation for request parameters

## Generated Actions (${actionEndpoints.length} total)

${actionEndpoints.map(ep => `### \`${ep.operationId}Action\`

\`\`\`typescript
const result = await ${ep.operationId}Action(params, config);
\`\`\`

- **Endpoint**: ${ep.method.toUpperCase()} ${ep.path}
- **Auto-revalidates**: \`['${ep.tags?.[0] || 'default'}', '${ep.operationId}']\`
`).join('\n')}

## Configuration

### Action Config

\`\`\`typescript
interface ActionConfig {
  revalidateTags?: string[];
  revalidatePaths?: string[];
  apiConfig?: {
    baseURL?: string;
    headers?: Record<string, string>;
  };
}
\`\`\`

### Environment Variables

\`\`\`bash
# Required: Django API URL
DJANGO_API_URL=http://localhost:8000

# Optional: Custom JWT cookie names (should match Django settings)
JWT_COOKIE_NAME=access_token
JWT_REFRESH_COOKIE_NAME=refresh_token
\`\`\`

## Authentication

Server actions use **user-aware authentication** by reading JWT tokens from HTTP-only cookies set by Django Simple JWT. This ensures that:

- Each server action runs with the authenticated user's permissions
- No static service tokens are needed
- HTTP-only cookies provide maximum security
- User context is automatically maintained across client and server

## Examples

### User-Aware Server Action (Recommended)

\`\`\`typescript
// app/posts/actions.ts
import { createPostAction, isUserAuthenticated } from '../.django-next/actions';

export async function createPost(formData: FormData) {
  // Check if user is authenticated
  const isAuth = await isUserAuthenticated();
  if (!isAuth) {
    return { success: false, error: 'Authentication required' };
  }

  // This will automatically use the user's JWT token from HTTP-only cookies
  const result = await createPostAction({
    title: formData.get('title'),
    content: formData.get('content'),
  });

  return result; // Already wrapped in { success, data/error } format
}
\`\`\`

### Authentication Configuration

\`\`\`typescript
import { createPostAction, createAuthRequiredConfig, createPublicConfig } from '../.django-next/actions';

// Explicitly require authentication (default behavior)
const result = await createPostAction(params, createAuthRequiredConfig({
  revalidateTags: ['posts'],
}));

// Allow anonymous access (for public endpoints only)
const publicResult = await getPublicDataAction(params, createPublicConfig());
\`\`\`

### Authentication Context

\`\`\`typescript
import { getAuthContext } from '../.django-next/actions';

export async function checkAuthStatus() {
  const authContext = await getAuthContext();

  console.log('User authenticated:', authContext.isAuthenticated);
  console.log('Valid token present:', authContext.hasValidToken);
  console.log('Token present in cookies:', authContext.tokenPresent);

  return authContext;
}
\`\`\`

### Enhanced Error Handling

\`\`\`typescript
import { executeWithErrorHandling } from '../.django-next/actions';

export async function safeCreatePost(data) {
  return executeWithErrorHandling(
    () => createPostAction(data),
    'Failed to create post'
  );
}
\`\`\`
`;
}

function generateTroubleshootingGuide(): string {
  return `# Troubleshooting Guide

## Common Issues and Solutions

### Type Errors

#### "Property does not exist on type"
- **Cause**: Generated types don't match your API schema
- **Solution**: Re-run \`django-next generate\` to sync with latest schema

#### "Cannot find module './types'"
- **Cause**: Types file not generated or path incorrect
- **Solution**: Ensure generation completed successfully and check import paths

### Network Errors

#### CORS Issues
- **Cause**: Django CORS settings not configured for your frontend
- **Solution**: Configure \`django-cors-headers\` in your Django settings

#### 401 Unauthorized
- **Cause**: Authentication token missing or expired
- **Solution**: Check token refresh logic and authentication setup

#### CSRF Token Missing
- **Cause**: CSRF token not properly set or sent
- **Solution**: Ensure Django sets \`csrftoken\` cookie and client sends \`X-CSRFToken\` header

### File Upload Issues

#### "Request Entity Too Large"
- **Cause**: File size exceeds server limits
- **Solution**: Increase Django's \`FILE_UPLOAD_MAX_MEMORY_SIZE\` and \`DATA_UPLOAD_MAX_MEMORY_SIZE\`

#### Upload Progress Not Working
- **Cause**: Progress callback not properly configured
- **Solution**: Ensure \`onUploadProgress\` is passed to mutation options

### React Query Issues

#### Stale Data
- **Cause**: Cache not invalidated after mutations
- **Solution**: Use \`invalidateQueries\` or check mutation \`onSuccess\` handlers

#### Infinite Loading
- **Cause**: Query key changes on every render
- **Solution**: Memoize query parameters or use stable references

### Server Action Issues

#### "Server Action Failed"
- **Cause**: Various server-side issues
- **Solution**: Check server logs and ensure proper authentication

#### Revalidation Not Working
- **Cause**: Incorrect tags or paths specified
- **Solution**: Verify revalidation configuration matches your cache strategy

## Debug Mode

Enable debug logging by setting the log level:

\`\`\`typescript
import { createLogger, LOG_LEVELS } from '@django-next/cli/lib/utils/logger';

const logger = createLogger('debug', LOG_LEVELS.DEBUG);
\`\`\`

## Getting Help

1. Check the generated documentation files
2. Verify your Django OpenAPI schema is valid
3. Test API endpoints directly with curl or Postman
4. Check browser network tab for request/response details
5. Review Django server logs for backend issues

## Reporting Issues

When reporting issues, please include:
- Generated SDK version
- Django and DRF versions
- OpenAPI schema (if possible)
- Error messages and stack traces
- Steps to reproduce
`;
}

function generateChangelog(): string {
  return `# Changelog

All notable changes to the generated SDK will be documented in this file.

## [Generated] - ${new Date().toISOString().split('T')[0]}

### Added
- Complete TypeScript type definitions from OpenAPI schema
- Zod validators for runtime validation
- Type-safe API client with file upload support
- React Query hooks for data fetching and mutations
- Next.js Server Actions for server-side operations
- Comprehensive documentation and troubleshooting guide
- Automatic cache invalidation and revalidation
- Upload progress tracking for file uploads
- Custom error handling and validation
- Query key factory for consistent cache management

### Features
- **Type Safety**: Full TypeScript support with no \`any\` types
- **File Uploads**: Automatic multipart/form-data handling
- **Authentication**: JWT token refresh and CSRF protection
- **Caching**: Intelligent cache management with React Query
- **Server Actions**: Next.js App Router compatible server actions
- **Validation**: Runtime validation with Zod schemas
- **Error Handling**: Comprehensive error types and handling
- **Documentation**: Auto-generated documentation and guides

### Technical Details
- Generated from OpenAPI 3.x schema
- Built with Axios for HTTP client
- React Query for state management
- Zod for runtime validation
- Next.js Server Actions for mutations
- Prettier formatted code output

---

*This changelog is automatically generated with each SDK generation.*
`;
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
