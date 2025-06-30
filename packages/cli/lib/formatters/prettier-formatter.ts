// prettier-formatter.ts: Format generated files with Prettier
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { createLogger } from '../utils/logger';

const logger = createLogger('prettier-formatter');

export async function formatGeneratedFiles(outputDir: string): Promise<void> {
  logger.info('Formatting generated files with Prettier');
  
  const filesToFormat = [
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

  try {
    // Try programmatic approach first
    await formatProgrammatically(outputDir, filesToFormat);
    logger.info('Successfully formatted files with Prettier (programmatic)');
  } catch (error) {
    logger.warn('Programmatic formatting failed, trying CLI fallback', error);
    
    try {
      // Fallback to CLI approach
      await formatWithCLI(outputDir);
      logger.info('Successfully formatted files with Prettier (CLI)');
    } catch (cliError) {
      logger.warn('Prettier formatting failed completely', cliError);
      // Don't throw - formatting is nice to have but not critical
    }
  }
}

async function formatProgrammatically(outputDir: string, filesToFormat: string[]): Promise<void> {
  try {
    // Dynamic import to handle potential missing prettier
    const prettier = await import('prettier');
    
    // Resolve prettier config
    const prettierConfig = await prettier.resolveConfig(outputDir) || getDefaultPrettierConfig();
    
    for (const fileName of filesToFormat) {
      const filePath = path.join(outputDir, fileName);
      
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        
        try {
          const formatted = await prettier.format(content, {
            ...prettierConfig,
            filepath: filePath,
          });
          
          fs.writeFileSync(filePath, formatted);
          logger.debug(`Formatted ${fileName}`);
        } catch (fileError) {
          logger.warn(`Failed to format ${fileName}`, fileError);
          // Continue with other files
        }
      }
    }
  } catch (error) {
    throw new Error(`Programmatic formatting failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

async function formatWithCLI(outputDir: string): Promise<void> {
  try {
    // Check if prettier is available
    execSync('npx prettier --version', { stdio: 'pipe' });
    
    // Format all TypeScript and Markdown files
    const command = `npx prettier --write "${outputDir}/*.{ts,md}"`;
    execSync(command, { stdio: 'pipe' });
  } catch (error) {
    throw new Error(`CLI formatting failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

function getDefaultPrettierConfig() {
  return {
    semi: true,
    trailingComma: 'es5' as const,
    singleQuote: true,
    printWidth: 100,
    tabWidth: 2,
    useTabs: false,
    bracketSpacing: true,
    arrowParens: 'avoid' as const,
    endOfLine: 'lf' as const,
    parser: undefined, // Let prettier auto-detect
  };
}

// Utility function to check if prettier is available
export function isPrettierAvailable(): boolean {
  try {
    execSync('npx prettier --version', { stdio: 'pipe' });
    return true;
  } catch {
    return false;
  }
}

// Utility function to validate prettier config
export async function validatePrettierConfig(configPath?: string): Promise<boolean> {
  try {
    const prettier = await import('prettier');
    const config = await prettier.resolveConfig(configPath || process.cwd());
    return config !== null;
  } catch {
    return false;
  }
}
