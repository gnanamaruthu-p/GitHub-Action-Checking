import { test, expect } from '@playwright/test';

// ======================================================
// Test Data
// ======================================================

const users = [
  {
    username: 'standard_user',
    password: 'secret_sauce'
  },
  {
    username: 'locked_out_user',
    password: 'secret_sauce'
  }
];

// =========
// 
//=============================================
// Test 1 - Login Page Validation & Advanced Assertions
// ======================================================

test('Login Page Validation', async ({ page }) => {

  await page.goto('https://www.saucedemo.com/');

  // URL Assertion
  await expect(page).toHaveURL(/.*saucedemo\.com/);

  // getByRole
  const username = page.getByRole('textbox', { name: 'Username' });
  const password = page.getByRole('textbox', { name: 'Password' });
  const loginButton = page.getByRole('button', { name: 'Login' });

  // CSS Locator
  const logo = page.locator('.login_logo');

  // Text Locator
  const acceptedUsers = page.getByText('Accepted usernames are:');

  // Assertions
  await expect(username).toBeVisible();
  await expect(password).toBeVisible();
  await expect(loginButton).toBeEnabled();

  await expect(logo).toContainText('Swag Labs');

  await expect(username).toHaveAttribute(
    'placeholder',
    'Username'
  );

  await expect(acceptedUsers).toContainText(
    'Accepted usernames'
  );

});

// ======================================================
// Test 2 - Multiple Elements + Looping + Count
// ======================================================

test('Inventory Validation', async ({ page }) => {

  await page.goto('https://www.saucedemo.com/');

  await page.getByPlaceholder('Username')
    .fill(users[0].username);

  await page.getByPlaceholder('Password')
    .fill(users[0].password);

  await page.getByRole('button', {
    name: 'Login'
  }).click();

  await expect(page).toHaveURL(/inventory/);

  // CSS Locator
  const inventoryItems = page.locator('.inventory_item');

  // Count Assertion
  await expect(inventoryItems).toHaveCount(6);

  const totalItems = await inventoryItems.count();

  for (let i = 0; i < totalItems; i++) {

    const item = inventoryItems.nth(i);

    const itemName = await item
      .locator('.inventory_item_name')
      .textContent();

    console.log(`Item ${i + 1}: ${itemName}`);

    await expect(item).toBeVisible();

  }

});

// ======================================================
// Test 3 - Error Handling + Validation + Cleanup
// ======================================================

test('Locked User Validation', async ({ page }) => {

  await page.goto('https://www.saucedemo.com/');

  try {

    await page.getByPlaceholder('Username')
      .fill(users[1].username);

    await page.getByPlaceholder('Password')
      .fill(users[1].password);

    await page.getByRole('button', {
      name: 'Login'
    }).click();

    // Error Message
    const errorMessage = page.locator('[data-test="error"]');

    await expect(errorMessage).toBeVisible();

    await expect(errorMessage).toContainText(
      'Sorry, this user has been locked out.'
    );

  } catch (error) {

    console.log('Test Failed');
    console.log(error.message);

    throw error;

  } finally {

    // Cleanup

    await page.evaluate(() => {

      localStorage.clear();
      sessionStorage.clear();

    });

    await page.context().clearCookies();

    console.log('Cleanup Completed');

  }

});