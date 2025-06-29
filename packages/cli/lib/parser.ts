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
        // Support multiple content types and fallback
        const content = op.requestBody.content;
        const contentTypes = Object.keys(content);
        let found = false;
        for (const type of contentTypes) {
          if (content[type] && content[type].schema && content[type].schema['$ref']) {
            const ref = content[type].schema['$ref'];
            validatorName = ref.split('/').pop();
            found = true;
            break;
          }
        }
        if (!found && contentTypes.length > 0) {
          // fallback: use first content type's schema name if available
          const firstType = contentTypes[0];
          if (content[firstType] && content[firstType].schema && content[firstType].schema.title) {
            validatorName = content[firstType].schema.title;
          }
        }
      }
      // Fallback for missing operationId
      let operationId = op.operationId;
      if (!operationId) {
        operationId = `${method}_${path.replace(/[\/{\}]/g, '_')}`.replace(/_+/g, '_');
      }
      endpoints.push({
        operationId,
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
