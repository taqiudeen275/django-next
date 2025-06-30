// Test setup for Django-Next CLI
import fs from 'fs';
import path from 'path';
import { tmpdir } from 'os';

// Global test configuration
global.console = {
  ...console,
  // Suppress console output during tests unless explicitly needed
  log: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

// Test utilities
export const TEST_TIMEOUT = 30000;

export function createTempDir(): string {
  const tempDir = fs.mkdtempSync(path.join(tmpdir(), 'django-next-test-'));
  return tempDir;
}

export function cleanupTempDir(dir: string): void {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

export function createMockSchema() {
  return {
    openapi: '3.0.0',
    info: {
      title: 'Test API',
      version: '1.0.0',
    },
    paths: {
      '/api/posts/': {
        get: {
          operationId: 'getPosts',
          tags: ['posts'],
          responses: {
            '200': {
              description: 'Success',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      results: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            id: { type: 'integer' },
                            title: { type: 'string' },
                            content: { type: 'string' },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        post: {
          operationId: 'createPost',
          tags: ['posts'],
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    title: { type: 'string' },
                    content: { type: 'string' },
                  },
                  required: ['title', 'content'],
                },
              },
            },
          },
          responses: {
            '201': {
              description: 'Created',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer' },
                      title: { type: 'string' },
                      content: { type: 'string' },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  };
}

export function createMockConfig(overrides: any = {}) {
  return {
    schema: 'http://localhost:8000/api/schema/',
    output: './.django-next',
    baseUrl: 'http://localhost:8000',
    auth: {
      loginUrl: '/api/auth/login/',
      logoutUrl: '/api/auth/logout/',
      userUrl: '/api/auth/me/',
      refreshUrl: '/api/auth/refresh/',
    },
    ...overrides,
  };
}

// Mock fetch for schema fetching tests
export function mockFetch(schema: any) {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(schema),
    })
  ) as jest.Mock;
}

// Restore original console for specific tests
export function restoreConsole() {
  global.console = {
    ...global.console,
    log: console.log,
    info: console.info,
    warn: console.warn,
    error: console.error,
  };
}

// Setup and teardown helpers
export class TestEnvironment {
  private tempDirs: string[] = [];

  createTempDir(): string {
    const dir = createTempDir();
    this.tempDirs.push(dir);
    return dir;
  }

  cleanup(): void {
    this.tempDirs.forEach(dir => cleanupTempDir(dir));
    this.tempDirs = [];
  }
}

// Global test environment
let testEnv: TestEnvironment;

beforeEach(() => {
  testEnv = new TestEnvironment();
});

afterEach(() => {
  testEnv?.cleanup();
  jest.clearAllMocks();
});

export { testEnv };
