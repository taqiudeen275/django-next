import path from 'path';
import { generate } from '../../lib/generator';
import { printHeader, printSuccess, printError } from '../cli-ui';

export async function generateCommand() {
  printHeader('django-next CLI');
  // Load config from django.config.js in project root
  const configPath = path.resolve(process.cwd(), 'django.config.js');
  let config;
  try {
    config = require(configPath);
  } catch (e) {
    printError('Could not load django.config.js. Run `django-next init` first.');
    process.exit(1);
  }
  await generate(config);
  printSuccess('SDK generation complete.');
}
