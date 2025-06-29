// generator.ts: Orchestrates code generation for the SDK
import { fetchSchema, parseSchema } from './parser';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

export async function generate(config: any) {
  // 1. Fetch and parse OpenAPI schema
  const schema = await fetchSchema(config.schema);
  const endpoints = parseSchema(schema);

  // 2. Generate types.ts using openapi-typescript
  const typesOut = path.join(config.output, 'types.ts');
  fs.mkdirSync(config.output, { recursive: true });
  execSync(`npx openapi-typescript ${config.schema} --output ${typesOut}`);
  console.log('Generated types.ts');

  // 3. Generate validators.ts using openapi-zod-client
  const validatorsOut = path.join(config.output, 'validators.ts');
  execSync(`pnpm exec openapi-zod-client ${config.schema} --output ${validatorsOut}`);
  console.log('Generated validators.ts');

  // 4. Generate api.ts, hooks.ts, and actions.ts with type-safe signatures and param fix
  const apiOut = path.join(config.output, 'api.ts');
  const hooksOut = path.join(config.output, 'hooks.ts');
  const actionsOut = path.join(config.output, 'actions.ts');
  fs.writeFileSync(apiOut, generateApiClass(endpoints));
  fs.writeFileSync(hooksOut, generateHooks(endpoints));
  fs.writeFileSync(actionsOut, generateActions(endpoints));
  console.log('Generated api.ts, hooks.ts, and actions.ts');

  // 5. Always generate documentation files
  fs.writeFileSync(path.join(config.output, 'README.md'), sdkReadmeDoc());
  fs.writeFileSync(path.join(config.output, 'api.md'), apiDoc());
  fs.writeFileSync(path.join(config.output, 'hooks.md'), hooksDoc());
  fs.writeFileSync(path.join(config.output, 'actions.md'), actionsDoc());
  console.log('Generated documentation files');

  // 6. Format all generated files with Prettier
  execSync(`pnpm exec prettier --write "${config.output}/*.{ts,md}"`);
  console.log('Formatted generated files with Prettier');
}

function generateApiClass(endpoints: any[]) {
  let methods = endpoints.map(ep => `  async ${ep.operationId}(params?: types.paths["${ep.path}"]["${ep.method}"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["${ep.path}"]["${ep.method}"] extends { responses: { 200: { content: infer R } } } ? R : any> {\n    // TODO: Validate params with validators.${ep.operationId}Schema if available\n    // Example: validators.${ep.operationId}Schema.parse(params);\n    const safeParams = params ?? {};\n    return this.axios.${ep.method}('${ep.path}', safeParams);\n  }`).join('\n\n');
  return `// api.ts - Generated API client\nimport axios, { AxiosInstance } from 'axios';\nimport * as validators from './validators';\nimport * as types from './types';\n\nexport class API {\n  private axios: AxiosInstance;\n  constructor(axiosInstance?: AxiosInstance) {\n    this.axios = axiosInstance || axios.create();\n  }\n\n${methods}\n}\n`;
}

function generateHooks(endpoints: any[]) {
  let hooks = endpoints.map(ep => {
    const paramsType = `types.paths["${ep.path}"]["${ep.method}"] extends { parameters: infer P } ? P : undefined`;
    const responseType = `types.paths["${ep.path}"]["${ep.method}"] extends { responses: { 200: { content: infer R } } } ? R : any`;
    if (ep.method === 'get') {
      return `export function use${capitalize(ep.operationId)}(params?: ${paramsType}) {\n  const api = useApi();\n  return useQuery({\n    queryKey: ['${ep.operationId}', params],\n    queryFn: () => api.${ep.operationId}(params),\n  });\n}`;
    } else {
      return `export function use${capitalize(ep.operationId)}() {\n  const api = useApi();\n  const queryClient = useQueryClient();\n  return useMutation({\n    mutationFn: (data: ${paramsType}) => api.${ep.operationId}(data),\n    onSuccess: () => {\n      queryClient.invalidateQueries({ queryKey: ['${ep.operationId}'] });\n    },\n  });\n}`;
    }
  }).join('\n\n');
  return `// hooks.ts - Generated React Query hooks\nimport { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';\nimport { useApi } from '@django-next/client/api-context';\nimport * as types from './types';\n\n${hooks}\n`;
}

