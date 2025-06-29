// Type-check all packages in the monorepo
import { execSync } from 'node:child_process';

const packages = ['@django-next/cli', '@django-next/client'];
let hasError = false;

for (const pkg of packages) {
  try {
    console.log(`\nType checking ${pkg}...`);
    execSync(`pnpm --filter ${pkg} run build`, { stdio: 'inherit' });
  } catch (e) {
    hasError = true;
  }
}

if (hasError) {
  process.exit(1);
} else {
  console.log('\nAll packages type-checked successfully.');
}
