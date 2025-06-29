// parser.ts: Fetch and parse OpenAPI schema
import axios from 'axios';

export async function fetchSchema(schemaUrl: string) {
  const response = await axios.get(schemaUrl);
  return response.data;
}

export function parseSchema(schema: any) {
  // Extract endpoints from OpenAPI schema
  const endpoints = [];
  for (const path in schema.paths) {
    for (const method in schema.paths[path]) {
      const op = schema.paths[path][method];
      endpoints.push({
        operationId: op.operationId,
        method,
        path,
        tags: op.tags,
        parameters: op.parameters,
        requestBody: op.requestBody,
        responses: op.responses,
      });
    }
  }
  return endpoints;
}
