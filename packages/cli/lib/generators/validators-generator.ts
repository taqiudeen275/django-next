// validators-generator.ts: Generate Zod validators from OpenAPI schema
import fs from 'fs';
import path from 'path';
import { createLogger } from '../utils/logger';

const logger = createLogger('validators-generator');

export async function generateValidators(config: any, schema: any): Promise<void> {
  logger.info('Generating Zod validators');

  const validatorsOut = path.join(config.output, 'validators.ts');

  try {
    // Generate our own validators structure that works with our API generator
    const content = generateValidatorsContent(schema);
    fs.writeFileSync(validatorsOut, content);

    logger.info('Successfully generated validators.ts');
  } catch (error) {
    logger.error('Failed to generate validators.ts', error);
    throw error;
  }
}

function generateValidatorsContent(schema: any): string {
  const header = `// validators.ts - Generated Zod validators from OpenAPI schema
// This file is auto-generated. Do not edit manually.
// Generated at: ${new Date().toISOString()}

import { z } from 'zod';

`;

  // Extract schemas from OpenAPI components
  const schemas = schema.components?.schemas || {};
  const schemaValidators = generateSchemaValidators(schemas);

  // Generate endpoint validators
  const endpointValidators = generateEndpointValidators(schema.paths || {});

  const utilities = generateUtilityValidators();

  const schemasExport = generateSchemasExport(schemas, schema.paths || {});

  return header + schemaValidators + endpointValidators + utilities + schemasExport;
}

function generateSchemaValidators(schemas: any): string {
  let result = '// Schema validators\n';

  // First pass: declare all validators to avoid forward reference issues
  for (const [name] of Object.entries(schemas)) {
    result += `export const ${name}Validator: z.ZodType<any> = z.lazy(() => z.object({\n`;
    result += generateObjectProperties(schemas[name] as any);
    result += '}));\n\n';
  }

  return result;
}

function generateObjectProperties(schema: any): string {
  if (!schema.properties) return '';

  let result = '';
  for (const [propName, propSchema] of Object.entries(schema.properties)) {
    const prop = propSchema as any;
    result += `  ${propName}: ${generateZodType(prop)},\n`;
  }

  return result;
}

function generateZodType(schema: any): string {
  if (schema.$ref) {
    // Reference to another schema
    const refName = schema.$ref.split('/').pop();
    return `${refName}Validator`;
  }

  switch (schema.type) {
    case 'string':
      let stringType = 'z.string()';
      if (schema.format === 'email') stringType += '.email()';
      if (schema.format === 'uri' || schema.format === 'url') stringType += '.url()';
      if (schema.format === 'date-time') stringType += '.datetime()';
      if (schema.maxLength) stringType += `.max(${schema.maxLength})`;
      if (schema.minLength) stringType += `.min(${schema.minLength})`;
      if (schema.enum) {
        return `z.enum([${schema.enum.map((v: string) => `"${v}"`).join(', ')}])`;
      }
      return stringType + (schema.nullable ? '.nullable()' : '') + (!schema.required ? '.optional()' : '');

    case 'number':
    case 'integer':
      let numberType = schema.type === 'integer' ? 'z.number().int()' : 'z.number()';
      if (schema.minimum !== undefined) numberType += `.min(${schema.minimum})`;
      if (schema.maximum !== undefined) numberType += `.max(${schema.maximum})`;
      return numberType + (schema.nullable ? '.nullable()' : '') + (!schema.required ? '.optional()' : '');

    case 'boolean':
      return 'z.boolean()' + (schema.nullable ? '.nullable()' : '') + (!schema.required ? '.optional()' : '');

    case 'array':
      const itemType = schema.items ? generateZodType(schema.items) : 'z.any()';
      return `z.array(${itemType})` + (schema.nullable ? '.nullable()' : '') + (!schema.required ? '.optional()' : '');

    case 'object':
      if (schema.properties) {
        return 'z.object({\n' + generateObjectProperties(schema) + '})' + (schema.nullable ? '.nullable()' : '') + (!schema.required ? '.optional()' : '');
      }
      return 'z.record(z.any())' + (schema.nullable ? '.nullable()' : '') + (!schema.required ? '.optional()' : '');

    default:
      return 'z.any()' + (schema.nullable ? '.nullable()' : '') + (!schema.required ? '.optional()' : '');
  }
}

function generateEndpointValidators(paths: any): string {
  let result = '// Endpoint validators\n';

  for (const [, pathObj] of Object.entries(paths)) {
    const path = pathObj as any;
    for (const [, operation] of Object.entries(path)) {
      const op = operation as any;
      if (typeof op !== 'object' || op === null || !op.operationId) continue;

      if (op.requestBody?.content?.['application/json']?.schema) {
        const schema = op.requestBody.content['application/json'].schema;
        result += `export const ${op.operationId}RequestValidator = z.object({\n`;
        result += generateObjectProperties(schema);
        result += '});\n\n';
      }
    }
  }

  return result;
}

function generateUtilityValidators(): string {
  return `
// Utility validators for common patterns
export const FileValidator = z.instanceof(File);

export const PaginationValidator = z.object({
  page: z.number().int().positive().optional(),
  page_size: z.number().int().positive().max(100).optional(),
  ordering: z.string().optional(),
  search: z.string().optional(),
});

export const IdValidator = z.union([
  z.string().uuid(),
  z.number().int().positive(),
]);

// File upload validator with progress tracking
export const FileUploadValidator = z.object({
  file: FileValidator,
  progress: z.number().min(0).max(100).optional(),
  isUploading: z.boolean().optional(),
});

// Generic response validators
export const ApiErrorValidator = z.object({
  message: z.string(),
  status: z.number().optional(),
  code: z.string().optional(),
  details: z.any().optional(),
});

export const PaginatedResponseValidator = <T extends z.ZodType>(itemValidator: T) =>
  z.object({
    count: z.number(),
    next: z.string().url().nullable(),
    previous: z.string().url().nullable(),
    results: z.array(itemValidator),
  });

// Validation helper functions
export function validateOrThrow<T>(validator: z.ZodType<T>, data: unknown): T {
  const result = validator.safeParse(data);
  if (!result.success) {
    throw new Error(\`Validation failed: \${result.error.message}\`);
  }
  return result.data;
}

export function validateSafely<T>(validator: z.ZodType<T>, data: unknown): { success: true; data: T } | { success: false; error: string } {
  const result = validator.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error.message };
}

`;
}

function generateSchemasExport(schemas: any, paths: any): string {
  let result = '// Schemas object for API client compatibility\nexport const schemas = {\n';

  // Add schema validators
  for (const schemaName of Object.keys(schemas)) {
    result += `  ${schemaName}: ${schemaName}Validator,\n`;
  }

  // Add endpoint validators
  for (const [, pathObj] of Object.entries(paths)) {
    const path = pathObj as any;
    for (const [, operation] of Object.entries(path)) {
      const op = operation as any;
      if (typeof op !== 'object' || op === null || !op.operationId) continue;

      if (op.requestBody?.content?.['application/json']?.schema) {
        result += `  ${op.operationId}Request: ${op.operationId}RequestValidator,\n`;
      }
    }
  }

  result += '};\n';
  return result;
}
