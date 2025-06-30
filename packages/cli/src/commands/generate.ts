import path from 'path';
import fs from 'fs';
import { generate } from '../../lib/generator';
import { printHeader, printSuccess, printError, printInfo } from '../cli-ui';
import { createLogger } from '../../lib/utils/logger';
import { DjangoNextConfig } from '../types';

const logger = createLogger('generate-command');

export async function generateCommand(options: { config?: string; verbose?: boolean } = {}) {
  printHeader('Django-Next CLI - Generate SDK');

  // Set log level based on verbose flag
  if (options.verbose) {
    logger.info('Verbose mode enabled');
  }

  try {
    // Load configuration
    const config = await loadConfig(options.config);

    // Validate configuration
    validateConfig(config);

    printInfo(`Generating SDK from: ${config.schema}`);
    printInfo(`Output directory: ${config.output}`);

    // Generate the SDK
    await generate(config);

    printSuccess('✅ SDK generation completed successfully!');
    printInfo(`📁 Generated files in: ${config.output}`);
    printInfo('📖 Check README.md for usage instructions');

  } catch (error) {
    logger.error('Generation failed', error);
    printError(`❌ Generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    process.exit(1);
  }
}

async function loadConfig(configPath?: string): Promise<DjangoNextConfig> {
  const defaultPaths = [
    'django.config.js',
    'django.config.ts',
    'django-next.config.js',
    'django-next.config.ts',
  ];

  const pathsToTry = configPath ? [configPath] : defaultPaths;

  for (const configFile of pathsToTry) {
    const fullPath = path.resolve(process.cwd(), configFile);

    if (fs.existsSync(fullPath)) {
      logger.info(`Loading config from: ${fullPath}`);

      try {
        // Handle both .js and .ts files
        if (fullPath.endsWith('.ts')) {
          // For TypeScript files, we need to compile them first
          const tsNode = await import('ts-node');
          tsNode.register({
            transpileOnly: true,
            compilerOptions: {
              module: 'commonjs',
            },
          });
        }

        const config = require(fullPath);
        return config.default || config;
      } catch (error) {
        logger.warn(`Failed to load config from ${fullPath}`, error);
        continue;
      }
    }
  }

  throw new Error(
    `Could not find configuration file. Tried: ${pathsToTry.join(', ')}\n` +
    'Run `django-next init` to create a configuration file.'
  );
}

function validateConfig(config: DjangoNextConfig): void {
  if (!config.schema) {
    throw new Error('Configuration missing required "schema" field');
  }

  if (!config.output) {
    throw new Error('Configuration missing required "output" field');
  }

  // Validate schema URL format
  try {
    new URL(config.schema);
  } catch {
    // If not a valid URL, check if it's a file path
    if (!fs.existsSync(config.schema)) {
      throw new Error(`Schema "${config.schema}" is not a valid URL or file path`);
    }
  }

  logger.info('Configuration validated successfully');
}
