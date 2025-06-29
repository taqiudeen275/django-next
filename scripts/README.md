# scripts/

This directory contains utility scripts for monorepo management.

- `typecheck-all.mjs`: Type-checks all packages using their local TypeScript configs.

## Usage

```bash
node scripts/typecheck-all.mjs
```

This will run the build/type-check for each package and report any errors.
