
### **Comprehensive Project Document: `@django-next/client` SDK**

*   **Project Name:** `@django-next/client`
*   **Version:** 1.0
*   **Document Status:** Final for v1.0 Development
*   **Target Implementer:** AI Coding Agent

---

### **Part 1: Product Requirement Document (PRD) - The "What & Why"**

#### **1.0 Vision & Mission**
*   **Vision:** To create the definitive bridge between Django and Next.js, making full-stack development with this combination as productive, secure, and delightful as possible.
*   **Mission:** To provide a comprehensive, type-safe client SDK that automates API integration, authentication, and state management, allowing developers to focus solely on application logic. The SDK will adhere to the principle of "Secure by Default" and will be deeply integrated with the modern Next.js 15+ architecture.

#### **2.0 Target Audience**
*   **Primary User:** A full-stack or frontend developer using Next.js for the frontend and Django with Django REST Framework (DRF) for the backend.
*   **Assumed Knowledge:** Proficiency in TypeScript, React, Next.js, and a basic understanding of Django REST Framework and OpenAPI specifications (preferably generated via `drf-spectacular`).

#### **3.0 Core Principles (Design Constraints)**
1.  **Type-Safety is Non-Negotiable:** All generated code and public-facing SDK functions must be fully typed. There should be no `any` types in the generated client.
2.  **Convention over Configuration:** The SDK will work out-of-the-box with standard DRF setups. Configuration will only be required to override sensible defaults.
3.  **Security as a Foundation:** Authentication mechanisms must use `httpOnly` cookies for token storage. The SDK must handle CSRF protection automatically.
4.  **Embrace Modern Next.js:** The design must be native to the Next.js App Router, with first-class support for React Server Components (RSC), Client Components, and Server Actions.
5.  **Developer Experience (DX) is a Feature:** The API must be intuitive, and error messages should be clear and actionable.

#### **4.0 Functional Requirements (v1.0)**

*   **FR-1: Command-Line Interface (CLI)**
    *   **FR-1.1:** An `init` command to create a `django.config.ts` configuration file.
    *   **FR-1.2:** A `generate` command to fetch an OpenAPI 3.x schema and generate a complete, typed client SDK into a `.django-next/` directory.

*   **FR-2: Data Fetching & State Management**
    *   **FR-2.1:** The generated API client must be directly awaitable for use in Server Components.
    *   **FR-2.2:** Generated React hooks (powered by TanStack Query) must manage client-side state (loading, error, data).
    *   **FR-2.3:** Mutation hooks must be provided for `POST`, `PUT`, `PATCH`, `DELETE` operations.
    *   **FR-2.4:** Successful mutations must automatically invalidate relevant query caches to ensure UI consistency.

*   **FR-3: Authentication & Session Management**
    *   **FR-3.1:** Must support JWT authentication using `httpOnly` cookies issued by the Django backend.
    *   **FR-3.2:** Must transparently handle JWT refresh token logic without developer intervention.
    *   **FR-3.3:** Provide an `AuthProvider` component and `useAuth` hook for global session management.
    *   **FR-3.4:** Automatically handle Django's CSRF protection by reading the cookie and setting the `X-CSRFToken` header.

*   **FR-4: Advanced Features (v1.0)**
    *   **FR-4.1:** Mutation hooks must seamlessly handle file uploads and provide upload progress state.
    *   **FR-4.2:** Provide a `<Protected>` component for declarative Role-Based Access Control (RBAC) in the UI.
    *   **FR-4.3:** Provide a `django.batch()` utility for orchestrating multiple concurrent requests.

---

### **Part 2: Project Specification Document - The "How"**

#### **5.0 Core Technologies & Libraries**

*   **Runtime:** Node.js (for CLI), Browser (for SDK)
*   **Language:** TypeScript
*   **HTTP Client:** `axios`. **Reason:** Required for its robust request/response interceptors (for token refresh) and built-in upload progress tracking.
*   **State Management:** `@tanstack/react-query`, `@tanstack/react-query-next-experimental`. **Reason:** Industry standard for server-state, provides caching, and has official Next.js App Router support.
*   **CLI Framework:** `commander`. **Reason:** Simple, powerful, and widely used.
*   **Code Generation:**
    *   `openapi-typescript`: For generating TypeScript types from the OpenAPI schema.
    *   `zod-openapi`: For generating Zod schemas for client-side validation.
    *   Custom generator scripts will be built around these to produce the final files.
*   **Code Formatting:** `prettier`. All generated code must be automatically formatted.

#### **6.0 Project Architecture & File Structure**

A monorepo structure is specified.

