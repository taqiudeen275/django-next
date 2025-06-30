#!/usr/bin/env node
import { Command } from 'commander';
import { initCommand } from './commands/init';
import { generateCommand } from './commands/generate';
import { printHeader, printError } from './cli-ui';

// Export types for external use
export type { DjangoNextConfig } from './types';

const program = new Command();

program
  .name('django-next')
  .description('CLI for @django-next/client SDK - Generate type-safe Django REST API clients')
  .version('1.1.0');

// Global options
program
  .option('-v, --verbose', 'Enable verbose logging')
  .option('--no-color', 'Disable colored output');

// Init command
program
  .command('init')
  .description('Initialize Django-Next configuration file')
  .option('-t, --typescript', 'Create TypeScript config (default)', true)
  .option('-j, --javascript', 'Create JavaScript config')
  .option('-f, --force', 'Overwrite existing configuration')
  .option('-s, --schema <url>', 'OpenAPI schema URL')
  .option('-o, --output <dir>', 'Output directory for generated files')
  .action((options) => {
    try {
      initCommand({
        typescript: !options.javascript,
        force: options.force,
        schema: options.schema,
        output: options.output,
      });
    } catch (error) {
      printError(`Init command failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      process.exit(1);
    }
  });

// Generate command
program
  .command('generate')
  .description('Generate SDK from OpenAPI schema')
  .option('-c, --config <path>', 'Path to configuration file')
  .option('-v, --verbose', 'Enable verbose logging')
  .action((options) => {
    try {
      generateCommand({
        config: options.config,
        verbose: options.verbose || program.opts().verbose,
      });
    } catch (error) {
      printError(`Generate command failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      process.exit(1);
    }
  });

// Help command
program
  .command('help')
  .description('Show help information')
  .action(() => {
    printHeader('Django-Next CLI Help');
    program.help();
  });

// Handle unknown commands
program.on('command:*', (operands) => {
  printError(`Unknown command: ${operands[0]}`);
  printError('Run `django-next help` for available commands');
  process.exit(1);
});

// Show help if no command provided
if (!process.argv.slice(2).length) {
  printHeader('Django-Next CLI');
  program.help();
}

program.parse(process.argv);
