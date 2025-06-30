// Tests for CLI commands
import fs from 'fs';
import path from 'path';
import { initCommand } from '../commands/init';
import { generateCommand } from '../commands/generate';
import { testEnv, createMockSchema, mockFetch, restoreConsole } from './setup';

describe('CLI Commands', () => {
  let tempDir: string;
  let originalCwd: string;

  beforeEach(() => {
    tempDir = testEnv.createTempDir();
    originalCwd = process.cwd();
    process.chdir(tempDir);
  });

  afterEach(() => {
    process.chdir(originalCwd);
  });

  describe('initCommand', () => {
    it('should create TypeScript configuration by default', () => {
      initCommand();

      const configPath = path.join(tempDir, 'django.config.ts');
      expect(fs.existsSync(configPath)).toBe(true);

      const content = fs.readFileSync(configPath, 'utf8');
      expect(content).toContain('import type { DjangoNextConfig }');
      expect(content).toContain('export default config');
      expect(content).toContain('schema:');
      expect(content).toContain('output:');
    });

    it('should create JavaScript configuration when specified', () => {
      initCommand({ typescript: false });

      const configPath = path.join(tempDir, 'django.config.js');
      expect(fs.existsSync(configPath)).toBe(true);

      const content = fs.readFileSync(configPath, 'utf8');
      expect(content).toContain('module.exports');
      expect(content).toContain('schema:');
      expect(content).toContain('output:');
    });

    it('should use custom schema and output options', () => {
      const options = {
        schema: 'https://api.example.com/schema/',
        output: './custom-output',
      };

      initCommand(options);

      const configPath = path.join(tempDir, 'django.config.ts');
      const content = fs.readFileSync(configPath, 'utf8');

      expect(content).toContain('https://api.example.com/schema/');
      expect(content).toContain('./custom-output');
    });

    it('should not overwrite existing config without force flag', () => {
      // Create initial config
      initCommand();
      const configPath = path.join(tempDir, 'django.config.ts');
      const originalContent = fs.readFileSync(configPath, 'utf8');

      // Try to init again without force
      restoreConsole();
      const consoleSpy = jest.spyOn(console, 'log');
      
      initCommand();
      
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('already exists')
      );

      // Content should be unchanged
      const newContent = fs.readFileSync(configPath, 'utf8');
      expect(newContent).toBe(originalContent);
    });

    it('should overwrite existing config with force flag', () => {
      // Create initial config
      initCommand({ schema: 'http://old-url.com' });
      
      // Overwrite with force
      initCommand({ 
        force: true, 
        schema: 'http://new-url.com' 
      });

      const configPath = path.join(tempDir, 'django.config.ts');
      const content = fs.readFileSync(configPath, 'utf8');

      expect(content).toContain('http://new-url.com');
      expect(content).not.toContain('http://old-url.com');
    });

    it('should create .gitignore entry', () => {
      initCommand();

      const gitignorePath = path.join(tempDir, '.gitignore');
      expect(fs.existsSync(gitignorePath)).toBe(true);

      const content = fs.readFileSync(gitignorePath, 'utf8');
      expect(content).toContain('.django-next/');
    });

    it('should append to existing .gitignore', () => {
      // Create existing .gitignore
      const gitignorePath = path.join(tempDir, '.gitignore');
      fs.writeFileSync(gitignorePath, 'node_modules/\n*.log\n');

      initCommand();

      const content = fs.readFileSync(gitignorePath, 'utf8');
      expect(content).toContain('node_modules/');
      expect(content).toContain('*.log');
      expect(content).toContain('.django-next/');
    });
  });

  describe('generateCommand', () => {
    beforeEach(() => {
      // Create a config file for generate command
      initCommand();
      mockFetch(createMockSchema());
    });

    it('should generate SDK with default configuration', async () => {
      await generateCommand();

      const outputDir = path.join(tempDir, '.django-next');
      expect(fs.existsSync(outputDir)).toBe(true);

      const expectedFiles = [
        'types.ts',
        'api.ts',
        'hooks.ts',
        'actions.ts',
        'README.md',
      ];

      for (const file of expectedFiles) {
        expect(fs.existsSync(path.join(outputDir, file))).toBe(true);
      }
    });

    it('should use custom config file', async () => {
      // Create custom config
      const customConfigPath = path.join(tempDir, 'custom.config.ts');
      fs.writeFileSync(customConfigPath, `
        import type { DjangoNextConfig } from '@django-next/cli';
        
        const config: DjangoNextConfig = {
          schema: "http://localhost:8000/api/schema/",
          output: "./custom-output",
        };
        
        export default config;
      `);

      await generateCommand({ config: customConfigPath });

      const outputDir = path.join(tempDir, 'custom-output');
      expect(fs.existsSync(outputDir)).toBe(true);
      expect(fs.existsSync(path.join(outputDir, 'api.ts'))).toBe(true);
    });

    it('should handle missing configuration file', async () => {
      // Remove config file
      fs.unlinkSync(path.join(tempDir, 'django.config.ts'));

      await expect(generateCommand()).rejects.toThrow(
        expect.stringContaining('Could not find configuration file')
      );
    });

    it('should handle invalid schema URL', async () => {
      // Mock fetch to fail
      global.fetch = jest.fn(() =>
        Promise.reject(new Error('Network error'))
      ) as jest.Mock;

      await expect(generateCommand()).rejects.toThrow();
    });

    it('should enable verbose logging when requested', async () => {
      restoreConsole();
      const consoleSpy = jest.spyOn(console, 'log');

      await generateCommand({ verbose: true });

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Verbose mode enabled')
      );
    });
  });

  describe('Error handling', () => {
    it('should handle file system errors gracefully', () => {
      // Try to create config in a read-only directory (simulated)
      const readOnlyDir = path.join(tempDir, 'readonly');
      fs.mkdirSync(readOnlyDir);
      
      // This would need platform-specific implementation
      // For now, just ensure the function doesn't crash
      expect(() => {
        process.chdir(readOnlyDir);
        initCommand();
      }).not.toThrow();
    });

    it('should validate configuration parameters', async () => {
      // Create invalid config
      const configPath = path.join(tempDir, 'django.config.ts');
      fs.writeFileSync(configPath, `
        export default {
          // Missing required fields
          invalidField: true,
        };
      `);

      await expect(generateCommand()).rejects.toThrow();
    });
  });
});