```
/packages/
  ├── cli/                # The @django-next/cli package
  │   ├── src/
  │   │   ├── index.ts
  │   │   └── commands/
  │   │       ├── init.ts
  │   │       └── generate.ts
  │   └── lib/
  │       ├── generator.ts      # Orchestrator for code generation
  │       ├── writers.ts        # File writing and formatting logic
  │       ├── templates.ts      # String templates for generating code files
  │       └── parser.ts         # Logic to parse OpenAPI schema into a usable structure
  └── client/               # The @django-next/client package
      ├── src/
      │   ├── index.ts
      │   ├── client.ts         # createDjangoClient function and core logic
      │   ├── query-provider.tsx # Wrapper around TanStack's QueryClientProvider
      │   ├── auth.tsx          # AuthProvider, useAuth hook, auth logic
      │   └── components/
      │       └── Protected.tsx
      └── package.json
```

#### **7.0 Detailed Implementation Plan (v1.0)**

##### **7.1 Package: `cli`**

*   **`commands/init.ts`**
    *   **Action:** Create a `django.config.ts` file in the project root.
    *   **File Content:**
        ```typescript
        import type { DjangoNextConfig } from '@django-next/cli';
        const config: DjangoNextConfig = {
          schema: "http://127.0.0.1:8000/api/schema/",
          output: "./.django-next",
        };
        export default config;
        ```

*   **`lib/parser.ts`**
    *   **Function:** `parseSchema(schema: object): ParsedEndpoint[]`
    *   **Logic:** Iterates through `schema.paths` to extract and structure endpoint information, including `operationId`, `tags`, `method`, `path`, parameters, and request/response body schemas. The first tag is used for grouping (e.g., a viewset named `PostViewSet` should have the tag `posts`).

*   **`lib/generator.ts`**
    *   **Function:** `generate(config: DjangoNextConfig)`
    *   **Logic:**
        1.  Fetches, parses, and validates the OpenAPI schema.
        2.  **Generate `types.ts`:** Use `openapi-typescript`.
        3.  **Generate `validators.ts`:** Use `zod-openapi`.
        4.  **Generate `api.ts`, `hooks.ts`, `actions.ts`:** Use templates from `templates.ts`, populated with data from the parsed schema.
        5.  **`hooks.ts` Generation Logic:**
            *   For `GET`: Generate a `useQuery` hook. `queryKey` must be `[tag, operationId, params]`.
            *   For `POST`, `PUT`, `PATCH`, `DELETE`: Generate a `useMutation` hook. The `onSuccess` callback must call `queryClient.invalidateQueries({ queryKey: [tag] })` to invalidate all queries for that resource type.

##### **7.2 Package: `client`**

*   **`client.ts` - `createDjangoClient` function**
    *   **Signature:** `createDjangoClient(config: { baseUrl: string; apiClass: any; hooksObject: any; })`
    *   **Logic:**
        1.  Initialize `axios` instance with `config.baseUrl`.
        2.  **CSRF Interceptor:** On initialization, read the `csrftoken` from `document.cookie` and set it as a default `X-CSRFToken` header on the axios instance.
        3.  **Auth Refresh Interceptor:**
            ```typescript
            axiosInstance.interceptors.response.use(
              (response) => response,
              async (error) => {
                const originalRequest = error.config;
                if (error.response.status === 401 && !originalRequest._retry) {
                  originalRequest._retry = true;
                  try {
                    // Assumes refresh token is in an httpOnly cookie.
                    // The path for refresh should be configurable, defaulting to a common one.
                    await axiosInstance.post('/api/auth/token/refresh/');
                    return axiosInstance(originalRequest); // Retry
                  } catch (refreshError) {
                    // On failure, trigger a global logout event or redirect.
                    window.location.href = '/login';
                    return Promise.reject(refreshError);
                  }
                }
                return Promise.reject(error);
              }
            );
            ```
        4.  Instantiate the `apiClass` from the generated code, passing the configured `axios` instance to its constructor.
        5.  Return the final SDK object.

*   **Generated `api.ts` Method Logic (File Uploads)**
    *   A generated method that supports file uploads must inspect its payload.
    *   If a `File` or `Blob` object is found, it must construct a `FormData` object and set the `Content-Type` header to `multipart/form-data`.
    *   It must accept an `onUploadProgress` callback and pass it to the `axios` config to enable progress tracking in hooks.

*   **`auth.tsx` - `AuthProvider` and `useAuth`**
    *   **`AuthProvider`:** A React Context Provider holding `user`, `isAuthenticated`, and `isLoading` state. On mount, it fetches the user session from a `/api/users/me/` endpoint.
    *   **`useAuth`:** A hook that returns the context value, along with `login` and `logout` functions that call the respective API endpoints and refetch the session on success.

*   **`components/Protected.tsx`**
    *   **Props:** `{ children, fallback, hasAll?: string[], hasAnyRole?: string[] }`
    *   **Logic:** Uses the `useAuth` hook to check the authenticated user's `permissions` and `roles` arrays against the props. Renders `children` or `fallback`.

#### **8.0 Final SDK Public API & Developer Experience**

