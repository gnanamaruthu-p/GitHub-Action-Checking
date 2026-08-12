// Mistake 3: import the custom fixture file instead of the default Playwright module.
const { test, expect } = require('../fixtures/testFixtures');



test('Create user 1', async ({ testUser, request }) => {
    const response = await request.get(`http://localhost:3000/users/${testUser.id}`);
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
});

test('Create user 2', async ({ testUser, request }) => {
    const response = await request.get(`http://localhost:3000/users/${testUser.id}`);
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
});

test('Create user 3', async ({ testUser, request }) => {
    const response = await request.get(`http://localhost:3000/users/${testUser.id}`);
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
});

test('Create user 4', async ({ testUser, request }) => {
    const response = await request.get(`http://localhost:3000/users/${testUser.id}`);
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
});

test('Create user 5', async ({ testUser, request }) => {
    const response = await request.get(`http://localhost:3000/users/${testUser.id}`);
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
});

test('Create user 6', async ({ testUser, request }) => {
    const response = await request.get(`http://localhost:3000/users/${testUser.id}`);
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
});

