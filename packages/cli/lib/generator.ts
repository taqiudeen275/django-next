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

  // 4. Generate api.ts, hooks.ts, and actions.ts
  const apiOut = path.join(config.output, 'api.ts');
  const hooksOut = path.join(config.output, 'hooks.ts');
  const actionsOut = path.join(config.output, 'actions.ts');
  fs.writeFileSync(apiOut, generateApiClass(endpoints));
  fs.writeFileSync(hooksOut, generateHooks(endpoints));
  fs.writeFileSync(actionsOut, generateActions(endpoints));
  console.log('Generated api.ts, hooks.ts, and actions.ts');

  // 5. TODO: Format files with Prettier
}

function generateApiClass(endpoints: any[]) {
  let methods = endpoints.map(ep => `  async ${ep.operationId}(params?: any) {\n    // TODO: Validate params with validators.${ep.operationId}Schema if available\n    // Example: validators.${ep.operationId}Schema.parse(params);\n    return this.axios.${ep.method}('${ep.path}', params);\n  }`).join('\n\n');
  return `// api.ts - Generated API client\nimport axios, { AxiosInstance } from 'axios';\nimport * as validators from './validators';\n\nexport class API {\n  private axios: AxiosInstance;\n  constructor(axiosInstance?: AxiosInstance) {\n    this.axios = axiosInstance || axios.create();\n  }\n\n${methods}\n}\n`;
}

function generateHooks(endpoints: any[]) {
  let hooks = endpoints.map(ep => {
    if (ep.method === 'get') {
      return `export function use${capitalize(ep.operationId)}(params?: any) {\n  return useQuery(['${ep.operationId}', params], () => api.${ep.operationId}(params));\n}`;
    } else {
      return `export function use${capitalize(ep.operationId)}() {\n  const queryClient = useQueryClient();\n  return useMutation((data: any) => api.${ep.operationId}(data), {\n    onSuccess: () => {\n      queryClient.invalidateQueries(['${ep.operationId}']);\n    },\n  });\n}`;
    }
  }).join('\n\n');
  return `// hooks.ts - Generated React Query hooks\nimport { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';\nimport { API } from './api';\n\nconst api = new API();\n\n${hooks}\n`;
}

function generateActions(endpoints: any[]) {
  let actions = endpoints.filter(ep => ['post', 'put', 'patch', 'delete'].includes(ep.method)).map(ep => `export async function ${ep.operationId}Action(params: any) {\n  // TODO: Validate params with validators.${ep.operationId}Schema if available\n  // Example: validators.${ep.operationId}Schema.parse(params);\n  const api = new (await import('./api')).API();\n  return api.${ep.operationId}(params);\n}`).join('\n\n');
  return `// actions.ts - Generated Next.js server actions\nimport * as validators from './validators';\n\n${actions}\n`;
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
