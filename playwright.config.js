const { defineConfig } = require('@playwright/test');
require('dotenv').config();

module.exports = defineConfig({
  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,
  testDir: './tests',
  timeout: 30000,
  fullyParallel: false,
  reporter: [['list'], ['html', { open: 'always' }], ['allure-playwright']],
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
