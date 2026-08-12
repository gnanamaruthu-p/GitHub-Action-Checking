const { defineConfig } = require('@playwright/test');
require('dotenv').config();

module.exports = defineConfig({
  // Retry failed tests in CI to reduce flakiness, while keeping local runs fast with no retries.
  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 4 : undefined,
  testDir: './tests',
  timeout: 30000,
  fullyParallel: false,
  reporter: [
    ['html'],
    ['allure-playwright', {
      outputFolder: 'allure-results',
      detail: true,
      suiteTitle: true
    }]
  ],
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    baseURL: process.env.BASE_URL || 'https://www.saucedemo.com',
    trace: 'on-first-retry'

  },
});