function generateActions(endpoints: any[]) {
  let actions = endpoints.filter(ep => ['post', 'put', 'patch', 'delete'].includes(ep.method)).map(ep => {
    const validatorName = `${ep.operationId}Schema`;
    return `export async function ${ep.operationId}Action(params: types.paths["${ep.path}"]["${ep.method}"] extends { parameters: infer P } ? P : undefined) {
  // Validate params with Zod schema if available
  if (validators.${validatorName}) {
    validators.${validatorName}.parse(params);
  }
  const api = new (await import('./api')).API();
  return api.${ep.operationId}(params);
}`;
  }).join('\n\n');
  return `// actions.ts - Generated Next.js server actions\nimport * as validators from './validators';\nimport * as types from './types';\n\n${actions}\n`;
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function sdkReadmeDoc() {
  return `# Django-Next Generated SDK

## Overview
This directory contains a fully type-safe, auto-generated SDK for your Django REST API, including:
- TypeScript types (types.ts)
- Zod validators (validators.ts)
- API client class (api.ts)
- React Query hooks (hooks.ts)
- Next.js server actions (actions.ts)

## Setup
1. Ensure you have installed all dependencies in your project:
   - axios
   - @tanstack/react-query
   - zod
2. Import the generated files as needed in your app.
3. **Wrap your app with \`ApiProvider\` from \`@django-next/client/api-context\` and pass your configured API client.**

## Usage Examples
### API Client
\`\`\`ts
import { API } from './api';
const api = new API();
const data = await api.someEndpoint(params);
\`\`\`

### React Query Hooks
\`\`\`tsx
import { useSomeEndpoint } from './hooks';
const { data, isLoading } = useSomeEndpoint(params);
\`\`\`

### Server Actions (Next.js)
\`\`\`ts
import { someEndpointAction } from './actions';
export async function action(formData) {
  return await someEndpointAction(formData);
}
\`\`\`

## Extending & Customizing
- Add custom logic to the API client or hooks as needed.
- Use Zod validators for runtime validation.

## Troubleshooting
- If you see type errors, re-run the codegen to sync with your API schema.
- For network or validation errors, check your API and Zod schemas.

---
Generated by the Django-Next CLI.
`;
}

function apiDoc() {
  return `# api.ts Documentation

## Purpose and Functionality
The \`api.ts\` file contains the generated API client class, which provides methods for each endpoint in your OpenAPI schema. Each method wraps an HTTP call using axios and is ready for Zod validation integration.

## Logic Flow
- Each method corresponds to an OpenAPI operationId
- Methods use axios for HTTP requests
- Zod validation can be applied to parameters before requests

## Key Functions
- API class: Main client
- Endpoint methods: e.g., api_academics_assignments_teacher_list(params)

## Dependencies
- axios for HTTP
- validators.ts for Zod schemas (integration point)

## Debugging Scenarios
- Type errors: Check generated types and OpenAPI schema
- HTTP errors: Inspect axios request/response
- Validation errors: Ensure Zod schemas match API contract
`;
}

function hooksDoc() {
  return `# hooks.ts Documentation

## Purpose and Functionality
The \`hooks.ts\` file contains generated React Query hooks for each API endpoint. These hooks provide data fetching, mutation, and cache management for use in React components.

## Logic Flow
- For each endpoint, a corresponding use... hook is generated
- useQuery for GET endpoints, useMutation for others
- Mutations invalidate relevant queries on success

## Key Functions
- useQuery, useMutation, useQueryClient from @tanstack/react-query
- Hooks like useApi_academics_assignments_teacher_list(params)

## Dependencies
- @tanstack/react-query
- api.ts (API client)

## Debugging Scenarios
- Query/mutation errors: Check API client and network
- Cache issues: Inspect query keys and invalidation logic
`;
}

function actionsDoc() {
  return `# actions.ts Documentation

## Purpose and Functionality
The \`actions.ts\` file contains generated Next.js server actions for all mutation endpoints. These actions enable secure, server-side data mutations and can be used in Next.js App Router routes.

## Logic Flow
- Each action wraps an API client method
- Zod validation can be applied before mutation
- Actions are async and return API responses

## Key Functions
- Server action functions: e.g., api_academics_assignments_teacher_createAction(params)

## Dependencies
- api.ts (API client)
- validators.ts (Zod schemas)

## Debugging Scenarios
- Validation errors: Check Zod schema and input
- API errors: Inspect API client and backend responses
`;
}
