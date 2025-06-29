import fs from 'fs';
import path from 'path';

export function initCommand() {
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
    console.log('django.config.ts already exists.');
    return;
  }
  fs.writeFileSync(configPath, content);
  console.log('Created django.config.ts');
}
