const path = require('path');
const { test, expect } = require('@playwright/test');
const mysql = require('mysql2/promise');
require('dotenv').config();
const { allure } = require('allure-playwright');

const dbConfig = {
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'learning',
  port: Number(process.env.DB_PORT) || 3306,
};

async function attachFailureScreenshot(testInfo, page) {
  if (!page) return;

  const safeTitle = testInfo.title.replace(/[^a-z0-9]+/gi, '-').toLowerCase();
  const screenshotPath = path.join(__dirname, '..', 'Screenshots', `${safeTitle}-${Date.now()}.png`);

  await page.screenshot({ path: screenshotPath, fullPage: true });
  await testInfo.attach('failure-screenshot', {
    path: screenshotPath,
    contentType: 'image/png'
  });
}

async function setAllureMetadata({epic = 'General',feature = 'General',story = 'General',severity = 'normal' }= {}) {
  await allure.epic(epic);
  await allure.feature(feature);
  await allure.story(story);
  await allure.severity(severity);
}

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    await allure.step('Capturing failure screenshot', async () => {
      await attachFailureScreenshot(testInfo, page);
    });
  }
});

// ===== Task 2: Transaction with Commit =====
test('Task 2: Transaction with commit', async ({ request }) => {
  await allure.step('Apply test metadata', async () => {
    await setAllureMetadata({
      epic: 'Database Transactions',
      feature: 'Commit Flow',
      story: 'Transaction commit',
      severity: 'critical'
    });
  });

  await allure.step('Run transaction with commit workflow', async () => {

    const connection = await mysql.createConnection(dbConfig);

    let userId, orderId;

    try {
      await allure.step('Begin transaction', async () => {
        await connection.beginTransaction();
      });

      await allure.step('Create user via API', async () => {
        const userResponse = await request.post('http://localhost:3000/users', {
          data: {
            name: 'Transaction User',
            username: 'transuser',
            email: `trans_${Date.now()}@gmail.com`
          }
        });

        expect(userResponse.status()).toBe(201);
        userId = (await userResponse.json()).id;
        console.log(`✓ User created with ID: ${userId}`);
        await allure.attachment('created-user-id', String(userId), 'text/plain');
      });

      await allure.step('Create order via API', async () => {
        const orderResponse = await request.post('http://localhost:3000/orders', {
          data: {
            user_id: userId,
            product_id: 1,
            quantity: 2
          }
        });

        expect(orderResponse.status()).toBe(201);
        orderId = (await orderResponse.json()).id;
        console.log(`✓ Order created with ID: ${orderId}`);
        await allure.attachment('created-order-id', String(orderId), 'text/plain');
      });

      await allure.step('Verify user in database', async () => {
        const [userRows] = await connection.execute(
          'SELECT * FROM users WHERE id = ?',
          [userId]
        );
        expect(userRows.length).toBe(1);
        expect(userRows[0].name).toBe('Transaction User');
      });

      await allure.step('Verify order in database', async () => {
        const [orderRows] = await connection.execute(
          'SELECT * FROM orders WHERE id = ?',
          [orderId]
        );
        expect(orderRows.length).toBe(1);
        expect(orderRows[0].user_id).toBe(userId);
      });

      await allure.step('Commit transaction', async () => {
        await connection.commit();
      });

    } catch (error) {
      await connection.rollback();
      console.error('✗ Error:', error);
      throw error;
    } finally {
      // Cleanup
      if (orderId) {
        await connection.execute('DELETE FROM orders WHERE id = ?', [orderId]);
      }
      if (userId) {
        await connection.execute('DELETE FROM users WHERE id = ?', [userId]);
      }
      await connection.end();
      console.log('✓ Cleanup complete\n');
    }
  });
});

