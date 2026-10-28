import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'tests/e2e',
  timeout: 30_000,
  use: { baseURL: 'http://localhost:4410' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'npm run build && npx astro preview --port 4410 --ignore-lock',
    url: 'http://localhost:4410/',
    reuseExistingServer: false,
    timeout: 180_000,
  },
});
