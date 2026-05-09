import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,          // run all test files in parallel
  retries: process.env.CI ? 2 : 0, // retry on CI only
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',              // generates HTML report
  
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',     // capture trace on failure
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: true,
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] }},
    // { name: 'firefox',  use: { ...devices['Desktop Firefox']}},
    // { name: 'webkit',   use: { ...devices['Desktop Safari'] }},
  ],
});