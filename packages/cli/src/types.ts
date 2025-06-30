// types.ts: Type definitions for Django-Next CLI
export interface DjangoNextConfig {
  /** URL to your OpenAPI schema (JSON or YAML) */
  schema: string;
  
  /** Directory where generated files will be placed */
  output: string;
  
  /** Base URL for your Django API (optional, used for server actions) */
  baseUrl?: string;
  
  /** Authentication endpoints configuration (optional) */
  auth?: {
    loginUrl?: string;
    logoutUrl?: string;
    userUrl?: string;
    refreshUrl?: string;
  };
  
  /** Additional configuration options */
  options?: {
    /** Enable debug mode for verbose logging */
    debug?: boolean;
    
    /** Skip Prettier formatting */
    skipFormatting?: boolean;
    
    /** Custom headers for schema fetching */
    headers?: Record<string, string>;
    
    /** Timeout for schema fetching (in milliseconds) */
    timeout?: number;
  };
}

export interface ParsedEndpoint {
  operationId: string;
  method: 'get' | 'post' | 'put' | 'patch' | 'delete';
  path: string;
  tags?: string[];
  parameters?: any[];
  requestBody?: any;
  responses?: any;
  validatorName?: string;
  summary?: string;
  description?: string;
}

export interface GeneratorContext {
  config: DjangoNextConfig;
  schema: any;
  endpoints: ParsedEndpoint[];
  outputDir: string;
}

export interface GeneratorOptions {
  verbose?: boolean;
  skipValidation?: boolean;
  skipFormatting?: boolean;
}

// Re-export for external use
export type { DjangoNextConfig as Config };
