
1️⃣ What is Playwright?
Playwright is a browser automation library. It:

Opens real browsers (Chrome, Firefox, Safari)
Clicks buttons, fills forms, navigates pages
Takes screenshots, records videos
Runs tests in parallel across multiple browsers
This is what SDETs use daily.


const {test , expect } = require ('@playwright/test');

test('login Test, async ({pahe})=> { 

// page object = yourinterface to the browser

await page.goto('https://saucedemo.com');
  await page.fill('#username', 'standard_user');
  await page.click('#login-button');
  await expect(page).toHaveURL('/inventory.html');
 
});

2️⃣ Playwright Test File Structure 

// day8.js
const { test, expect } = require('@playwright/test');

// test() = define a test
// async ({ page }) = page object represents the browser
test('My First Test', async ({ page }) => {
  
  // Navigate to URL
  await page.goto('https://saucedemo.com');
  
  // Take screenshot
  await page.screenshot({ path: 'screenshot.png' });
  
  // Assert page title
  await expect(page).toHaveTitle('Swag Labs');
});


3️⃣ Running Playwright Tests

# Run all tests
npx playwright test

# Run specific file
npx playwright test day8.js

# Run in headed mode (see browser)
npx playwright test --headed

# Run with debug
npx playwright test --debug


4️⃣ Locators — How to Find Elements

// Different ways to find elements
await page.getByRole('button', { name: 'Submit' });      // Best - semantic
await page.getByText('Click me');                        // By visible text
await page.getByPlaceholder('Enter email');              // By placeholder
await page.getByLabel('Username');                       // By label
await page.locator('#username');                         // CSS selector
await page.locator('xpath=//button[text()="Login"]');    // XPath

5️⃣ Basic Actions

// Navigate
await page.goto('https://saucedemo.com');

// Fill input
await page.fill('#username', 'standard_user');

// Click button
await page.click('#login-button');

// Type (slower, more human-like)
await page.type('#password', 'secret_sauce');

// Press key
await page.press('#search', 'Enter');

// Hover
await page.hover('.menu');

// Drag and drop
await page.dragAndDrop('#drag-source', '#drop-target');


6️⃣ Assertions — Verify Behavior

// URL assertion
await expect(page).toHaveURL('https://saucedemo.com/inventory.html');

// Text assertion
await expect(page.locator('h1')).toHaveText('Products');

// Visibility assertion
await expect(page.locator('.success-message')).toBeVisible();

// Element count
await expect(page.locator('.product')).toHaveCount(6);

// Attribute assertion
await expect(page.locator('#submit')).toHaveAttribute('disabled', 'true');

7️⃣ Real SDET Example — Login Test

const { test, expect } = require('@playwright/test');

test('Valid Login', async ({ page }) => {
  // Navigate
  await page.goto('https://saucedemo.com');
  
  // Fill form
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  
  // Click login
  await page.click('#login-button');
  
  // Assert success
  await expect(page).toHaveURL('https://saucedemo.com/inventory.html');
  await expect(page.locator('.inventory_list')).toBeVisible();
});


| HTML     | Role     |
| -------- | -------- |
| button   | button   |
| input    | textbox  |
| checkbox | checkbox |
| radio    | radio    |
| link     | link     |
| select   | combobox |
| textarea | textbox  |


css locator 

1. .login-buton
2. #username 
3. [type="submit"]
4. [xpath=//button]