# @django-next/cli

[![npm version](https://badge.fury.io/js/%40django-next%2Fcli.svg)](https://badge.fury.io/js/%40django-next%2Fcli)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)

> Command-line interface for generating type-safe Django REST API clients from OpenAPI schemas.

## 🚀 Features

- **🔧 Easy Setup**: Initialize configuration with a single command
- **📝 TypeScript Support**: Generate fully typed clients from OpenAPI schemas
- **🎯 Smart Generation**: Separate generators for types, validators, API clients, hooks, and actions
- **📚 Auto Documentation**: Generate comprehensive documentation for your SDK
- **🛠 Developer Experience**: Enhanced CLI with verbose logging and helpful error messages
- **⚡ Fast**: Optimized generation process with parallel processing

## 📦 Installation

### Recommended: Development Dependency

```bash
# Using pnpm (recommended)
pnpm add -D @django-next/cli

# Using npm
npm install --save-dev @django-next/cli

# Using yarn
yarn add -D @django-next/cli
```

### Alternative: Global Installation

```bash
# Install globally
npm install -g @django-next/cli

# Or use without installation
npx @django-next/cli init
pnpm dlx @django-next/cli generate
```

**💡 Recommendation:** Install as a dev dependency for better version control and team consistency.

## 🏃‍♂️ Quick Start

```bash
# 1. Initialize configuration
npx @django-next/cli init

# 2. Generate SDK
npx @django-next/cli generate

# 3. Use in your Next.js app
# See generated README.md for usage instructions
```

## 📋 Commands

### `init`

Initialize a Django-Next configuration file.

```bash
django-next init [options]
```

**Options:**
- `-t, --typescript` - Create TypeScript config (default)
- `-j, --javascript` - Create JavaScript config
- `-f, --force` - Overwrite existing configuration
- `-s, --schema <url>` - OpenAPI schema URL
- `-o, --output <dir>` - Output directory for generated files

### `generate`

Generate SDK from OpenAPI schema.

```bash
django-next generate [options]
```

**Options:**
- `-c, --config <path>` - Path to configuration file
- `-v, --verbose` - Enable verbose logging

## ⚙️ Configuration

### TypeScript Configuration (Recommended)

```typescript
// django.config.ts
import type { DjangoNextConfig } from '@django-next/cli';

const config: DjangoNextConfig = {
  schema: "http://127.0.0.1:8000/api/schema/",
  output: "./.django-next",
  baseUrl: "http://127.0.0.1:8000",
  auth: {
    loginUrl: "/api/auth/login/",
    logoutUrl: "/api/auth/logout/",
    userUrl: "/api/auth/me/",
    refreshUrl: "/api/auth/refresh/",
  },
};

export default config;
```

## 📁 Generated Files

The CLI generates the following files in your output directory:

### Core Files
- **`types.ts`** - TypeScript type definitions from OpenAPI schema
- **`validators.ts`** - Zod validation schemas for runtime validation
- **`api.ts`** - Type-safe API client class with all endpoint methods
- **`hooks.ts`** - React Query hooks for data fetching and mutations
- **`actions.ts`** - Next.js Server Actions for server-side operations

### Documentation Files
- **`README.md`** - Comprehensive usage guide for the generated SDK
- **`api.md`** - API client documentation and examples
- **`hooks.md`** - React hooks documentation and usage patterns
- **`actions.md`** - Server Actions documentation and configuration
- **`TROUBLESHOOTING.md`** - Common issues and solutions
- **`CHANGELOG.md`** - Generated SDK changelog

## 🐛 Troubleshooting

### Common Issues

#### Configuration File Not Found
```bash
Error: Could not find configuration file
```
**Solution:** Run `django-next init` to create a configuration file.

#### Schema URL Not Accessible
```bash
Error: Failed to fetch schema from http://localhost:8000/api/schema/
```
**Solutions:**
- Ensure your Django server is running
- Check the schema URL is correct
- Verify CORS settings if accessing from different domain
- Add authentication headers if required

### Debug Mode

Enable verbose logging to see detailed information:

```bash
django-next generate --verbose
```

## 📚 API Reference

### Configuration Types

```typescript
interface DjangoNextConfig {
  schema: string;
  output: string;
  baseUrl?: string;
  auth?: AuthConfig;
  options?: GeneratorOptions;
}

interface AuthConfig {
  loginUrl?: string;
  logoutUrl?: string;
  userUrl?: string;
  refreshUrl?: string;
}

interface GeneratorOptions {
  debug?: boolean;
  skipFormatting?: boolean;
  headers?: Record<string, string>;
  timeout?: number;
}
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](../../CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../../LICENSE) file for details.