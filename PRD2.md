
### **Product Requirement Document (PRD)**
**Project Name:** `@django-next/client` SDK
**Version:** 1.0
**Document State:** Final

#### **1.0 Vision & Mission**
*   **Vision:** To create the definitive bridge between Django and Next.js, making full-stack development with this combination as productive, secure, and delightful as possible.
*   **Mission:** To provide a comprehensive, type-safe client SDK that automates API integration, authentication, and state management, allowing developers to focus solely on application logic. The SDK will adhere to the principle of "Secure by Default" and will be deeply integrated with the modern Next.js 15+ architecture (App Router, Server Components, Server Actions).

#### **2.0 Target Audience**
*   **Primary User:** A full-stack or frontend developer using Next.js for the frontend and Django with Django REST Framework (DRF) for the backend.
*   **Assumed Knowledge:** Proficiency in TypeScript, React, Next.js, and a basic understanding of Django REST Framework and OpenAPI specifications.

#### **3.0 Core Principles (Design Constraints)**
1.  **Type-Safety is Non-Negotiable:** All generated code and public-facing SDK functions must be fully typed. There should be no `any` types in the generated client.
2.  **Convention over Configuration:** The SDK will work out-of-the-box with standard DRF and `drf-spectacular` setups. Configuration will only be required to override sensible defaults.
3.  **Security as a Foundation:** Authentication mechanisms must use `httpOnly` cookies for token storage. The SDK must handle CSRF protection automatically.
4.  **Embrace Modern Next.js:** The design must be native to the Next.js App Router, with first-class support for React Server Components (RSC), Client Components, and Server Actions.
5.  **Developer Experience (DX) is a Feature:** The API should be intuitive, and error messages should be clear and actionable. The goal is to eliminate boilerplate and prevent common errors.

#### **4.0 Functional Requirements (Features)**

*   **FR-1: Command-Line Interface (CLI)**
    *   **FR-1.1: `init` command:** Creates a configuration file (`django.config.ts`) in the user's project root.
    *   **FR-1.2: `generate` command:**
        *   Fetches an OpenAPI 3.x schema (JSON or YAML) from a specified URL.
        *   Generates a set of TypeScript files into a `.django-next/` directory.
        *   Generated files must include:
            1.  `types.ts`: TypeScript interfaces for all API request/response bodies and model serializers.
            2.  `validators.ts`: Zod schemas for request bodies to enable client-side validation.
            3.  `api.ts`: A fully-typed API client class with methods corresponding to each API endpoint.
            4.  `hooks.ts`: A set of React hooks (built on TanStack Query) for every endpoint.
            5.  `actions.ts`: A set of Next.js Server Actions for mutation endpoints.

*   **FR-2: Data Fetching & State Management**
    *   **FR-2.1: Server-Side Fetching:** The generated `api` client must be awaitable and usable directly within React Server Components and Route Handlers for direct data fetching.
    *   **FR-2.2: Client-Side Fetching:** The generated `hooks` must manage client-side state, including loading, error, and data states, powered by TanStack Query.
    *   **FR-2.3: Mutations:** Mutation hooks must be provided for `POST`, `PUT`, `PATCH`, `DELETE` operations.
    *   **FR-2.4: Automatic Cache Invalidation:** Successful mutations must automatically invalidate relevant query caches to ensure UI consistency (e.g., creating a post invalidates the post list).

*   **FR-3: Authentication**
    *   **FR-3.1: JWT with `httpOnly` Cookies:** The SDK must operate on the assumption that the Django backend issues JWT access and refresh tokens in `httpOnly`, `Secure`, `SameSite=Strict` cookies.
    *   **FR-3.2: Transparent Token Refresh:** The SDK's HTTP client must automatically intercept 401 Unauthorized responses, attempt to refresh the token using the refresh token cookie, and retry the original request upon success. This entire process must be invisible to the developer.
    *   **FR-3.3: Session Management API:** Provide an `AuthProvider` component and a `useAuth` hook to supply session state (`user`, `isAuthenticated`) throughout the application.
    *   **FR-3.4: CSRF Protection:** The HTTP client must automatically read the `csrftoken` cookie set by Django and include it in the `X-CSRFToken` header for all state-changing requests.

