const { test, expect, request } = require('@playwright/test');





test('Task 2: Write homepage load time test:', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    const matrics = await page.evaluate(() => {

        const nav = performance.getEntriesByType('navigation')[0];

        return {
            domContentLoaded: nav.domContentLoadedEventEnd - nav.startTime,
            loadComplete: nav.loadEventEnd - nav.startTime,
            firstByte: nav.responseStart - nav.startTime


        };


    });


    console.log('DOM Content Loaded', matrics);
});


test('Get API Test', async ({ request }) => {

    const startTime = Date.now();
    const response = await request.get('http://localhost:3000/users');

    const endTime = Date.now() - startTime;

    console.log(startTime);

    expect(response.status()).toBe(200);

    expect(endTime).toBeLessThan(5000);





});




test('Post Order Api Test', async ({ request }) => {

    const startTime = Date.now();

    const reseponse = await request.post('http://localhost:3000/orders', { data: { user_id: 1, product_id: 1, quantity: 2 } });

    const endTime = Date.now() - startTime;

    expect(reseponse.status()).toBe(201);

    expect(endTime).toBeLessThan(5000);


});


test('Get by id APi Testing ', async ({ request }) => {


    const startTime = Date.now();

    const response = await request.get('http://localhost:3000/users/1');

    const endTime = Date.now() - startTime;

    expect(response.status()).toBe(200);

    expect(endTime).toBeLessThan(5000);
});


test('Measure login and add-to-cart timings', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    // ==========================
    // Login Click → Navigation Time
    // ==========================

    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');

    const loginStart = Date.now();

    await page.click('#login-button');

    await page.waitForURL('**/inventory.html');

    const loginDuration = Date.now() - loginStart;

    console.log(`Login Navigation Time: ${loginDuration} ms`);

    expect(loginDuration).toBeLessThan(5000);

    // ==========================
    // Add To Cart Click → Badge Update Time
    // ==========================

    const cartStart = Date.now();

    await page.locator('.btn_inventory').first().click();

    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    const cartDuration = Date.now() - cartStart;

    console.log(`Add To Cart Badge Update Time: ${cartDuration} ms`);

    expect(cartDuration).toBeLessThan(2000);

});


test('Complete checkout flow timing test', async ({ page }) => {

    const flowStart = Date.now();

    // =========================
    // Login Timing
    // =========================
    let start = Date.now();

    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    await page.waitForURL('**/inventory.html');

    const loginTime = Date.now() - start;

    // =========================
    // Add To Cart Timing
    // =========================
    start = Date.now();

    await page.locator('.btn_inventory').first().click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    const addToCartTime = Date.now() - start;

    // =========================
    // Open Cart Timing
    // =========================
    start = Date.now();

    await page.click('.shopping_cart_link');
    await page.waitForURL('**/cart.html');

    const cartPageTime = Date.now() - start;

    // =========================
    // Checkout Step One Timing
    // =========================
    start = Date.now();

    await page.click('#checkout');
    await page.waitForURL('**/checkout-step-one.html');

    const checkoutStep1Time = Date.now() - start;

    // =========================
    // Fill Customer Details Timing
    // =========================
    start = Date.now();

    await page.fill('#first-name', 'John');
    await page.fill('#last-name', 'Doe');
    await page.fill('#postal-code', '600001');
    await page.click('#continue');

    await page.waitForURL('**/checkout-step-two.html');

    const customerDetailsTime = Date.now() - start;

    // =========================
    // Finish Checkout Timing
    // =========================
    start = Date.now();

    await page.click('#finish');

    await page.waitForURL('**/checkout-complete.html');

    const finishCheckoutTime = Date.now() - start;

    // =========================
    // Total Flow Time
    // =========================
    const totalFlowTime = Date.now() - flowStart;

    console.log('\n===== Checkout Performance Report =====');
    console.log(`Login Time: ${loginTime} ms`);
    console.log(`Add To Cart Time: ${addToCartTime} ms`);
    console.log(`Open Cart Time: ${cartPageTime} ms`);
    console.log(`Checkout Step 1 Time: ${checkoutStep1Time} ms`);
    console.log(`Customer Details Time: ${customerDetailsTime} ms`);
    console.log(`Finish Checkout Time: ${finishCheckoutTime} ms`);
    console.log(`Total Checkout Flow Time: ${totalFlowTime} ms`);
    console.log('=======================================\n');

    await expect(page.locator('.complete-header'))
        .toHaveText('Thank you for your order!');
});