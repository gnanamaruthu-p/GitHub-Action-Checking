import { test, expect } from '@playwright/test';

test.describe('SauceDemo Login Examples', () => {

  // Test 1: Valid Login
  test('Valid Login', async ({ page }) => {
    // Navigate to the application
    await page.goto('https://www.saucedemo.com/');

    // Fill username and password
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');

    // Click Login button using getByRole
    await page.getByRole('button', { name: 'Login' }).click();

    // Assertions
    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.getByText('Products')).toBeVisible();
    await expect(page.locator('.title')).toHaveText('Products');
  });

  // Test 2: Invalid Password
  test('Invalid Password Login', async ({ page }) => {
    // Navigate to the application
    await page.goto('https://www.saucedemo.com/');

    // Use type() instead of fill()
    await page.locator('#user-name').type('standard_user');
    await page.locator('#password').type('wrong_password');

    // Click Login
    await page.getByRole('button', { name: 'Login' }).click();

    // Assertions
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(
      page.getByText(
        'Epic sadface: Username and password do not match any user in this service'
      )
    ).toBeVisible();

    await expect(page.locator('[data-test="error"]')).toHaveText(
      'Epic sadface: Username and password do not match any user in this service'
    );
  });

  // Test 3: Empty Login Validation
  test('Login Without Credentials', async ({ page }) => {
    // Navigate to the application
    await page.goto('https://www.saucedemo.com/');

    // Click Login without entering data
    await page.getByRole('button', { name: 'Login' }).click();

    // Assertions
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(
      page.getByText('Epic sadface: Username is required')
    ).toBeVisible();

    await expect(page.locator('[data-test="error"]')).toHaveText(
      'Epic sadface: Username is required'
    );
  });

});