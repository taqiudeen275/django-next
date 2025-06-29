# Project Backlog: @django-next/client SDK

## Feature Breakdown (from PRD)

### CLI Package
- [x] `init` command: Generates `django.config.ts` (done)
- [x] `generate` command: Fetches OpenAPI schema, generates SDK files (`types.ts`, `validators.ts`, `api.ts`, `hooks.ts`, `actions.ts`) (done)
- [~] Schema parser and code generator logic (basic version exists, needs enhancements for edge cases, error handling, and custom templates)
- [~] Prettier formatting for generated code (basic, could be improved for custom formatting or error handling)

### Client Package
- [~] `createDjangoClient` core logic (placeholder, needs real implementation)
- [ ] API client with axios and interceptors (CSRF, auth refresh) (not implemented)
- [~] React hooks for data fetching and mutations (context-based, integrated)
- [~] AuthProvider and useAuth hook (placeholder, needs real auth logic)
- [~] Protected component for RBAC (placeholder, needs real RBAC logic)
- [x] File upload support with progress (`uploadFile` utility implemented)
- [x] Batch utility (`batchApiCalls` and `useBatchQuery` implemented)

## Task Prioritization & Sprint Planning

### Sprint 1 (Core CLI & Client Setup)
- [x] Monorepo and package structure
- [x] TypeScript strict config
- [x] CLI skeleton (`init`, `generate`)
- [x] Client SDK skeleton

### Sprint 2 (Core Features)
- [~] CLI: Schema parser, codegen, formatting (basic, needs polish)
- [~] Client: API client, hooks, auth, RBAC (placeholders, needs implementation)

### Sprint 3 (Advanced Features & Polish)
- [x] File upload, batch, cache invalidation (file upload and batch done)
- [ ] Docs, tests, polish

## User Stories & Acceptance Criteria

### User Story 1: CLI Initialization
- As a developer, I can run `django-next init` to generate a config file
- **Acceptance:** `django.config.ts` is created with correct defaults (done)

### User Story 2: SDK Generation
- As a developer, I can run `django-next generate` to fetch schema and generate SDK files
- **Acceptance:** All files are generated, fully typed, and formatted (done, needs polish)

### User Story 3: Typed API Client
- As a developer, I can import the generated client and use it in Next.js apps
- **Acceptance:** All endpoints are typed, hooks work, auth/session is managed (in progress)

### User Story 4: Secure Auth & State
- As a developer, I can use the AuthProvider and hooks for secure session management
- **Acceptance:** Auth/session is secure, CSRF is handled, RBAC works (in progress)

---

Update this backlog as features are completed.
