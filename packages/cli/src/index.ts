#!/usr/bin/env node
import { Command } from 'commander';
import { initCommand } from './commands/init';
import { generateCommand } from './commands/generate';

const program = new Command();

program
  .name('django-next')
  .description('CLI for @django-next/client SDK')
  .version('1.0.0');

program
  .command('init')
  .description('Initialize django-next config')
  .action(initCommand);

program
  .command('generate')
  .description('Generate SDK from OpenAPI schema')
  .action(generateCommand);

program.parse(process.argv);