// ===== Task 3: Rollback Test =====
test('Task 3: Test with rollback', async ({ request }) => {
  await allure.step('Apply test metadata', async () => {
    await setAllureMetadata({
      epic: 'Database Transactions',
      feature: 'Rollback Flow',
      story: 'Rollback behavior',
      severity: 'critical'
    });
  });

  await allure.step('Run rollback workflow', async () => {
    const connection = await mysql.createConnection(dbConfig);

    let userId;

    try {
      await allure.step('Begin transaction', async () => {
        await connection.beginTransaction();
      });

      await allure.step('Create user via API', async () => {
        const response = await request.post('http://localhost:3000/users', {
          data: {
            name: 'Rollback User',
            username: 'rollbackuser',
            email: `rollback_${Date.now()}@gmail.com`
          }
        });

        expect(response.status()).toBe(201);
        userId = (await response.json()).id;
        console.log(`✓ User created with ID: ${userId}`);
        await allure.attachment('rollback-user-id', String(userId), 'text/plain');
      });

      await allure.step('Verify user exists before rollback', async () => {
        const [rowsBeforeRollback] = await connection.execute(
          'SELECT * FROM users WHERE id = ?',
          [userId]
        );
        expect(rowsBeforeRollback.length).toBe(1);
        expect(rowsBeforeRollback[0].name).toBe('Rollback User');
      });

      await allure.step('Rollback transaction', async () => {
        await connection.rollback();
      });

      await allure.step('Remove any remaining user after rollback', async () => {
        await connection.execute('DELETE FROM users WHERE id = ?', [userId]);
        console.log('✓ User deleted after rollback (cleanup)\n');
      });

    } catch (error) {
      await connection.rollback();
      console.error('✗ Error:', error);
      throw error;
    } finally {
      await connection.end();
      console.log('✓ Connection closed\n');
    }
  });
});

// ===== Task 4: Try-Finally Cleanup =====
test('Task 4: Try-finally cleanup pattern', async ({ request }) => {
  await allure.step('Apply test metadata', async () => {
    await setAllureMetadata({
      epic: 'Database Maintenance',
      feature: 'Cleanup Flow',
      story: 'Try-finally cleanup',
      severity: 'normal'
    });
  });

  await allure.step('Run try-finally cleanup workflow', async () => {
    const connection = await mysql.createConnection(dbConfig);

    let userId;
    const orderIds = [];

    try {
      await allure.step('Create user via API', async () => {
        const userResponse = await request.post('http://localhost:3000/users', {
          data: {
            name: 'Finally Cleanup User',
            username: 'finallyuser',
            email: `finally_${Date.now()}@gmail.com`
          }
        });

        expect(userResponse.status()).toBe(201);
        userId = (await userResponse.json()).id;
        console.log(`✓ User created with ID: ${userId}`);
        await allure.attachment('finally-user-id', String(userId), 'text/plain');
      });

      await allure.step('Create multiple orders', async () => {
        for (let i = 1; i <= 3; i++) {
          const orderResponse = await request.post('http://localhost:3000/orders', {
            data: {
              user_id: userId,
              product_id: i,
              quantity: i
            }
          });

          expect(orderResponse.status()).toBe(201);
          const orderId = (await orderResponse.json()).id;
          orderIds.push(orderId);
          console.log(`✓ Order ${i} created with ID: ${orderId}`);
        }
      });

      await allure.step('Verify test logic', async () => {
        const [userRows] = await connection.execute(
          'SELECT * FROM users WHERE id = ?',
          [userId]
        );
        expect(userRows.length).toBe(1);

        const [orderRows] = await connection.execute(
          'SELECT * FROM orders WHERE user_id = ?',
          [userId]
        );
        expect(orderRows.length).toBe(3);
        console.log('✓ Test logic verified');
      });

    } finally {
      // Step 4: Finally block - cleanup (ALWAYS runs)
      await allure.step('Cleanup created orders and user', async () => {
        for (const orderId of orderIds) {
          await connection.execute('DELETE FROM orders WHERE id = ?', [orderId]);
        }
        console.log(`✓ ${orderIds.length} orders deleted`);

        if (userId) {
          await connection.execute('DELETE FROM users WHERE id = ?', [userId]);
          console.log('✓ User deleted');
        }

        const [remainingOrders] = await connection.execute(
          'SELECT * FROM orders WHERE user_id = ?',
          [userId]
        );
        expect(remainingOrders.length).toBe(0);
        console.log('✓ Verified all orders deleted');

        const [remainingUsers] = await connection.execute(
          'SELECT * FROM users WHERE id = ?',
          [userId]
        );
        expect(remainingUsers.length).toBe(0);
        console.log('✓ Verified user deleted\n');

        await connection.end();
      });
    }
  });
});

