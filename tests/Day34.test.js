const {test , expect, request: apiRequest} = require('@playwright/test');
test('SQL injection resistance test', async ({ request }) => {

    // SQL injection-style payload
    const sqlPayload = "' OR '1'='1";

    // Attempt user creation with malicious input
    const response = await request.post(
        'http://localhost:3000/users',
        {
            data: {
                name: sqlPayload,
                username: 'test12345qwuser',
                email: 'qwertyuio@gmail.com'
            }
        }
    );

    // Request should not crash the server
    expect(response.status()).toBeLessThan(500);

    const body = await response.json();

    console.log(body);

    // Verify application handled input safely
    expect(body).toBeTruthy();

    // Verify users table still works normally
    const usersResponse = await request.get(
        'http://localhost:3000/users'
    );

    expect(usersResponse.status()).toBe(200);

    const users = await usersResponse.json();

    expect(Array.isArray(users)).toBeTruthy();
});



test('XSS resistance test', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    // XSS payload
    const xssPayload =
        '<script>window.xssTriggered = true;</script>';

    // Inject payload into username field
    await page.fill('#user-name', xssPayload);

    // Fill password and submit
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    // Check if injected script executed
    const triggered = await page.evaluate(() => {
        return window.xssTriggered;
    });

    // Script should NOT execute
    expect(triggered).toBeUndefined();

});



test('Protected endpoint requires authentication', async ({ request }) => {

    // No token, no login, no credentials
    const response = await request.get(
        'http://localhost:3000/users'
    );

    // Verify Unauthorized response
    expect(response.status()).toBe(401);

    const body = await response.json();

    console.log(body);

    expect(body.message).toContain('Unauthorized');

});



test('IDOR - User cannot access another user resource', async () => {

    // Create API contexts for two different users
    const userA = await apiRequest.newContext({
        extraHTTPHeaders: {
            Authorization: 'Bearer userA-token'
        }
    });

    const userB = await apiRequest.newContext({
        extraHTTPHeaders: {
            Authorization: 'Bearer userB-token'
        }
    });

    // User A creates a resource
    const createResponse = await userA.post(
        'http://localhost:3000/orders',
        {
            data: {
                user_id:'1',
                product_id:'2',
                quantity: 1
            }
        }
    );

    expect(createResponse.status()).toBe(201);

    const order = await createResponse.json();
    const orderId = order.id;

    // User B tries to access User A's order
    const accessResponse = await userB.get(
        `http://localhost:3000/orders/${orderId}`
    );

    // Authorization should block access
    expect(accessResponse.status()).toBe(403);

});