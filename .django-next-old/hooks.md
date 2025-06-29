# hooks.ts Documentation

## Purpose and Functionality
The `hooks.ts` file contains generated React Query hooks for each API endpoint. These hooks provide data fetching, mutation, and cache management for use in React components.

## Logic Flow
- For each endpoint, a corresponding `use...` hook is generated
- `useQuery` for GET endpoints, `useMutation` for others
- Mutations invalidate relevant queries on success

## Key Functions
- `useQuery`, `useMutation`, `useQueryClient` from `@tanstack/react-query`
- Hooks like `useApi_academics_assignments_teacher_list(params)`

## Dependencies
- `@tanstack/react-query`
- `api.ts` (API client)

## Debugging Scenarios
- Query/mutation errors: Check API client and network
- Cache issues: Inspect query keys and invalidation logic
