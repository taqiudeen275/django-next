# @django-next/client

## Purpose and Functionality
This package provides the type-safe client SDK for integrating Django REST Framework APIs with Next.js apps. It includes a generated API client, React hooks, authentication/session management, and RBAC utilities.

## Pseudocode / Logic Flow
- `createDjangoClient`: Initializes axios, sets up interceptors, returns SDK object
- `AuthProvider`/`useAuth`: Provides session state and auth actions
- `Protected`: Conditionally renders children based on user roles/permissions

## Key Functions
- `createDjangoClient(config)`
- `AuthProvider`, `useAuth`, `Protected`

## Dependencies
- `axios`, `@tanstack/react-query`, `@tanstack/react-query-next-experimental`

## Debugging Scenarios
- Auth/session issues: Check cookies and API endpoints
- Query/mutation errors: Inspect hook usage and API responses
- Type errors: Run `npx tsc --noEmit` for diagnostics
