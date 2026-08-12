const { test, expect } = require('@playwright/test');

const LoginPage = require('../Pages/LoginPage');

const InventoryPage = require('../Pages/InventaryPage');

const CartPage = require('../Pages/Cartpage');





test.describe('Complete Shopping Flow', () => {

    test.beforeEach(async ({ page }) => {

        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    });

    test('"Browse products" @smoke', async ({ page }) => {

        const inventoryPage = new InventoryPage(page);

        const count = await inventoryPage.getProductCount();

        expect(count).toBe(6);

        const firstProductName = await inventoryPage.getProductName(0);

        expect(firstProductName).toBe('Sauce Labs Backpack');

    });


    test('"Add multiple items" @regression', async ({ page }) => {

        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);

        await inventoryPage.addToCartButton(0);
        await inventoryPage.addToCartButton(1);
        await inventoryPage.addToCartButton(2);

        const cartCount = await inventoryPage.getCartCount();
        expect(cartCount).toBe(3);

        await page.locator('.shopping_cart_link').click();
        await expect(page).toHaveURL(/cart.html/);

        const cartItemCount = await cartPage.getCartItemCount();
        expect(cartItemCount).toBe(3);


    });


    test('"Completed Purchase" @critical', async ({ page }) => {

        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);
        await inventoryPage.addToCartButton(0);
        await page.locator('.shopping_cart_link').click();

        await cartPage.checkOut();
        await cartPage.fillCheckoutForm('John', 'Doe', '12345');
        await cartPage.continueCheckout();
        await cartPage.finishCheckout();
        const confirmationMessage = await cartPage.getConfirmationMessage();
        expect(confirmationMessage).toBe('Thank you for your order!');




    });



});
