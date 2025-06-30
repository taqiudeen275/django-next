// Tests for the main generator functionality
import fs from 'fs';
import path from 'path';
import { generate } from '../../lib/generator';
import { testEnv, createMockConfig, createMockSchema, mockFetch } from './setup';

describe('Generator', () => {
  let tempDir: string;
  let config: any;

  beforeEach(() => {
    tempDir = testEnv.createTempDir();
    config = createMockConfig({
      output: tempDir,
      schema: 'http://localhost:8000/api/schema/',
    });
    
    // Mock the schema fetch
    mockFetch(createMockSchema());
  });

  describe('generate()', () => {
    it('should generate all required files', async () => {
      await generate(config);

      // Check that all expected files are generated
      const expectedFiles = [
        'types.ts',
        'validators.ts',
        'api.ts',
        'hooks.ts',
        'actions.ts',
        'README.md',
        'api.md',
        'hooks.md',
        'actions.md',
        'TROUBLESHOOTING.md',
        'CHANGELOG.md',
      ];

      for (const file of expectedFiles) {
        const filePath = path.join(tempDir, file);
        expect(fs.existsSync(filePath)).toBe(true);
        
        // Check that files are not empty
        const content = fs.readFileSync(filePath, 'utf8');
        expect(content.length).toBeGreaterThan(0);
      }
    });

    it('should create output directory if it does not exist', async () => {
      const nonExistentDir = path.join(tempDir, 'nested', 'output');
      config.output = nonExistentDir;

      await generate(config);

      expect(fs.existsSync(nonExistentDir)).toBe(true);
    });

    it('should handle schema fetch errors gracefully', async () => {
      // Mock fetch to return an error
      global.fetch = jest.fn(() =>
        Promise.reject(new Error('Network error'))
      ) as jest.Mock;

      await expect(generate(config)).rejects.toThrow();
    });

    it('should generate valid TypeScript files', async () => {
      await generate(config);

      const typesFile = path.join(tempDir, 'types.ts');
      const apiFile = path.join(tempDir, 'api.ts');
      const hooksFile = path.join(tempDir, 'hooks.ts');

      // Check that generated files contain expected TypeScript constructs
      const typesContent = fs.readFileSync(typesFile, 'utf8');
      expect(typesContent).toContain('export');
      expect(typesContent).toContain('interface');

      const apiContent = fs.readFileSync(apiFile, 'utf8');
      expect(apiContent).toContain('export class ApiClient');
      expect(apiContent).toContain('async getPosts');
      expect(apiContent).toContain('async createPost');

      const hooksContent = fs.readFileSync(hooksFile, 'utf8');
      expect(hooksContent).toContain('export function useGetPosts');
      expect(hooksContent).toContain('export function useCreatePost');
    });

    it('should generate documentation with correct content', async () => {
      await generate(config);

      const readmeFile = path.join(tempDir, 'README.md');
      const readmeContent = fs.readFileSync(readmeFile, 'utf8');

      expect(readmeContent).toContain('# Django-Next Generated SDK');
      expect(readmeContent).toContain('## Overview');
      expect(readmeContent).toContain('## Quick Start');
      expect(readmeContent).toContain('Generated at:');
    });

    it('should handle custom base URL configuration', async () => {
      config.baseUrl = 'https://api.example.com';
      
      await generate(config);

      const actionsFile = path.join(tempDir, 'actions.ts');
      const actionsContent = fs.readFileSync(actionsFile, 'utf8');

      // Check that the base URL is used in server actions
      expect(actionsContent).toContain('https://api.example.com');
    });

    it('should generate valid Zod schemas', async () => {
      await generate(config);

      const validatorsFile = path.join(tempDir, 'validators.ts');
      const validatorsContent = fs.readFileSync(validatorsFile, 'utf8');

      expect(validatorsContent).toContain('import { z }');
      expect(validatorsContent).toContain('export');
      expect(validatorsContent).toContain('Validator');
    });
  });

  describe('Error handling', () => {
    it('should throw error for invalid schema URL', async () => {
      config.schema = 'invalid-url';
      
      await expect(generate(config)).rejects.toThrow();
    });

    it('should handle permission errors when creating output directory', async () => {
      // This test would need to be run with specific permissions
      // For now, we'll just ensure the error is properly propagated
      config.output = '/root/forbidden';
      
      await expect(generate(config)).rejects.toThrow();
    });
  });
});

describe('Integration tests', () => {
  it('should work with real Django schema format', async () => {
    const tempDir = testEnv.createTempDir();
    const config = createMockConfig({ output: tempDir });

    // Mock a more realistic Django REST Framework schema
    const djangoSchema = {
      openapi: '3.0.2',
      info: {
        title: 'Django API',
        version: '1.0.0',
      },
      paths: {
        '/api/users/': {
          get: {
            operationId: 'api_users_list',
            tags: ['api'],
            parameters: [
              {
                name: 'page',
                in: 'query',
                schema: { type: 'integer' },
              },
            ],
            responses: {
              '200': {
                description: '',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        count: { type: 'integer' },
                        results: {
                          type: 'array',
                          items: { $ref: '#/components/schemas/User' },
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
      components: {
        schemas: {
          User: {
            type: 'object',
            properties: {
              id: { type: 'integer' },
              username: { type: 'string' },
              email: { type: 'string', format: 'email' },
            },
            required: ['username', 'email'],
          },
        },
      },
    };

    mockFetch(djangoSchema);

    await generate(config);

    // Verify that the generated code handles Django-specific patterns
    const apiFile = path.join(tempDir, 'api.ts');
    const apiContent = fs.readFileSync(apiFile, 'utf8');

    expect(apiContent).toContain('api_users_list');
    expect(fs.existsSync(path.join(tempDir, 'types.ts'))).toBe(true);
  });
});
