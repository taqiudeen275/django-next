
### **Project Specification Document (Continued)**

#### **3.0 Detailed Implementation Plan (Continued)**

##### **3.3 Package: `client` (Advanced Features)**

*   **File Upload Progress in Hooks (`hooks.ts` generated code)**
    *   **Goal:** The `use...Mutation` hook for an endpoint that accepts files must return upload progress.
    *   **Implementation (`generator/templates.ts`):** The template for mutation hooks needs modification.
        1.  The hook will manage an internal state for progress: `const [progress, setProgress] = useState(0);`.
        2.  The `mutationFn` passed to `useMutation` will now accept an `onUploadProgress` callback. The generated `api` method must be designed to accept this callback.
        3.  The `mutate` function returned by the hook will be a wrapper. It will call the underlying `useMutation.mutate` with the payload and the `setProgress` function as the `onUploadProgress` callback.
    *   **Generated `api.ts` Method Modification:**
        *   The method signature must be updated: `createPost(payload: PostPayload, options?: { onUploadProgress?: (progress: number) => void }): Promise<Post>`
        *   Inside the method, the `onUploadProgress` function from the `options` object is passed directly to the `axios` config.
            ```typescript
            // Inside the generated API method for a file-upload endpoint
            const axiosConfig = {
              headers: { 'Content-Type': 'multipart/form-data' },
              onUploadProgress: (progressEvent) => {
                if (progressEvent.total) {
                  const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                  // Call the callback provided by the hook
                  if (options?.onUploadProgress) {
                    options.onUploadProgress(percentCompleted);
                  }
                }
              },
            };
            return this.axiosInstance.post(path, formData, axiosConfig);
            ```
    *   **Final Hook Return Value:** The generated `usePostCreate` hook will return: `{ mutate, isPending, isSuccess, error, data, progress, isUploading: isPending && progress > 0 }`.

*   **`components/Protected.tsx` - RBAC Component**
    *   **Props:**
        ```typescript
        interface ProtectedProps {
          children: React.ReactNode;
          fallback?: React.ReactNode;
          // User must have ALL specified permissions
          hasAll?: string[];
          // User must have AT LEAST ONE of the specified roles
          hasAnyRole?: string[];
        }
        ```
    *   **Logic:**
        1.  Calls `const { user, isAuthenticated } = useAuth();`.
        2.  If `!isAuthenticated`, render `fallback` or `null`.
        3.  Assume `user` object has `permissions: string[]` and `roles: string[]`. This structure must be documented as a requirement for the Django user serializer.
        4.  **Permission Check:** If `props.hasAll` is provided, check if every permission in `props.hasAll` is present in `user.permissions`.
        5.  **Role Check:** If `props.hasAnyRole` is provided, check if at least one role in `props.hasAnyRole` is present in `user.roles`.
        6.  If all checks pass, render `props.children`. Otherwise, render `props.fallback`.

*   **Batching (`client.ts`)**
    *   **Function:** `django.batch(requests: Array<{ key: string, query: Promise<any> }>): Promise<Record<string, any>>`
    *   **Backend Prerequisite:** This feature requires a dedicated batching endpoint on the Django backend (e.g., `/api/batch/`) that is **not** part of the standard OpenAPI schema. This endpoint must be implemented manually.
    *   **Backend Request Payload:** The batch function will POST a payload like this:
        ```json
        {
          "requests": [
            { "key": "currentUser", "method": "GET", "path": "/api/users/me/" },
            { "key": "posts", "method": "GET", "path": "/api/posts/?limit=10" }
          ]
        }
        ```
    *   **Backend Response Payload:**
        ```json
        {
          "responses": {
            "currentUser": { "status": 200, "body": { "id": 1, "username": "..." } },
            "posts": { "status": 200, "body": { "count": 50, "results": [...] } }
          }
        }
        ```
    *   **SDK `batch` Function Logic:**
        1.  This is a complex feature that cannot directly use the generated API methods, as it needs to capture the *details* of the request, not execute it immediately.
        2.  **Alternative, Simpler Implementation:** A more feasible v1 approach is to use `Promise.all`.
            ```typescript
            // In client.ts
            batch: (requests: Promise<any>[]): Promise<any[]> => {
              return Promise.all(requests);
            }
            ```
            The AI Agent should implement this simpler version first. The more complex, single-request batching can be a v2 feature. The developer would use it like this: `const [user, posts] = await django.batch([django.api.users.me(), django.api.posts.list()])`. This will still result in multiple HTTP requests but simplifies orchestration.

