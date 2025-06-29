# Project Backlog: @django-next/client SDK

## Feature Breakdown (from PRD)

### CLI Package
- [ ] `init` command: Generates `django.config.ts`
- [ ] `generate` command: Fetches OpenAPI schema, generates SDK files (`types.ts`, `validators.ts`, `api.ts`, `hooks.ts`, `actions.ts`)
- [ ] Schema parser and code generator logic
- [ ] Prettier formatting for generated code

### Client Package
- [ ] `createDjangoClient` core logic
- [ ] API client with axios and interceptors (CSRF, auth refresh)
- [ ] React hooks for data fetching and mutations (TanStack Query)
- [ ] AuthProvider and useAuth hook
- [ ] Protected component for RBAC
- [ ] File upload support with progress
- [ ] Batch utility

## Task Prioritization & Sprint Planning

### Sprint 1 (Core CLI & Client Setup)
- Monorepo and package structure
- TypeScript strict config
- CLI skeleton (`init`, `generate`)
- Client SDK skeleton

### Sprint 2 (Core Features)
- CLI: Schema parser, codegen, formatting
- Client: API client, hooks, auth, RBAC

### Sprint 3 (Advanced Features & Polish)
- File upload, batch, cache invalidation
- Docs, tests, polish

## User Stories & Acceptance Criteria

### User Story 1: CLI Initialization
- As a developer, I can run `django-next init` to generate a config file
- **Acceptance:** `django.config.ts` is created with correct defaults

### User Story 2: SDK Generation
- As a developer, I can run `django-next generate` to fetch schema and generate SDK files
- **Acceptance:** All files are generated, fully typed, and formatted

### User Story 3: Typed API Client
- As a developer, I can import the generated client and use it in Next.js apps
- **Acceptance:** All endpoints are typed, hooks work, auth/session is managed

### User Story 4: Secure Auth & State
- As a developer, I can use the AuthProvider and hooks for secure session management
- **Acceptance:** Auth/session is secure, CSRF is handled, RBAC works

---

Update this backlog as features are completed.