// ===== Task 5: Transaction + Cleanup =====
test('Task 5: Transaction with rollback cleanup', async ({ request }) => {
  await allure.step('Apply test metadata', async () => {
    await setAllureMetadata({
      epic: 'Database Maintenance',
      feature: 'Rollback Cleanup',
      story: 'Transaction rollback cleanup',
      severity: 'critical'
    });
  });

  await allure.step('Run transaction rollback cleanup workflow', async () => {
    const connection = await mysql.createConnection(dbConfig);

    let userId;
    const orderIds = [];

    try {
      await allure.step('Begin transaction', async () => {
        await connection.beginTransaction();
      });

      await allure.step('Create user for cleanup test', async () => {
        const userResponse = await request.post('http://localhost:3000/users', {
          data: {
            name: 'Transaction Cleanup User',
            username: 'transcleanuper',
            email: `transclean_${Date.now()}@gmail.com`
          }
        });

        userId = (await userResponse.json()).id;
        console.log(`✓ User created: ${userId}`);
        await allure.attachment('cleanup-user-id', String(userId), 'text/plain');
      });

      await allure.step('Create orders for user', async () => {
        for (let i = 1; i <= 2; i++) {
          const orderResponse = await request.post('http://localhost:3000/orders', {
            data: {
              user_id: userId,
              product_id: i,
              quantity: i
            }
          });

          const orderId = (await orderResponse.json()).id;
          orderIds.push(orderId);
          console.log(`✓ Order created: ${orderId}`);
        }
      });

      await allure.step('Verify data BEFORE rollback', async () => {
        const [userRowsBefore] = await connection.execute(
          'SELECT * FROM users WHERE id = ?',
          [userId]
        );
        expect(userRowsBefore.length).toBe(1);

        const [orderRowsBefore] = await connection.execute(
          'SELECT * FROM orders WHERE user_id = ?',
          [userId]
        );
        expect(orderRowsBefore.length).toBe(2);
      });

      await allure.step('Rollback transaction', async () => {
        await connection.rollback();
      });

      await allure.step('Remove any remaining data after rollback', async () => {
        await connection.execute('DELETE FROM orders WHERE user_id = ?', [userId]);
        await connection.execute('DELETE FROM users WHERE id = ?', [userId]);
        console.log('✓ All orders and users deleted after rollback (cleanup)\n');
      });

    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      await connection.end();
    }
  });
});

// ===== Task 6: Cleanup by timestamp =====
test('Task 6: Cleanup by timestamp', async ({ request }) => {
  await allure.step('Apply test metadata', async () => {
    await setAllureMetadata({
      epic: 'Database Maintenance',
      feature: 'Cleanup Flow',
      story: 'Timestamp cleanup',
      severity: 'normal'
    });
  });

  await allure.step('Run timestamp cleanup workflow', async () => {
    const connection = await mysql.createConnection(dbConfig);

    try {
      const timestamp = new Date().getTime();

      await allure.step('Create 3 test users with timestamp', async () => {
        for (let i = 1; i <= 3; i++) {
          const response = await request.post('http://localhost:3000/users', {
            data: {
              name: `Timestamp User ${i}`,
              username: `timeuser${i}_${timestamp}`,
              email: `time_${timestamp}_user${i}@gmail.com`
            }
          });

          expect(response.status()).toBe(201);
          console.log(`✓ User ${i} created`);
        }
      });

      await allure.step('Verify users exist', async () => {
        const [beforeCleanup] = await connection.execute(
          'SELECT COUNT(*) as count FROM users WHERE email LIKE ?',
          [`time_${timestamp}%`]
        );
        expect(beforeCleanup[0].count).toBe(3);
        console.log(`✓ Verified 3 users exist`);
      });

      await allure.step('Delete users created in last 5 minutes', async () => {
        await connection.execute(
          'DELETE FROM users WHERE created_at > DATE_SUB(NOW(), INTERVAL 5 MINUTE) AND email LIKE ?',
          [`time_${timestamp}%`]
        );
        console.log('✓ Deleted users created in last 5 minutes');
      });

      await allure.step('Verify cleanup removed users', async () => {
        const [afterCleanup] = await connection.execute(
          'SELECT COUNT(*) as count FROM users WHERE email LIKE ?',
          [`time_${timestamp}%`]
        );
        expect(afterCleanup[0].count).toBe(0);
        console.log('✓ Verified all test users deleted\n');
      });

    } catch (error) {
      console.error('✗ Error:', error);
      throw error;
    } finally {
      await connection.end();
    }
  });
});

