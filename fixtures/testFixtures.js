const base = require('@playwright/test');
const { createUser } = require('../testdata/userFactory');

// Mistake 1: the fixture name must match the name used in the test file.
// Earlier, the fixture was named testuser (lowercase u), but the test used testUser.
const test = base.test.extend({
  testUser: async ({ request }, use) => {
    const userPayload = createUser();
    let createdUserId = null;

    try {
      // Mistake 2: the fixture needs Playwright's built-in request fixture.
      const createResponse = await request.post('http://localhost:3000/users', {
        data: userPayload
      });

      base.expect(createResponse.status()).toBe(201);

      const responseBody = await createResponse.json();
      createdUserId = responseBody.id;

      // Provide the created user to the test.
      await use({ ...userPayload, id: createdUserId });
    } finally {
      // Cleanup: delete the user after the test finishes.
      if (createdUserId) {
        await request.delete(`http://localhost:3000/users/${createdUserId}`);
      }
    }
  }
});

module.exports = {
  test,
  expect: base.expect
};