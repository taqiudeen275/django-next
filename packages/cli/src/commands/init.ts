import fs from 'fs';
import path from 'path';
import { printHeader, printSuccess, printError, printInfo, printWarning } from '../cli-ui';
import { createLogger } from '../../lib/utils/logger';
import { DjangoNextConfig } from '../types';

const logger = createLogger('init-command');

export interface InitOptions {
  typescript?: boolean;
  force?: boolean;
  schema?: string;
  output?: string;
}

export function initCommand(options: InitOptions = {}) {
  printHeader('Django-Next CLI - Initialize Configuration');

  try {
    const useTypeScript = options.typescript ?? true; // Default to TypeScript
    const configFileName = useTypeScript ? 'django.config.ts' : 'django.config.js';
    const configPath = path.resolve(process.cwd(), configFileName);

    // Check if config already exists
    if (fs.existsSync(configPath) && !options.force) {
      printWarning(`${configFileName} already exists.`);
      printInfo('Use --force to overwrite the existing configuration.');
      return;
    }

    // Generate configuration content
    const content = generateConfigContent(useTypeScript, options);

    // Write configuration file
    fs.writeFileSync(configPath, content);

    printSuccess(`✅ Created ${configFileName}`);
    printInfo('📝 Configuration file created with default settings');
    printInfo('🔧 Edit the configuration to match your Django API setup');
    printInfo('🚀 Run `django-next generate` to create your SDK');

    // Create .gitignore entry if it doesn't exist
    createGitignoreEntry(options.output || './.django-next');

    logger.info(`Configuration initialized: ${configPath}`);

  } catch (err) {
    logger.error('Failed to initialize config', err);
    printError(`❌ Failed to initialize config: ${err instanceof Error ? err.message : String(err)}`);
    process.exit(1);
  }
}

function generateConfigContent(useTypeScript: boolean, options: InitOptions): string {
  const schemaUrl = options.schema || 'http://127.0.0.1:8000/api/schema/';
  const outputDir = options.output || './.django-next';

  if (useTypeScript) {
    return `// django.config.ts
// Configuration for Django-Next CLI
import type { DjangoNextConfig } from '@django-next/cli';

const config: DjangoNextConfig = {
  // URL to your OpenAPI schema (JSON or YAML)
  schema: "${schemaUrl}",

  // Directory where generated files will be placed
  output: "${outputDir}",

  // Base URL for your Django API (optional, used for server actions)
  baseUrl: "http://127.0.0.1:8000",

  // Authentication endpoints configuration (optional)
  auth: {
    loginUrl: "/api/auth/login/",
    logoutUrl: "/api/auth/logout/",
    userUrl: "/api/auth/me/",
    refreshUrl: "/api/auth/refresh/",
  },
};

export default config;
`;
  } else {
    return `// django.config.js
// Configuration for Django-Next CLI

module.exports = {
  // URL to your OpenAPI schema (JSON or YAML)
  schema: "${schemaUrl}",

  // Directory where generated files will be placed
  output: "${outputDir}",

  // Base URL for your Django API (optional, used for server actions)
  baseUrl: "http://127.0.0.1:8000",

  // Authentication endpoints configuration (optional)
  auth: {
    loginUrl: "/api/auth/login/",
    logoutUrl: "/api/auth/logout/",
    userUrl: "/api/auth/me/",
    refreshUrl: "/api/auth/refresh/",
  },
};
`;
  }
}

function createGitignoreEntry(outputDir: string): void {
  const gitignorePath = path.resolve(process.cwd(), '.gitignore');
  const gitignoreEntry = `\n# Django-Next generated SDK\n${outputDir}/\n`;

  try {
    if (fs.existsSync(gitignorePath)) {
      const content = fs.readFileSync(gitignorePath, 'utf8');

      // Check if entry already exists
      if (!content.includes(outputDir)) {
        fs.appendFileSync(gitignorePath, gitignoreEntry);
        printInfo(`📝 Added ${outputDir}/ to .gitignore`);
      }
    } else {
      // Create .gitignore if it doesn't exist
      fs.writeFileSync(gitignorePath, gitignoreEntry.trim());
      printInfo('📝 Created .gitignore with generated SDK entry');
    }
  } catch (error) {
    logger.warn('Could not update .gitignore', error);
    printWarning('Could not update .gitignore - you may want to add the output directory manually');
  }
}
