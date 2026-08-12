const { test, expect } = require('@playwright/test');

const LoginPage = require('../Pages/LoginPage');
const InventoryPage = require('../Pages/InventaryPage');

test.describe('Login Functionality', () => {

    test('Login on staging environment', async ({ page }) => {

        const loginPage = new LoginPage(page);
        await page.goto('/');
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');




    });

    test('Login on production environment', async ({ page }) => {

        const loginPage = new LoginPage(page);
        await page.goto('/');
        await loginPage.login('standard_user', 'secret_sauce');
        const cartPage = new InventoryPage(page);
        await cartPage.addToCart(2);
        const cartCount = await cartPage.getCartCount();
        expect(cartCount).toBe(1);








    });

});