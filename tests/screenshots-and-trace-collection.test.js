const { test, expect } = require('@playwright/test');
const LoginPage = require('../Pages/LoginPage');
const InventoryPage = require('../Pages/InventaryPage');


test('Login and take screenshots', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await page.screenshot({ path: 'Screenshots/screenshot1.png' });
    await loginPage.login('standard_user', 'secret_sauce');
    await page.screenshot({ path: 'Screenshots/screenshot2.png' });
    await page.screenshot({ path: 'Screenshots/screenshot3.png', fullPage: true });
});

test('Shopping with manual ScreenShot', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await page.screenshot({ path: 'Screenshots/screenshot4.png' });

    await inventoryPage.addToCart(2);
    await inventoryPage.addToCartButton();

    await page.screenshot({ path: 'Screenshots/screenshot5.png' });
});

test('With Trace', async ({ page }) => {  // Failing intendionaly
    const loginPage = new LoginPage(page);

    await page.context().tracing.start({ screenshots: true, snapshots: true });
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL('https://www.com/inventory.html');
    await page.context().tracing.stop({ path: 'trace.zip' });
});