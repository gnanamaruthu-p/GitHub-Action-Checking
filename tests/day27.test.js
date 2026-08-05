const { default: AxeBuilder } = require('@axe-core/playwright');
const { test, expect } = require('@playwright/test');

test('Accessibility scan - SauceDemo login page', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    const results = await new AxeBuilder({ page }).analyze();

    console.log('Violations:', results.violations.length);

    results.violations.forEach((violation, index) => {

        console.log(`Violation ${index + 1}`);
        console.log(`Rule: ${violation.id}`);
        console.log(`Impact: ${violation.impact}`);
        console.log(`Description: ${violation.description}`);
        console.log(`Help: ${violation.help}`);
        console.log(`Help URL: ${violation.helpUrl}`);
        console.log(`Affected Nodes: ${violation.nodes.length}`);
        console.log('.......................................');

    });

});

test('Accessibility scan - critical and serious violations', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    const results = await new AxeBuilder({ page }).analyze();

    const criticalResults = results.violations.filter(
        violation =>
            violation.impact === 'critical' ||
            violation.impact === 'serious'
    );

    console.log(
        `Critical/Serious Violations: ${criticalResults.length}`
    );

    expect(criticalResults).toEqual([]);

});

test('Accessibility scan - Login form only', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    const results = await new AxeBuilder({ page })
        .include('.login_container')
        .analyze();

    console.log(`Violations Found: ${results.violations.length}`);

    results.violations.forEach((violation) => {

        console.log(
            `Rule: ${violation.id} | Impact: ${violation.impact}`
        );

    });

    expect(results.violations).toEqual([]);

});

test('Accessibility scan after login', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    await page.waitForURL('**/inventory.html');

    const results = await new AxeBuilder({ page }).analyze();

    console.log(
        `\nTotal Violations Found: ${results.violations.length}\n`
    );

    results.violations.forEach((violation, index) => {

        console.log(`\nViolation ${index + 1}`);
        console.log(`Rule: ${violation.id}`);
        console.log(`Impact: ${violation.impact}`);
        console.log(`Description: ${violation.description}`);
        console.log(`Help: ${violation.help}`);
        console.log(`Affected Elements: ${violation.nodes.length}`);
        console.log('-----------------------------------');

    });

});

test('Accessibility violations summary', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    const results = await new AxeBuilder({ page }).analyze();

    console.log('\n=== Accessibility Violations Summary ===\n');

    if (results.violations.length === 0) {

        console.log('No accessibility violations found.');
        return;

    }

    results.violations.forEach((violation, index) => {

        console.log(`Violation ${index + 1}`);
        console.log(`Rule ID: ${violation.id}`);
        console.log(`Impact Level: ${violation.impact}`);
        console.log(`Affected Elements: ${violation.nodes.length}`);

        switch (violation.id) {

            case 'landmark-one-main':
                console.log(
                    'Recommendation: Add a <main> landmark to the page.'
                );
                break;

            case 'page-has-heading-one':
                console.log(
                    'Recommendation: Add a meaningful <h1> heading.'
                );
                break;

            case 'region':
                console.log(
                    'Recommendation: Place content inside semantic landmarks such as <main>, <header>, or <footer>.'
                );
                break;

            case 'color-contrast':
                console.log(
                    'Recommendation: Improve text and background color contrast.'
                );
                break;

            default:
                console.log(
                    `Recommendation: Review axe documentation: ${violation.helpUrl}`
                );

        }

        console.log('----------------------------------------');

    });

});