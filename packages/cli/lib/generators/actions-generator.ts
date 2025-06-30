// actions-generator.ts: Generate Next.js Server Actions
import fs from 'fs';
import path from 'path';
import { createLogger } from '../utils/logger';

const logger = createLogger('actions-generator');

export async function generateActions(config: any, endpoints: any[]): Promise<void> {
  const mutationEndpoints = endpoints.filter(ep => ['post', 'put', 'patch', 'delete'].includes(ep.method));
  logger.info(`Generating Server Actions for ${mutationEndpoints.length} mutation endpoints`);
  
  const actionsOut = path.join(config.output, 'actions.ts');
  
  try {
    const content = generateActionsContent(mutationEndpoints);
    fs.writeFileSync(actionsOut, content);
    logger.info('Successfully generated actions.ts');
  } catch (error) {
    logger.error('Failed to generate actions.ts', error);
    throw error;
  }
}

function generateActionsContent(endpoints: any[]): string {
  const header = `// actions.ts - Generated Next.js Server Actions
// This file is auto-generated. Do not edit manually.
// Generated at: ${new Date().toISOString()}

'use server';

import { revalidateTag, revalidatePath } from 'next/cache';
import * as validators from './validators';
import * as types from './types';
import { ApiClient } from './api';

// Server action configuration
interface ActionConfig {
  revalidateTags?: string[];
  revalidatePaths?: string[];
  apiConfig?: {
    baseURL?: string;
    headers?: Record<string, string>;
  };
}

// Default configuration - can be overridden per action
const defaultConfig: ActionConfig = {
  revalidateTags: [],
  revalidatePaths: [],
  apiConfig: {
    baseURL: process.env.DJANGO_API_URL || 'http://localhost:8000',
  },
};

// Helper function to create API client for server actions
function createServerApiClient(config?: ActionConfig['apiConfig']): ApiClient {
  return new ApiClient({
    baseURL: config?.baseURL || defaultConfig.apiConfig?.baseURL,
    withCredentials: false, // Server-side doesn't use cookies
    headers: {
      'Authorization': \`Bearer \${process.env.DJANGO_API_TOKEN || ''}\`,
      ...config?.headers,
    },
  });
}

// Helper function to handle revalidation
function handleRevalidation(config: ActionConfig, defaultTags: string[] = []) {
  const tags = [...defaultTags, ...(config.revalidateTags || [])];
  const paths = config.revalidatePaths || [];
  
  tags.forEach(tag => revalidateTag(tag));
  paths.forEach(path => revalidatePath(path));
}

// Error handling for server actions
export class ServerActionError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string,
    public details?: any
  ) {
    super(message);
    this.name = 'ServerActionError';
  }
}

`;

  const actions = endpoints.map(generateAction).join('\n\n');
  
  const footer = `
// Utility functions for server actions
export async function executeWithErrorHandling<T>(
  operation: () => Promise<T>,
  errorMessage: string = 'Server action failed'
): Promise<{ success: true; data: T } | { success: false; error: string }> {
  try {
    const data = await operation();
    return { success: true, data };
  } catch (error) {
    console.error(errorMessage, error);
    
    if (error instanceof ServerActionError) {
      return { success: false, error: error.message };
    }
    
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
}

export function createActionConfig(overrides: Partial<ActionConfig> = {}): ActionConfig {
  return {
    ...defaultConfig,
    ...overrides,
    apiConfig: {
      ...defaultConfig.apiConfig,
      ...overrides.apiConfig,
    },
  };
}
`;

  return header + actions + footer;
}

function generateAction(endpoint: any): string {
  const { operationId, method, path, validatorName, tags } = endpoint;
  const actionName = `${operationId}Action`;
  const tag = tags?.[0] || 'default';
  
  const paramsType = `types.paths["${path}"]["${method}"] extends { parameters: infer P } ? P : undefined`;
  const responseType = `types.paths["${path}"]["${method}"] extends { responses: { 200: { content: infer R } } } ? R : any`;
  
  const validatorCheck = validatorName 
    ? `  // Validate parameters
  if (validators.schemas && validators.schemas.${validatorName}) {
    try {
      validators.validateOrThrow(validators.schemas.${validatorName}, params);
    } catch (error) {
      throw new ServerActionError(
        \`Validation failed: \${error instanceof Error ? error.message : 'Unknown validation error'}\`,
        400,
        'VALIDATION_ERROR',
        error
      );
    }
  }
`
    : '';

  return `/**
 * ${actionName} - Server action for ${operationId}
 * ${method.toUpperCase()} ${path}
 * 
 * @param params - Action parameters
 * @param config - Action configuration for revalidation and API settings
 * @returns Promise with the API response
 */
export async function ${actionName}(
  params: ${paramsType},
  config: ActionConfig = {}
): Promise<${responseType}> {
${validatorCheck}
  try {
    const api = createServerApiClient(config.apiConfig);
    const response = await api.${operationId}(params);
    
    // Handle revalidation
    handleRevalidation(config, ['${tag}', '${operationId}']);
    
    return response.data;
  } catch (error) {
    console.error('Server action ${actionName} failed:', error);
    
    if (error instanceof Error) {
      throw new ServerActionError(
        \`Failed to execute ${operationId}: \${error.message}\`,
        500,
        'API_ERROR',
        error
      );
    }
    
    throw new ServerActionError(
      'Unknown error occurred during ${operationId}',
      500,
      'UNKNOWN_ERROR'
    );
  }
}`;
}
