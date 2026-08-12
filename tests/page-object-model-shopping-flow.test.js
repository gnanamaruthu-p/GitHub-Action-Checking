const { test, expect } = require('@playwright/test');
const LoginPage = require('../Pages/LoginPage');
const InventoryPage = require('../Pages/InventaryPage');

test.describe('Shopping Flow', () => {
  let loginPage;
  let inventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('Add single product', async () => {
    await inventoryPage.addToCart(0);
    await expect.poll(async () => inventoryPage.getCartCount()).toBe(1);
  });

  test('Add multiple products', async () => {
    await inventoryPage.addToCart(0);
    await inventoryPage.addToCart(1);
    await inventoryPage.addToCart(2);

    await expect.poll(async () => inventoryPage.getCartCount()).toBe(3);
  });

  test('Remove product', async () => {
    await inventoryPage.addToCart(0);
    await inventoryPage.addToCart(1);

    await inventoryPage.removeFromCart(0);
    await expect.poll(async () => inventoryPage.getCartCount()).toBe(1);
  });
});

test.describe('Error Scenarios', () => {
  test('Invalid credentials @smoke', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('invalid_user', 'invalid_password');

    await expect(loginPage.errorMessage).toBeVisible();
  });

  test('Empty username', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('', 'secret_sauce');

    const errorMessage = await loginPage.getErrorMessage();
    await expect(errorMessage).toContain('Username is required');
  });

  test('Empty password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', '');

    const errorMessage = await loginPage.getErrorMessage();
    await expect(errorMessage).toContain('Password is required');
  });
});