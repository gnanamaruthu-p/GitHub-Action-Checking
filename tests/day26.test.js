const { test, expect } = require('@playwright/test');

test('Home screenshot', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    await expect(page).toHaveScreenshot('home.png', {
        fullPage: true
    });

});

test('Login button screenshot', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    await expect(
        page.locator('#login-button')
    ).toHaveScreenshot('login-button.png');

});

test('Inventory page with masked cart badge', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    await expect(page).toHaveURL(
        'https://www.saucedemo.com/inventory.html'
    );

    // Create a cart badge so masking makes sense
    await page
        .getByRole('button', { name: 'Add to cart' })
        .first()
        .click();

    await expect(page).toHaveScreenshot('inventory-page.png', {
        fullPage: true,
        mask: [
            page.locator('.shopping_cart_badge')
        ]
    });

});

test('Login button screenshot with tolerance', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    await expect(
        page.locator('#login-button')
    ).toHaveScreenshot('login-button-tolerance.png', {
        maxDiffPixelRatio: 0.01,
        threshold: 0.1
    });

});


test('Visual regression should detect UI change', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    // Intentionally modify the UI
    await page.addStyleTag({
        content: `
            #login-button {
                background-color: red !important;
                border: 5px solid yellow !important;
            }
        `
    });

    // Compare against existing baseline
    await expect(page).toHaveScreenshot('home.png', {
        fullPage: true
    });

});