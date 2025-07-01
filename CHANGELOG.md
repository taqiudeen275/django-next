# Changelog

All notable changes to the Django-Next project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2025-06-30

### 🚀 Major Restructuring and Enhancements

#### CLI Package Restructuring
- **BREAKING**: Completely restructured CLI package with proper separation of concerns
- Moved all generation logic out of `generator.ts` into dedicated modules:
  - `generators/types-generator.ts` - TypeScript type generation
  - `generators/validators-generator.ts` - Zod validator generation
  - `generators/api-generator.ts` - API client generation
  - `generators/hooks-generator.ts` - React Query hooks generation
  - `generators/actions-generator.ts` - Next.js Server Actions generation
  - `generators/docs-generator.ts` - Documentation generation
- Added comprehensive logging system with `utils/logger.ts`
- Enhanced CLI commands with better options and error handling
- Added TypeScript configuration support
- Improved Prettier formatting with fallback mechanisms

#### Enhanced Code Generation
- **NEW**: File upload support with progress tracking in generated API methods
- **NEW**: Enhanced type safety with better parameter validation
- **NEW**: Automatic file detection and multipart/form-data handling
- **NEW**: Support for FileList and file arrays
- **NEW**: Comprehensive error handling in generated code
- **NEW**: Query key factory for consistent cache management
- **NEW**: Utility hooks for cache invalidation and prefetching
- **NEW**: Enhanced Server Actions with revalidation and error handling

#### Client Package Rebuild
- **BREAKING**: Completely rebuilt client package with enhanced features
- **NEW**: Enhanced `createDjangoClient` with better configuration options
- **NEW**: Improved CSRF token handling with multiple fallback methods
- **NEW**: Enhanced authentication with RBAC support
- **NEW**: File upload utilities with validation and progress tracking
- **NEW**: Comprehensive logging system for client-side debugging
- **NEW**: Enhanced Protected components with granular permissions
- **NEW**: React hooks for authentication patterns (`useRequireAuth`, `usePermission`, `useRole`)
- **NEW**: Higher-order component `withAuth` for protected routes

#### Authentication Enhancements
- **NEW**: Role-Based Access Control (RBAC) with permissions and roles
- **NEW**: Enhanced user model with `is_staff`, `is_superuser`, groups, and profile
- **NEW**: Better error handling with typed `AuthError` interface
- **NEW**: Authentication event callbacks (`onLoginSuccess`, `onLogoutSuccess`, `onAuthError`)
- **NEW**: Utility components (`RequireAuth`, `RequireRole`, `RequirePermission`, `RequireStaff`, `RequireSuperuser`)
- **NEW**: Enhanced session management with automatic refresh

#### File Upload System
- **NEW**: Comprehensive file upload system with validation
- **NEW**: File size and type validation
- **NEW**: Multiple file upload support
- **NEW**: Upload progress tracking
- **NEW**: React hook `useFileUpload` for state management
- **NEW**: Utility functions for file handling (`formatFileSize`, `getFileExtension`)

#### Query Provider Enhancements
- **NEW**: Enhanced React Query configuration optimized for Django REST APIs
- **NEW**: Automatic retry logic with exponential backoff
- **NEW**: Development tools integration
- **NEW**: Configurable cache and stale time settings
- **NEW**: Smart retry logic that avoids retrying 4xx errors

#### Documentation and Developer Experience
- **NEW**: Comprehensive documentation generation for all generated files
- **NEW**: Troubleshooting guide with common issues and solutions
- **NEW**: API reference documentation
- **NEW**: Usage examples and best practices
- **NEW**: Automatic changelog generation
- **NEW**: Enhanced CLI help and error messages

### 🐛 Bug Fixes
- Fixed type safety issues in generated API methods
- Fixed CSRF token handling edge cases
- Fixed file upload parameter handling
- Fixed query key consistency issues
- Fixed authentication state management race conditions
- Fixed Prettier formatting failures

### 🔧 Technical Improvements
- Added comprehensive TypeScript types throughout the codebase
- Improved error handling and validation
- Enhanced logging and debugging capabilities
- Better separation of concerns in CLI architecture
- Improved test infrastructure setup
- Enhanced package.json configurations

### 📚 Documentation
- Complete rewrite of README files
- Added comprehensive API documentation
- Added troubleshooting guides
- Added usage examples for all features
- Added migration guide for breaking changes

### 🔄 Migration Guide

#### CLI Package
- Update import paths for types: `import { DjangoNextConfig } from '@django-next/cli'`
- Configuration files now support both `.js` and `.ts` extensions
- New CLI options available: `--verbose`, `--force`, `--typescript`

#### Client Package
- Update `createDjangoClient` calls to use new configuration format
- Replace old `Protected` component props with new RBAC props
- Update authentication hooks to use new error handling
- Migrate file upload code to use new validation system

#### Generated Code
- Re-run `django-next generate` to get enhanced generated code
- Update React Query hook usage to use new query key factory
- Update Server Actions to use new error handling

### 🚨 Breaking Changes
- CLI package structure completely changed
- Client package API significantly enhanced
- Generated code format updated
- Authentication interface expanded
- File upload interface redesigned

### 📦 Dependencies
- Added `ts-node` for TypeScript configuration support
- Enhanced React Query integration
- Improved Axios interceptor handling

---

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
