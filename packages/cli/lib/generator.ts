// generator.ts: Orchestrates code generation for the SDK
import { fetchSchema, parseSchema } from './parser';
import { generateTypes } from './generators/types-generator';
import { generateValidators } from './generators/validators-generator';
import { generateApiClass } from './generators/api-generator';
import { formatGeneratedFiles } from './formatters/prettier-formatter';
import { createLogger } from './utils/logger';
import fs from 'fs';
import path from 'path';
import { generateHooks } from './generators/hooks-generator';
import { generateDocumentation } from './generators/docs-generator';
import { generateActions } from './generators/actions-generator';

const logger = createLogger('generator');

export async function generate(config: any) {
  logger.info('Starting SDK generation', { schema: config.schema, output: config.output });

  try {
    // 1. Fetch and parse OpenAPI schema
    logger.info('Fetching and parsing OpenAPI schema');
    const schema = await fetchSchema(config.schema);
    const endpoints = parseSchema(schema);
    logger.info(`Parsed ${endpoints.length} endpoints from schema`);

    // 2. Ensure output directory exists
    fs.mkdirSync(config.output, { recursive: true });
    logger.info(`Created output directory: ${config.output}`);

    // 3. Generate all files
    await generateTypes(config, schema);
    await generateValidators(config, schema);
    await generateApiClass(config, endpoints);
    await generateHooks(config, endpoints);
    await generateActions(config, endpoints);
    await generateDocumentation(config, endpoints);

    // 4. Format all generated files
    await formatGeneratedFiles(config.output);

    logger.info('SDK generation completed successfully');
  } catch (error) {
    logger.error('SDK generation failed', error);
    throw error;
  }
}


