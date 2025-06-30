# @django-next/cli

[![npm version](https://badge.fury.io/js/%40django-next%2Fcli.svg)](https://badge.fury.io/js/%40django-next%2Fcli)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)

> Generate type-safe Next.js SDKs from Django REST APIs with one command.

## 🌟 What does this CLI do?

The Django-Next CLI automatically generates a complete TypeScript SDK for your Django REST Framework API. It reads your Django API's OpenAPI schema and creates:

- **TypeScript types** for all your Django models
- **API client** with methods for every endpoint
- **React Query hooks** for easy data fetching
- **Server Actions** for Next.js forms
- **Zod validators** for runtime type checking
- **Complete documentation** with usage examples

**Perfect for beginners!** No complex setup required.

## 🚀 Features

- **🔧 Zero Configuration**: One command generates everything
- **📝 100% Type Safe**: Full TypeScript support from Django to React
- **🎯 Complete SDK**: Everything you need for a modern Next.js app
- **📚 Auto Documentation**: Comprehensive guides generated for you
- **🛠 Beginner Friendly**: Clear error messages and helpful guidance
- **⚡ Fast**: Generates large APIs in seconds

## 📦 Installation

### Option 1: Global Installation (Recommended for beginners)

```bash
# Install once, use anywhere
npm install -g @django-next/cli

# Now you can use 'django-next' command anywhere
django-next --help
```

### Option 2: Project Installation

```bash
# Install in your Next.js project
npm install --save-dev @django-next/cli

# Use with npx
npx django-next --help
```

### Don't forget the client package!

```bash
# Install the runtime client package in your Next.js project
npm install @django-next/client @tanstack/react-query axios zod
```

**💡 Recommendation:** Install as a dev dependency for better version control and team consistency.

## 🏃‍♂️ Quick Start Guide

### Step 1: Make sure your Django API is running

```bash
# Your Django server should be running with DRF and OpenAPI schema
# Usually at: http://localhost:8000/api/schema/
```

### Step 2: Initialize configuration

```bash
# In your Next.js project root
django-next init

# Or specify your Django API URL directly
django-next init --schema http://localhost:8000/api/schema/ --output ./lib/api
```

This creates a `django.config.js` file like:

```javascript
// django.config.js
module.exports = {
  schema: "http://localhost:8000/api/schema/",
  output: "./lib/api",
  baseUrl: "http://localhost:8000",
  auth: {
    loginUrl: "/api/auth/login/",
    logoutUrl: "/api/auth/logout/",
    userUrl: "/api/auth/me/",
    refreshUrl: "/api/auth/refresh/",
  },
};
```

### Step 3: Generate your SDK

```bash
# Generate complete TypeScript SDK
django-next generate

# See what's happening (recommended for first time)
django-next generate --verbose
```

### Step 4: Check the generated files

After generation, you'll have:

```
lib/api/
├── types.ts        # TypeScript interfaces for all Django models
├── api.ts          # API client with methods for every endpoint
├── hooks.ts        # React Query hooks for data fetching
├── actions.ts      # Server Actions for Next.js forms
├── validators.ts   # Zod schemas for runtime validation
└── README.md       # Usage guide with examples
```

## 📋 CLI Commands

### `django-next init`

Creates a configuration file for your project.

```bash
django-next init [options]
```

**Options:**
- `-s, --schema <url>` - Django API schema URL (default: http://localhost:8000/api/schema/)
- `-o, --output <path>` - Output directory (default: ./lib/api)
- `-t, --typescript` - Create TypeScript config (default: true)
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