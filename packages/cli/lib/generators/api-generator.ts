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

export interface ApiClientConfig {
  baseURL?: string;
  timeout?: number;
  withCredentials?: boolean;
  headers?: Record<string, string>;
}

export class ApiClient {
  private axios: AxiosInstance;
  public _config: any; // For compatibility with @django-next/client

  constructor(config?: ApiClientConfig, axiosInstance?: AxiosInstance) {
    this.axios = axiosInstance || axios.create({
      baseURL: config?.baseURL || '',
      timeout: config?.timeout || 30000,
      withCredentials: config?.withCredentials ?? true,
      headers: {
        'Content-Type': 'application/json',
        ...config?.headers,
      },
    });

    // Set up _config for compatibility with @django-next/client
    this._config = {
      baseUrl: config?.baseURL || '',
      axiosInstance: this.axios,
    };
  }

  // Get the underlying axios instance for advanced configuration
  getAxiosInstance(): AxiosInstance {
    return this.axios;
  }

  // Update axios instance (used by DjangoNextProvider for configuration management)
  updateAxiosInstance(axiosInstance: AxiosInstance): void {
    this.axios = axiosInstance;
    this._config.axiosInstance = axiosInstance;
  }

  // Get the base URL (convenience method)
  getBaseURL(): string {
    return this._config.baseURL || '';
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
  
  // Generate parameter types based on HTTP method and available parameters
  let paramsType: string;
  if (method === 'get') {
    // For GET requests, use query parameters
    paramsType = `types.paths["${path}"]["${method}"] extends { parameters: infer P } ? P : undefined`;
  } else {
    // For POST/PUT/PATCH requests, combine path parameters and request body
    paramsType = `(types.paths["${path}"]["${method}"] extends { parameters: infer P } ? P : {}) &
                  (types.paths["${path}"]["${method}"] extends { requestBody: { content: { "application/json": infer B } } } ? B :
                   types.paths["${path}"]["${method}"] extends { requestBody: { content: { "multipart/form-data": infer B } } } ? B :
                   types.paths["${path}"]["${method}"] extends { requestBody: { content: { "application/x-www-form-urlencoded": infer B } } } ? B : {})`;
  }

  // Generate response types (try multiple status codes)
  const responseType = `types.paths["${path}"]["${method}"] extends { responses: { 200: { content: { "application/json": infer R } } } } ? R :
                        types.paths["${path}"]["${method}"] extends { responses: { 201: { content: { "application/json": infer R } } } } ? R : any`;
  
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


