const { test, expect } = require('@playwright/test');

test('Flaky test example', async ({ page }) => {

    await page.goto(
        'https://the-internet.herokuapp.com/dynamic_loading/2'
    );

    await page.click('button');

    // Bad practice - fixed wait
    await page.waitForTimeout(2000);

    await expect(
        page.locator('#finish')
    ).toContainText('Hello World!');

});


test('Fixed flaky test', async ({ page }) => {

    await page.goto(
        'https://the-internet.herokuapp.com/dynamic_loading/2'
    );

    await page.click('button');

    await expect(
        page.locator('#finish')
    ).toContainText('Hello World!');

});