*   **FR-4: Advanced Features**
    *   **FR-4.1: File Uploads:** Mutation hooks must transparently handle payloads containing `File` objects by constructing a `multipart/form-data` request. The hook must provide upload progress state (`progress: number`, `isUploading: boolean`).
    *   **FR-4.2: Role-Based Access Control (RBAC):** The `useAuth` hook must expose user permissions/roles. A `<Protected>` component must be provided for conditionally rendering UI based on these permissions.
    *   **FR-4.3: Batching:** Provide a `django.batch([...requests])` function that bundles multiple `GET` requests into a single HTTP call to a dedicated backend endpoint.

---

### **Project Specification Document**
**For:** AI Coding Agent
**Project:** `@django-next/client` SDK Implementation

#### **1.0 Core Technologies & Libraries**

*   **Runtime:** Node.js (for CLI), Browser (for SDK)
*   **Language:** TypeScript
*   **HTTP Client:** `axios`. **Reason:** Required for its robust request/response interceptors (for token refresh) and built-in upload progress tracking.
*   **State Management:** `@tanstack/react-query`, `@tanstack/react-query-next-experimental`. **Reason:** Industry standard for server-state, provides caching, and has official Next.js App Router support.
*   **CLI Framework:** `commander`. **Reason:** Simple, powerful, and widely used.
*   **Code Generation:**
    *   `openapi-typescript`: For generating TypeScript types from the OpenAPI schema.
    *   `zod-openapi`: For generating Zod schemas from the OpenAPI schema.
    *   Custom generator scripts will be built around these libraries to produce the final `api.ts` and `hooks.ts` files.
*   **Code Formatting:** `prettier`. All generated code must be passed through Prettier.

#### **2.0 Project File Structure (Monorepo)**

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

#### **3.0 Detailed Implementation Plan**

##### **3.1 Package: `cli`**

*   **`commands/init.ts`**
    *   **Action:** Create a `django.config.ts` file in the current working directory.
    *   **File Content:**
        ```typescript
        // django.config.ts
        import type { DjangoNextConfig } from '@django-next/cli';

        const config: DjangoNextConfig = {
          schema: "http://127.0.0.1:8000/api/schema/", // URL to your OpenAPI schema
          output: "./.django-next", // Directory for generated files
        };

        export default config;
        ```

*   **`commands/generate.ts`**
    *   **Action:** Reads `django.config.ts`, then executes the logic in `lib/generator.ts`.

*   **`lib/parser.ts`**
    *   **Function:** `parseSchema(schema: object): ParsedEndpoint[]`
    *   **Logic:**
        1.  Iterate through `schema.paths`.
        2.  For each path and method (get, post, etc.), extract:
            *   `operationId`: e.g., `posts_list`
            *   `tags`: e.g., `['posts']`
            *   `method`: `get`, `post`, etc.
            *   `path`: e.g., `/api/posts/`
            *   `pathParameters`: Array of objects with `name`, `type`, `required`.
            *   `queryParameters`: Array of objects with `name`, `type`, `required`.
            *   `requestBodySchema`: The JSON schema for the request body.
            *   `responseSchema`: The JSON schema for the 200/201 response.
    *   **Return Type `ParsedEndpoint`:**
        ```typescript
        interface ParsedEndpoint {
          operationId: string;
          tag: string; // The first tag, used for grouping
          method: 'get' | 'post' | 'put' | 'patch' | 'delete';
          path: string;
          // ... other extracted properties
        }
        ```

