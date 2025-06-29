# Changelog

## [0.1.3] - 2025-06-29
### Added
- Runtime config support for authentication endpoints in `createDjangoClient` and `AuthProvider`.
- Interfaces for API client (`DjangoNextApi`), auth config (`DjangoNextAuthConfig`), and `AuthProviderProps` for type safety and clarity.
- Updated documentation to reflect runtime config and new interfaces.

### Improved
- Auth logic and client now use runtime config if provided, falling back to codegen config and sensible defaults.

### In Progress
- Further codegen and error handling enhancements.
- More tests and documentation polish.

## [0.1.2] - 2025-06-29
### Added
- File upload utility (`uploadFile`) with progress support and flexible API.
- Batch API calls utility (`batchApiCalls`) for running multiple API client methods in parallel.
- Batch query React hook (`useBatchQuery`) for running multiple queries in parallel in React components.
- Documentation for new utilities in the client package README.

### In Progress
- Real implementation for client-side features (auth, RBAC, JWT, etc.).
- Further codegen and error handling enhancements.

## [0.1.1] - 2025-06-29
### Added
- Implemented `init` CLI command to generate `django.config.ts`.
- Implemented `generate` CLI command to fetch OpenAPI schema and generate SDK files (`types.ts`, `validators.ts`, `api.ts`, `hooks.ts`, `actions.ts`).
- Basic codegen logic for types, validators, API client, hooks, and actions.
- Generated documentation files for SDK usage.
- Client package scaffolding with placeholders for `createDjangoClient`, `AuthProvider`, `useAuth`, `Protected`, and `DjangoNextQueryProvider`.

### In Progress
- Enhancements to codegen logic for edge cases and custom templates.
- Real implementation for client-side features (auth, RBAC, file upload, batch, etc.).

## [0.1.0] - 2025-06-28
### Added
- Monorepo structure with pnpm
- CLI and client package scaffolding
- TypeScript strict configuration
- Initial project backlog and changelog

---

Update this changelog after each significant change.
