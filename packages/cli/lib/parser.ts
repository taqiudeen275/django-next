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
      // Find the schema name for the body parameter (for mutations)
      let validatorName = undefined;
      if (op.parameters) {
        const bodyParam = op.parameters.find((p: any) => p.type === 'Body' && p.schema && typeof p.schema === 'string');
        if (bodyParam) {
          validatorName = bodyParam.schema;
        }
      }
      // For OpenAPI 3, requestBody may be used instead of parameters
      if (!validatorName && op.requestBody && op.requestBody.content) {
        const content = op.requestBody.content;
        const firstType = Object.keys(content)[0];
        if (content[firstType] && content[firstType].schema && content[firstType].schema['$ref']) {
          // Extract schema name from $ref
          const ref = content[firstType].schema['$ref'];
          validatorName = ref.split('/').pop();
        }
      }
      endpoints.push({
        operationId: op.operationId,
        method,
        path,
        tags: op.tags,
        parameters: op.parameters,
        requestBody: op.requestBody,
        responses: op.responses,
        validatorName,
      });
    }
  }
  return endpoints;
}
