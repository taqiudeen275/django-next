// api-generator.ts: Generate type-safe API client class
import fs from 'fs';
import path from 'path';
import { createLogger } from '../utils/logger';

const logger = createLogger('api-generator');

export async function generateApiClass(config: any, endpoints: any[]): Promise<void> {
  logger.info(`Generating API client class with ${endpoints.length} endpoints`);

  const apiOut = path.join(config.output, 'api.ts');

  try {
    const content = generateApiContent(config, endpoints);
    fs.writeFileSync(apiOut, content);
    logger.info('Successfully generated api.ts');
  } catch (error) {
    logger.error('Failed to generate api.ts', error);
    throw error;
  }
}

function generateApiContent(config: any, endpoints: any[]): string {
  const header = `// api.ts - Generated API client class
// This file is auto-generated. Do not edit manually.
// Generated at: ${new Date().toISOString()}

import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';
import * as validators from './validators';
import * as types from './types';

export interface DjangoAuthConfig {
  loginUrl?: string;
  logoutUrl?: string;
  userUrl?: string;
  refreshUrl?: string;
}

export interface ApiClientConfig {
  baseURL?: string;
  timeout?: number;
  withCredentials?: boolean;
  headers?: Record<string, string>;
  auth?: DjangoAuthConfig;
}

export class ApiClient {
  private axios: AxiosInstance;
  private config: ApiClientConfig;

  constructor(config?: ApiClientConfig, axiosInstance?: AxiosInstance) {
    // Merge provided config with defaults including Django auth URLs from django.config.js
    this.config = {
      auth: {
        loginUrl: '${config.auth?.loginUrl || '/api/auth/login/'}',
        logoutUrl: '${config.auth?.logoutUrl || '/api/auth/logout/'}',
        userUrl: '${config.auth?.userUrl || '/api/auth/me/'}',
        refreshUrl: '${config.auth?.refreshUrl || '/api/auth/refresh/'}',
      },
      ...config,
      auth: {
        loginUrl: '${config.auth?.loginUrl || '/api/auth/login/'}',
        logoutUrl: '${config.auth?.logoutUrl || '/api/auth/logout/'}',
        userUrl: '${config.auth?.userUrl || '/api/auth/me/'}',
        refreshUrl: '${config.auth?.refreshUrl || '/api/auth/refresh/'}',
        ...config?.auth,
      },
    };

    this.axios = axiosInstance || axios.create({
      baseURL: config?.baseURL || '',
      timeout: config?.timeout || 30000,
      withCredentials: config?.withCredentials ?? true,
      headers: {
        'Content-Type': 'application/json',
        ...config?.headers,
      },
    });
  }

  // Get the underlying axios instance for advanced configuration
  getAxiosInstance(): AxiosInstance {
    return this.axios;
  }

  // Get the client configuration (for auth provider and other integrations)
  getConfig(): ApiClientConfig {
    return this.config;
  }

  // Get the base URL (convenience method)
  getBaseURL(): string {
    return this.config.baseURL || '';
  }

  // Helper method for file uploads with progress tracking
  private async uploadWithProgress<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig & { onUploadProgress?: (progress: number) => void }
  ): Promise<AxiosResponse<T>> {
    const formData = new FormData();

    // Convert data to FormData if it contains files
    for (const [key, value] of Object.entries(data)) {
      if (value instanceof File) {
        formData.append(key, value);
      } else if (value instanceof FileList) {
        // Handle multiple files
        Array.from(value).forEach((file, index) => {
          formData.append(key + '[' + index + ']', file);
        });
      } else if (Array.isArray(value)) {
        // Handle arrays (including file arrays)
        value.forEach((item, index) => {
          if (item instanceof File) {
            formData.append(key + '[' + index + ']', item);
          } else {
            formData.append(key + '[' + index + ']', typeof item === 'object' ? JSON.stringify(item) : String(item));
          }
        });
      } else if (value !== undefined && value !== null) {
        formData.append(key, typeof value === 'object' ? JSON.stringify(value) : String(value));
      }
    }

    return this.axios.post(url, formData, {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...config?.headers,
      },
      onUploadProgress: (progressEvent) => {
        if (config?.onUploadProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          config.onUploadProgress(progress);
        }
      },
    });
  }

  // Helper method to check if payload contains files
  private containsFiles(data: any): boolean {
    if (!data || typeof data !== 'object') return false;

    return Object.values(data).some(value => {
      if (value instanceof File || value instanceof FileList) {
        return true;
      }
      if (Array.isArray(value)) {
        return value.some(item => item instanceof File);
      }
      return false;
    });
  }

`;

  const methods = endpoints.map(generateEndpointMethod).join('\n\n');
  
  const footer = `
}

export default ApiClient;
`;

  return header + methods + footer;
}

function generateEndpointMethod(endpoint: any): string {
  const { operationId, method, path, validatorName } = endpoint;
  
  // Generate parameter types
  const paramsType = `types.paths["${path}"]["${method}"] extends { parameters: infer P } ? P : undefined`;
  const responseType = `types.paths["${path}"]["${method}"] extends { responses: { 200: { content: infer R } } } ? R : any`;
  
  // Generate validation check
  const validatorCheck = validatorName 
    ? `    // Validate parameters if validator is available
    if (validators.schemas && validators.schemas.${validatorName}) {
      validators.validateOrThrow(validators.schemas.${validatorName}, params);
    }
`
    : '';

  if (method === 'get') {
    return `  /**
   * ${operationId} - GET ${path}
   * Generated from OpenAPI operation: ${operationId}
   */
  async ${operationId}(
    params?: ${paramsType},
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<${responseType}>> {
${validatorCheck}    const safeParams = params ?? {};
    return this.axios.get('${path}', { 
      params: safeParams,
      ...config 
    });
  }`;
  } else if (method === 'delete') {
    return `  /**
   * ${operationId} - DELETE ${path}
   * Generated from OpenAPI operation: ${operationId}
   */
  async ${operationId}(
    params?: ${paramsType},
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<${responseType}>> {
${validatorCheck}    const safeParams = params ?? {};

    // For DELETE requests, send params as query parameters, not body
    return this.axios.delete('${path}', {
      params: safeParams,
      ...config
    });
  }`;
  } else {
    return `  /**
   * ${operationId} - ${method.toUpperCase()} ${path}
   * Generated from OpenAPI operation: ${operationId}
   */
  async ${operationId}(
    params?: ${paramsType},
    config?: AxiosRequestConfig & { onUploadProgress?: (progress: number) => void }
  ): Promise<AxiosResponse<${responseType}>> {
${validatorCheck}    const safeParams = params ?? {};

    // Handle file uploads with progress tracking
    if (this.containsFiles(safeParams)) {
      return this.uploadWithProgress('${path}', safeParams, config);
    }

    return this.axios.${method}('${path}', safeParams, config);
  }`;
  }
}


