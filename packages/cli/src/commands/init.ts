import fs from 'fs';
import path from 'path';
import { printHeader, printSuccess, printError, printInfo } from '../cli-ui';

export function initCommand() {
  printHeader('django-next CLI');
  try {
    const configPath = path.resolve(process.cwd(), 'django.config.js');
    const content = `
module.exports  = {
  schema: "http://127.0.0.1:8000/api/schema/",
  output: "./.django-next",
  auth: {
    loginUrl: "/api/auth/login/",
    logoutUrl: "/api/auth/logout/",
    userUrl: "/api/auth/me/",
    refreshUrl: "/api/auth/refresh/",
  },
};
`;
    if (fs.existsSync(configPath)) {
      printInfo('django.config.ts already exists.');
      return;
    }
    fs.writeFileSync(configPath, content);
    printSuccess('Created django.config.ts');
  } catch (err) {
    printError('Failed to initialize config: ' + (err instanceof Error ? err.message : String(err)));
    process.exit(1);
  }
}
