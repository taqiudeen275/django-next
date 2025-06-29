# @django-next/cli

## Overview
A modern CLI for initializing and generating a type-safe Django-Next client SDK from your Django REST Framework OpenAPI schema.

## Recommended Installation & Usage

- **Install the CLI as a dev dependency** (for codegen only):
  - Using pnpm:
    ```sh
    pnpm add -D @django-next/cli
    ```
  - Using npm:
    ```sh
    npm install --save-dev @django-next/cli
    ```
- **Install the client SDK as a regular dependency** (for your app):
  - Using pnpm:
    ```sh
    pnpm add @django-next/client
    ```
  - Using npm:
    ```sh
    npm install @django-next/client
    ```
- **Or use the CLI via pnpm dlx or npx for one-off codegen:**
  ```sh
  pnpm dlx @django-next/cli generate
  # or
  npx @django-next/cli generate
  ```

**Recommendation:**
- Use `pnpm` or `npm` according to your project’s package manager.
- Always install the CLI as a dev dependency and the client SDK as a runtime dependency for best practices, smaller production bundles, and easier upgrades.

## Features
- Stylish, user-friendly CLI output (colors, boxes, icons)
- `init` command: Generates a default `django.config.js`
- `generate` command: Fetches OpenAPI schema, generates SDK (types, validators, API client, hooks, actions, docs)
- Robust error handling and feedback
- Extensible codegen pipeline

## Quick Start
```sh
pnpm dlx @django-next/cli init
pnpm dlx @django-next/cli generate
```

## Commands
### `init`
Creates a `django.config.js` in your project root with sensible defaults.

### `generate`
Fetches your OpenAPI schema and generates a fully-typed SDK in `.django-next/`.

## Error Handling
- The CLI prints clear error messages for config, schema, and file issues.
- Generated code (hooks, actions, batch) exposes errors for you to handle in your app (see SDK docs for details).

## Troubleshooting
- **Schema fetch failures:** Check your schema URL and network connection.
- **File write errors:** Check directory permissions.
- **Type errors:** Run `pnpm --filter @django-next/cli run build` for diagnostics.

## Contributing
PRs and issues welcome! See the monorepo root for guidelines.

---
For more, see the generated SDK docs in `.django-next/` after running `generate`.
