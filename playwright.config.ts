import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  globalTimeout: 3_600_000,
  timeout: 180_000,
  expect: {
    timeout: 10_000,
  },
  reporter: process.env.CI ? 'github' : 'html',
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:5173',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
  webServer: [
    {
      command: 'npm run dev',
      port: 5173,
      reuseExistingServer: true,
      timeout: 120_000,
    },
    {
      command: 'npx -y @solid/community-server@latest -p 4000',
      port: 4000,
      reuseExistingServer: true,
      timeout: 120_000,
    },
  ],
  testDir: 'e2e',
})
