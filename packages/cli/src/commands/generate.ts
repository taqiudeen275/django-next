import path from 'path';
import { generate } from '../../lib/generator';

export async function generateCommand() {
  // Load config from django.config.js in project root
  const configPath = path.resolve(process.cwd(), 'django.config.js');
  let config;
  try {
    config = require(configPath);
  } catch (e) {
    console.error('Could not load django.config.js. Run `django-next init` first.');
    process.exit(1);
  }
  await generate(config);
  console.log('SDK generation complete.');
}
