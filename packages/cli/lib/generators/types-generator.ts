// types-generator.ts: Generate TypeScript types from OpenAPI schema
import fs from 'fs';
import path from 'path';
import openapiTS from 'openapi-typescript/dist/index.js';
import { createLogger } from '../utils/logger';

const logger = createLogger('types-generator');

export async function generateTypes(config: any, schema: any): Promise<void> {
  logger.info('Generating TypeScript types');
  
  const typesOut = path.join(config.output, 'types.ts');
  
  try {
    // Generate types using openapi-typescript
    const typesContent = await openapiTS(config.schema);
    
    // Add custom header and exports
    const enhancedContent = addTypeEnhancements(typesContent);
    
    fs.writeFileSync(typesOut, enhancedContent);
    logger.info('Successfully generated types.ts');
  } catch (error) {
    logger.error('Failed to generate types.ts', error);
    throw error;
  }
}

function addTypeEnhancements(content: string): string {
  const header = `// types.ts - Generated TypeScript types from OpenAPI schema
// This file is auto-generated. Do not edit manually.
// Generated at: ${new Date().toISOString()}

`;

  const footer = `
// Additional utility types for the SDK
export type ApiResponse<T> = {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
};

export type ApiError = {
  message: string;
  status?: number;
  code?: string;
  details?: any;
};

export type PaginatedResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type FileUpload = {
  file: File;
  progress?: number;
  isUploading?: boolean;
};

// Type guards for better type safety
export function isApiError(error: any): error is ApiError {
  return error && typeof error.message === 'string';
}

export function isPaginatedResponse<T>(response: any): response is PaginatedResponse<T> {
  return response && 
    typeof response.count === 'number' && 
    Array.isArray(response.results);
}
`;

  return header + content + footer;
}
