import { defineConfig } from '@playwright/test';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '../..');
const authSqlitePath = path.join(repoRoot, 'tests', 'fonc', '.tmp', 'auth.e2e.sqlite');

export default defineConfig({
  testDir: './tests/specs',
  fullyParallel: false,
  workers: 1,
  timeout: 120_000,
  expect: {
    timeout: 10_000,
  },
  retries: process.env.CI ? 1 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://localhost:4200',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  webServer: [
    {
      command:
        'docker compose -f infra/docker-compose.yml up -d db && until docker exec theatre-db pg_isready -U dev -d theatre >/dev/null 2>&1; do sleep 2; done && cd apps/backend && mvn resources:resources liquibase:update && mvn spring-boot:run',
      cwd: repoRoot,
      url: 'http://localhost:8080/api/spectacles',
      timeout: 300_000,
      reuseExistingServer: process.env.FONC_REUSE_EXISTING === 'true',
    },
    {
      command: `mkdir -p tests/fonc/.tmp && JWT_SECRET=e2e-secret SQLITE_PATH="${authSqlitePath}" npm run start:dev --prefix services/auth-service`,
      cwd: repoRoot,
      url: 'http://localhost:3001/auth/profile',
      timeout: 120_000,
      reuseExistingServer: process.env.FONC_REUSE_EXISTING === 'true',
    },
    {
      command: 'npm run dev:web',
      cwd: repoRoot,
      url: 'http://localhost:4200',
      timeout: 120_000,
      reuseExistingServer: process.env.FONC_REUSE_EXISTING === 'true',
    },
  ],
});