*   **`lib/generator.ts`**
    *   **Function:** `generate(config: DjangoNextConfig)`
    *   **Logic:**
        1.  Fetch schema from `config.schema`.
        2.  Parse the schema using `parser.ts`.
        3.  **Generate `types.ts`:** Use `openapi-typescript` library directly on the schema.
        4.  **Generate `validators.ts`:** Use `zod-openapi` library on the schema.
        5.  **Generate `api.ts`:**
            *   Use a template string. Iterate through the `ParsedEndpoint[]`.
            *   Group endpoints by `tag`.
            *   For each endpoint, create a class method. The method signature must be typed with the generated types from `types.ts`.
            *   The body of the method will be a call to the core HTTP client.
        6.  **Generate `hooks.ts`:**
            *   Use a template string. Iterate through the `ParsedEndpoint[]`.
            *   If `method === 'get'`, generate a `useQuery` hook.
                *   `queryKey`: `[tag, operationId, params]`
                *   `queryFn`: `() => client.api[tag][operationId](params)`
            *   If method is `post`, `put`, etc., generate a `useMutation` hook.
                *   `mutationFn`: `(data) => client.api[tag][operationId](data)`
                *   `onSuccess`: Add `queryClient.invalidateQueries({ queryKey: [tag] })` to invalidate all queries for that resource tag.
        7.  Write all generated files to the `config.output` directory using `writers.ts`.

##### **3.2 Package: `client`**

*   **`client.ts` - `createDjangoClient` function**
    *   **Signature:** `createDjangoClient(config: { baseUrl: string; generatedApi: any; })`
    *   **Logic:**
        1.  Initialize `axios` instance with `config.baseUrl`.
        2.  **Implement Axios Interceptor for Token Refresh:**
            ```typescript
            axiosInstance.interceptors.response.use(
              (response) => response, // Pass through successful responses
              async (error) => {
                const originalRequest = error.config;
                // Check for 401, ensure it's not a retry, and not the refresh endpoint itself
                if (error.response.status === 401 && !originalRequest._retry) {
                  originalRequest._retry = true;
                  try {
                    // Assume refresh token is in an httpOnly cookie, so no payload is needed
                    await axiosInstance.post('/api/auth/token/refresh/');
                    return axiosInstance(originalRequest); // Retry original request
                  } catch (refreshError) {
                    // On refresh failure, trigger a logout event or redirect
                    window.location.href = '/login'; // Or call a logout function
                    return Promise.reject(refreshError);
                  }
                }
                return Promise.reject(error);
              }
            );
            ```
        3.  **Implement Axios Interceptor for CSRF Token:**
            *   On initialization, read `document.cookie` to find the `csrftoken`.
            *   Set `axiosInstance.defaults.headers.common['X-CSRFToken'] = csrfToken;`.
        4.  Instantiate the `generatedApi` class, passing the configured `axios` instance to its constructor. This API class will contain all the methods generated by the CLI.
        5.  Return the final SDK object containing the API instance and other utilities.

*   **`auth.tsx` - `AuthProvider` and `useAuth`**
    *   **`AuthProvider`:**
        *   A standard React Context Provider.
        *   It will hold state for `{ user: User | null, isAuthenticated: boolean, isLoading: boolean }`.
        *   On mount, it will call a `/api/users/me/` endpoint to fetch the user session. It will set `isLoading` to true during this fetch.
    *   **`useAuth`:**
        *   A hook that returns the context value.
        *   It must also return a `login(credentials)` function that POSTs to `/api/auth/token/`, and a `logout()` function that POSTs to `/api/auth/logout/`. On success, both must refetch the user session to update the context.

*   **File Upload Logic (within the generated API methods):**
    *   Before an API method makes the `axios` call, it must check its payload.
    *   **Signature:** `if (Object.values(payload).some(v => v instanceof File))`
    *   **If true:**
        1.  Create `const formData = new FormData();`.
        2.  Loop through `Object.entries(payload)` and `formData.append(key, value)`.
        3.  Make the `axios` call with `formData` as the body.
        4.  In the `axios` config, set `headers: { 'Content-Type': 'multipart/form-data' }`.
        5.  Pass an `onUploadProgress` handler to the `axios` config to report progress. This progress value must be exposed from the corresponding mutation hook.