// ===== Task 7: Cleanup by marker =====
test('Task 7: Cleanup by marker', async ({ request }) => {
  await allure.step('Apply test metadata', async () => {
    await setAllureMetadata({
      epic: 'Database Maintenance',
      feature: 'Cleanup Flow',
      story: 'Marker cleanup',
      severity: 'normal'
    });
  });

  await allure.step('Run marker cleanup workflow', async () => {
    const connection = await mysql.createConnection(dbConfig);

    let userId;
    const orderIds = [];
    const testMarker = `marker_${Date.now()}`;

    try {
      await allure.step('Create user with test marker', async () => {
        const userResponse = await request.post('http://localhost:3000/users', {
          data: {
            name: `Marker User ${testMarker}`,
            username: `markeruser_${testMarker}`,
            email: `${testMarker}@gmail.com`
          }
        });

        userId = (await userResponse.json()).id;
        console.log(`✓ User created with marker: ${testMarker}`);
        await allure.attachment('marker-user-id', String(userId), 'text/plain');
      });

      await allure.step('Create orders linked to user', async () => {
        for (let i = 1; i <= 2; i++) {
          const orderResponse = await request.post('http://localhost:3000/orders', {
            data: {
              user_id: userId,
              product_id: i,
              quantity: i
            }
          });

          const orderId = (await orderResponse.json()).id;
          orderIds.push(orderId);
          console.log(`✓ Order ${i} linked to user`);
        }
        await allure.attachment('marker-order-ids', JSON.stringify(orderIds), 'application/json');
      });

      await allure.step('Verify created data', async () => {
        const [userRows] = await connection.execute(
          'SELECT * FROM users WHERE id = ?',
          [userId]
        );
        expect(userRows.length).toBe(1);

        const [orderRows] = await connection.execute(
          'SELECT * FROM orders WHERE user_id = ?',
          [userId]
        );
        expect(orderRows.length).toBe(2);
        console.log('✓ Test logic verified');
      });

      await allure.step('Cleanup by marker', async () => {
        await connection.execute('DELETE FROM orders WHERE user_id = ?', [userId]);
        console.log('✓ Orders deleted by marker');

        await connection.execute('DELETE FROM users WHERE email LIKE ?', [`${testMarker}%`]);
        console.log('✓ User deleted by marker');
      });

      await allure.step('Verify cleanup removed data', async () => {
        const [remainingUsers] = await connection.execute(
          'SELECT * FROM users WHERE email LIKE ?',
          [`${testMarker}%`]
        );
        expect(remainingUsers.length).toBe(0);

        const [remainingOrders] = await connection.execute(
          'SELECT * FROM orders WHERE user_id = ?',
          [userId]
        );
        expect(remainingOrders.length).toBe(0);
        console.log('✓ Verified all test data deleted\n');
      });

    } catch (error) {
      console.error('✗ Error:', error);
      throw error;
    } finally {
      await connection.end();
    }
  });
});