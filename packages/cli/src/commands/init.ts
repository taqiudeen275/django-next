import fs from 'fs';
import path from 'path';

export function initCommand() {
  const configPath = path.resolve(process.cwd(), 'django.config.ts');
  const content = `import type { DjangoNextConfig } from '@django-next/cli';
const config: DjangoNextConfig = {
  schema: "http://127.0.0.1:8000/api/schema/",
  output: "./.django-next",
};
export default config;
`;
  if (fs.existsSync(configPath)) {
    console.log('django.config.ts already exists.');
    return;
  }
  fs.writeFileSync(configPath, content);
  console.log('Created django.config.ts');
}
