# @django-next/cli

## Purpose and Functionality
This package provides the CLI for initializing and generating the Django-Next client SDK. It automates the creation of a config file and generates a fully-typed client SDK from a Django REST Framework OpenAPI schema.

## Pseudocode / Logic Flow
- `init` command: Writes a default `django.config.ts` file
- `generate` command: Fetches OpenAPI schema, parses it, generates types, validators, API client, hooks, and actions
- **Codegen Pipeline:**
  1. Fetch schema (`lib/parser.ts`)
  2. Parse schema (`lib/parser.ts`)
  3. Generate code (`lib/generator.ts`, `lib/templates.ts`)
  4. Write and format files (`lib/writers.ts`)

## Key Functions
- `initCommand()`: Handles config file creation
- `generateCommand()`: Handles schema fetching and code generation
- `fetchSchema()`, `parseSchema()`: Schema utilities
- `generate()`: Orchestrates codegen
- `writeFile()`, `formatWithPrettier()`: File utilities

## Dependencies
- `commander` (CLI framework)
- `axios` (HTTP requests)
- `openapi-typescript`, `zod-openapi` (codegen)

## Debugging Scenarios
- Schema fetch failures: Check URL and network
- File write errors: Check permissions
- Type errors: Run `pnpm --filter @django-next/cli run build` for diagnostics
