import { defineConfig, devices } from '@playwright/test'

// Stretch goal: `npx playwright install chromium`, then `npm run test:e2e`.
// Playwright starts the server and the client for you (see webServer below).
export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  use: { baseURL: 'http://localhost:5173', trace: 'retain-on-failure' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: [
    { command: 'npm run start -w server', url: 'http://localhost:8787/health', reuseExistingServer: true },
    { command: 'npm run dev -w client', url: 'http://localhost:5173', reuseExistingServer: true },
  ],
})