#### **4.0 Final SDK Public API & Developer Experience**

This section defines the "public face" of the SDK, which is crucial for usability.

*   **Main Entry Point (`index.ts`)**
    *   The developer should only need to interact with a single, central object.
    *   **Developer Code (in `lib/django.ts`):**
        ```typescript
        import { createDjangoClient } from '@django-next/client';
        // These are the files generated by the CLI
        import { api } from '../.django-next/api';
        import { hooks } from '../.django-next/hooks';

        export const django = createDjangoClient({
          baseUrl: process.env.NEXT_PUBLIC_DJANGO_API_URL!,
          // Pass the generated classes/objects to the factory
          api,
          hooks,
        });
        ```

*   **`createDjangoClient` Return Object Structure:**
    ```typescript
    {
      // Fully typed API client instance for server-side or imperative calls
      api: {
        posts: {
          list: (params?: { limit?: number }) => Promise<Post[]>,
          create: (payload: PostPayload) => Promise<Post>,
          retrieve: (params: { id: number }) => Promise<Post>,
          // ... all other endpoints
        },
        users: { /* ... */ }
      },

      // Fully typed React hooks for client-side components
      hooks: {
        usePostsList: (params?, options?) => UseQueryResult<Post[]>,
        usePostCreate: (options?) => UseMutationResult<Post, Error, PostPayload>,
        // ... all other hooks
      },

      // Auth module
      auth: {
        useAuth: () => ({ user, isAuthenticated, isLoading, hasPerm, hasAnyRole }),
        AuthProvider: React.ComponentType<{ children: React.ReactNode }>,
        // Login/logout are handled by the useAuth hook to trigger re-renders
      },

      // Components module
      components: {
        Protected: React.ComponentType<ProtectedProps>
      },

      // Utilities
      batch: (requests: Promise<any>[]) => Promise<any[]>,

      // Direct access to the configured queryClient for advanced use cases
      queryClient: QueryClient
    }
    ```

#### **5.0 Documentation and Testing**

*   **README.md:** Must be comprehensive and include:
    *   Project vision.
    *   Step-by-step setup guide (`init`, `generate`).
    *   Detailed usage examples for:
        *   Fetching data in Server Components (`django.api`).
        *   Fetching data in Client Components (`django.hooks`).
        *   Performing mutations and handling loading states.
        *   Setting up `AuthProvider` in the root layout.
        *   Using `useAuth` and the `<Protected>` component.
        *   Uploading a file with progress.
    *   Explanation of the required Django backend setup (DRF, `drf-spectacular`, `dj-rest-auth` for `httpOnly` cookies).

*   **Testing Strategy:**
    *   **Unit Tests (Jest):**
        *   Test the `lib/parser.ts` in the CLI to ensure correct schema parsing.
        *   Test the `Protected` component logic with mock auth state.
    *   **Integration Tests (React Testing Library):**
        *   Test custom hooks with a mock API (`msw` - Mock Service Worker).
        *   Test the `AuthProvider` flow (initial loading, authenticated state, logout).
    *   **E2E Tests (Cypress/Playwright - optional for v1):** Test a sample Next.js application that uses the SDK against a live Django dev server.

This concludes the detailed specification. The AI agent should now have a complete and unambiguous roadmap to build version 1.0 of the `@django-next/client` SDK, including its CLI and client-side package. The focus is on a robust, type-safe, and secure foundation with a fantastic developer experience.