*   **Developer Initialization (in `lib/django.ts`):**
    ```typescript
    import { createDjangoClient } from '@django-next/client';
    import { API } from '../.django-next/api'; // Generated class
    import { hooks } from '../.django-next/hooks'; // Generated object

    export const django = createDjangoClient({
      baseUrl: process.env.NEXT_PUBLIC_DJANGO_API_URL!,
      apiClass: API,
      hooksObject: hooks,
    });
    ```

*   **The `django` Object Structure:**
    ```typescript
    {
      // For Server Components & imperative calls
      api: { posts: { list(), create(), ... }, users: { ... } },

      // For Client Components
      hooks: { usePostsList(), usePostCreate(), ... },

      // Authentication
      auth: { useAuth, AuthProvider },

      // UI Components
      components: { Protected },

      // Utilities
      batch: (requests: Promise<any>[]) => Promise.all(requests),

      // Advanced access
      queryClient: QueryClient
    }
    ```

#### **9.0 Documentation & Testing Strategy**

*   **README.md:** Must provide a comprehensive guide covering setup, configuration, and detailed usage examples for all primary features.
*   **Testing:**
    *   **Unit Tests (Jest):** For CLI logic (`parser.ts`) and pure components (`Protected.tsx`).
    *   **Integration Tests (React Testing Library & MSW):** For testing hooks and auth flows against a mocked API.

---

### **Part 3: Project Roadmap & Future Features (Post-v1.0)**

This section outlines potential enhancements to be considered after the successful delivery and adoption of version 1.0.

#### **10.0 Next-Level Developer Experience (DX) & Tooling**

*   **10.1 Feature: Dev Mode "Watcher" & Live Codegen**
    *   **Why:** To eliminate the manual step of running `generate` after an API change, creating a seamless, live-reload experience across the full stack.
    *   **How:** A new CLI command `npx django-next watch` would poll the schema endpoint at a regular interval. Upon detecting a change (via a hash of the schema), it would automatically re-run the generation process.

*   **10.2 Feature: Integrated React DevTools Panel**
    *   **Why:** To provide a dedicated debugging environment for the SDK, making it easy to inspect state and API interactions.
    *   **How:** Create a browser extension that hooks into the React DevTools API. It would display the current `useAuth` session, a list of active TanStack Query keys managed by the SDK, and a history of mutations. It would allow for manual cache invalidation directly from the panel.

*   **10.3 Feature: Storybook Integration & Mock Generation**
    *   **Why:** To enable isolated UI component development without needing a live backend.
    *   **How:** A new command `npx django-next generate-mocks` would parse the schema and create realistic mock data objects for each type. The SDK would then export a `SDKMockProvider` for Storybook that intercepts API calls and returns this mock data.

#### **11.0 Performance, Resilience, & UI Patterns**

*   **11.1 Feature: Automated Pagination & Infinite Scroll Hooks**
    *   **Why:** To simplify the implementation of common UI patterns like "Load More" buttons and infinite feeds.
    *   **How:** The code generator would detect DRF's standard pagination structures in the schema response. For these endpoints, it would automatically generate an `useInfinite...` hook (e.g., `useInfinitePostsList`) that leverages TanStack Query's `useInfiniteQuery`, managing `pageParam` and `getNextPageParam` logic automatically.

*   **11.2 Feature: Declarative Optimistic Updates**
    *   **Why:** To make UIs feel instantaneous by updating the state before the API call completes.
    *   **How:** The generated mutation hooks would accept an `optimisticUpdate` option. This function would receive the new data and provide a simple API to update the TanStack Query cache. The SDK would handle the complex logic of reverting the cache if the mutation fails.

#### **12.0 Advanced Architectural Patterns**

*   **12.1 Feature: Real-time Cache Synchronization via Django Channels**
    *   **Why:** To enable real-time features and ensure the client's data is always perfectly in sync with the server without polling.
    *   **How:** The SDK would include a `useSubscription` hook. This hook would connect to a WebSocket managed by Django Channels. When the backend broadcasts an event (e.g., `{'type': 'post.updated', 'payload': {...}}`), the SDK's central WebSocket listener would automatically find the corresponding query key in the cache (e.g., `['posts', 'retrieve', {id: 5}]`) and update it with the new payload using `queryClient.setQueryData`. This would cause any component using that data to re-render automatically.

*   **12.2 Feature: Direct-to-Cloud Uploads**
    *   **Why:** To improve performance and scalability by uploading large files directly to a service like S3 instead of proxying them through the Django server.
    *   **How:** The SDK would provide a dedicated `useDirectUpload` hook. This hook would first call a new, dedicated backend endpoint to get a pre-signed URL. Then, it would perform the file upload directly to that URL, providing progress. On success, it would call an `onUploadSuccess` callback so the developer can then notify the backend that the upload is complete.

*   **12.3 Feature: GraphQL Support**
    *   **Why:** To support backends built with Graphene-Django instead of DRF.
    *   **How:** This would likely be a separate package, `@django-next/graphql`. A `generate` command would use GraphQL introspection to generate typed query/mutation hooks, similar to libraries like Apollo Client or urql, but integrated with the same auth and state management philosophy.