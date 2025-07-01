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

import { cookies } from 'next/headers';
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
  // Cookie names for JWT tokens (should match Django settings)
  cookieNames?: {
    accessToken?: string;
    refreshToken?: string;
  };
  // Whether to require authentication (default: true)
  requireAuth?: boolean;
}

// Default configuration - can be overridden per action
const defaultConfig: ActionConfig = {
  revalidateTags: [],
  revalidatePaths: [],
  apiConfig: {
    baseURL: process.env.DJANGO_API_URL || 'http://localhost:8000',
  },
  cookieNames: {
    accessToken: process.env.JWT_COOKIE_NAME || 'access_token',
    refreshToken: process.env.JWT_REFRESH_COOKIE_NAME || 'refresh_token',
  },
  requireAuth: true, // All actions require user authentication by default
};

// Enhanced authentication result
interface AuthResult {
  token: string | null;
  isValid: boolean;
  isAuthenticated: boolean;
}

// Helper function to get user authentication token from HTTP-only cookies
async function getUserAuthToken(config?: ActionConfig): Promise<AuthResult> {
  const cookieStore = cookies();
  const cookieNames = { ...defaultConfig.cookieNames, ...config?.cookieNames };

  // Get user token from HTTP-only cookie
  const userToken = cookieStore.get(cookieNames.accessToken!)?.value;

  if (userToken) {
    // Validate token format (basic JWT structure check)
    if (userToken.split('.').length === 3) {
      return {
        token: userToken,
        isValid: true,
        isAuthenticated: true,
      };
    }
  }

  // No valid user authentication found
  return {
    token: null,
    isValid: false,
    isAuthenticated: false,
  };
}

// Helper function to create API client for server actions with user authentication
async function createServerApiClient(config?: ActionConfig['apiConfig'] & { authConfig?: ActionConfig }): Promise<{ client: ApiClient; authResult: AuthResult }> {
  const authResult = await getUserAuthToken(config?.authConfig);

  const headers: Record<string, string> = {
    ...config?.headers,
  };

  // Add authorization header if we have a valid user token
  if (authResult.isValid && authResult.token) {
    headers['Authorization'] = \`Bearer \${authResult.token}\`;
  }

  const client = new ApiClient({
    baseURL: config?.baseURL || defaultConfig.apiConfig?.baseURL,
    withCredentials: false, // Server-side doesn't need cookies for outgoing requests
    headers,
  });

  return { client, authResult };
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

/**
 * Check if the current user is authenticated by examining JWT cookies
 */
export async function isUserAuthenticated(): Promise<boolean> {
  const authResult = await getUserAuthToken();
  return authResult.isAuthenticated;
}

/**
 * Get current authentication context for debugging/logging
 */
export async function getAuthContext(): Promise<{
  isAuthenticated: boolean;
  hasValidToken: boolean;
  tokenPresent: boolean;
}> {
  const authResult = await getUserAuthToken();

  return {
    isAuthenticated: authResult.isAuthenticated,
    hasValidToken: authResult.isValid,
    tokenPresent: authResult.token !== null,
  };
}

/**
 * Execute a server action with enhanced error handling and authentication context
 */
export async function executeWithErrorHandling<T>(
  operation: () => Promise<T>,
  errorMessage: string = 'Server action failed'
): Promise<{ success: true; data: T } | { success: false; error: string; code?: string }> {
  try {
    const data = await operation();
    return { success: true, data };
  } catch (error) {
    console.error(errorMessage, error);

    if (error instanceof ServerActionError) {
      return {
        success: false,
        error: error.message,
        code: error.code
      };
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      code: 'UNKNOWN_ERROR'
    };
  }
}

/**
 * Create action configuration with sensible defaults
 */
export function createActionConfig(overrides: Partial<ActionConfig> = {}): ActionConfig {
  return {
    ...defaultConfig,
    ...overrides,
    apiConfig: {
      ...defaultConfig.apiConfig,
      ...overrides.apiConfig,
    },
    cookieNames: {
      ...defaultConfig.cookieNames,
      ...overrides.cookieNames,
    },
  };
}

/**
 * Create action configuration that requires user authentication
 */
export function createAuthRequiredConfig(overrides: Partial<ActionConfig> = {}): ActionConfig {
  return createActionConfig({
    ...overrides,
    requireAuth: true,
  });
}

/**
 * Create action configuration that allows anonymous access (no authentication required)
 * Use this only for public endpoints that don't require user authentication
 */
export function createPublicConfig(overrides: Partial<ActionConfig> = {}): ActionConfig {
  return createActionConfig({
    ...overrides,
    requireAuth: false,
  });
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
 * This action supports user-aware authentication by reading JWT tokens from HTTP-only cookies.
 * It will automatically use the authenticated user's token when available, falling back to
 * service token for system operations.
 *
 * @param params - Action parameters
 * @param config - Action configuration for revalidation and API settings
 * @returns Promise with the API response wrapped in success/error format
 */
export async function ${actionName}(
  params: ${paramsType},
  config: ActionConfig = {}
): Promise<{ success: true; data: ${responseType} } | { success: false; error: string; code?: string }> {
${validatorCheck}
  try {
    // Create API client with user authentication
    const { client: api, authResult } = await createServerApiClient({
      ...config.apiConfig,
      authConfig: config
    });

    // Check if authentication is required and user is authenticated
    const requireAuth = config.requireAuth ?? defaultConfig.requireAuth;
    if (requireAuth && !authResult.isAuthenticated) {
      return {
        success: false,
        error: 'Authentication required. Please log in to perform this action.',
        code: 'AUTH_REQUIRED'
      };
    }

    const response = await api.${operationId}(params);

    // Handle revalidation
    handleRevalidation(config, ['${tag}', '${operationId}']);

    // Log successful action with auth context
    console.log(\`[SERVER_ACTION] \${actionName} executed successfully with user authentication\`);

    return { success: true, data: response.data };
  } catch (error) {
    console.error(\`[SERVER_ACTION] \${actionName} failed:\`, error);

    // Handle authentication errors specifically
    if (error.response?.status === 401) {
      return {
        success: false,
        error: 'Authentication required. Please log in and try again.',
        code: 'AUTH_REQUIRED'
      };
    }

    if (error.response?.status === 403) {
      return {
        success: false,
        error: 'Permission denied. You do not have access to perform this action.',
        code: 'PERMISSION_DENIED'
      };
    }

    // Handle other API errors
    if (error instanceof Error) {
      return {
        success: false,
        error: \`Failed to execute ${operationId}: \${error.message}\`,
        code: 'API_ERROR'
      };
    }

    return {
      success: false,
      error: 'Unknown error occurred during ${operationId}',
      code: 'UNKNOWN_ERROR'
    };
  }
}`;
}
