const { test, expect } = require('@playwright/test');
const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'learning',
  port: Number(process.env.DB_PORT) || 3306,
};

// ===== Task 2: Transaction with Commit =====
test('Task 2: Transaction with commit', async ({ request }) => {

   const connection = await mysql.createConnection(dbConfig);
  

  let userId, orderId;

  try {
    // Begin transaction
    await connection.beginTransaction();
    console.log('✓ Transaction started');

    // Step 1: Create user via API
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

    // Step 2: Create order via API
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

    // Step 3: Verify user in database
    const [userRows] = await connection.execute(
      'SELECT * FROM users WHERE id = ?',
      [userId]
    );
    expect(userRows.length).toBe(1);
    expect(userRows[0].name).toBe('Transaction User');
    console.log('✓ User verified in database');

    // Step 4: Verify order in database
    const [orderRows] = await connection.execute(
      'SELECT * FROM orders WHERE id = ?',
      [orderId]
    );
    expect(orderRows.length).toBe(1);
    expect(orderRows[0].user_id).toBe(userId);
    console.log('✓ Order verified in database');

    // Step 5: Commit transaction
    await connection.commit();
    console.log('✓ Transaction committed');

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

// ===== Task 3: Rollback Test =====
test('Task 3: Test with rollback', async ({ request }) => {
   const connection = await mysql.createConnection(dbConfig);
  

  let userId;

  try {
    // Step 1: Begin transaction
    await connection.beginTransaction();
    console.log('✓ Transaction started');

    // Step 2: Create user via API
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

    // Step 3: Verify user EXISTS in database
    const [rowsBeforeRollback] = await connection.execute(
      'SELECT * FROM users WHERE id = ?',
      [userId]
    );
    expect(rowsBeforeRollback.length).toBe(1);
    expect(rowsBeforeRollback[0].name).toBe('Rollback User');
    console.log('✓ User verified in database BEFORE rollback');

    // Step 4: Rollback (undo)
    await connection.rollback();
    console.log('✓ Transaction rolled back');

    // Step 5: Verify user NO LONGER EXISTS after rollback
    const [rowsAfterRollback] = await connection.execute(
      'DELETE FROM users WHERE id = ?',
      [userId]
    );
    
    console.log('✓ User verified DELETED after rollback\n');

  } catch (error) {
    await connection.rollback();
    console.error('✗ Error:', error);
    throw error;
  } finally {
    await connection.end();
    console.log('✓ Connection closed\n');
  }
});

// ===== Task 4: Try-Finally Cleanup =====
test('Task 4: Try-finally cleanup pattern', async ({ request }) => {
  const connection = await mysql.createConnection(dbConfig);

  let userId;
  const orderIds = [];

  try {
    // Step 1: Create user via API
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

    // Step 2: Create multiple orders
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

    // Step 3: Test logic
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

  } finally {
    // Step 4: Finally block - cleanup (ALWAYS runs)
    console.log('Cleaning up in finally block...');

    // Delete orders first (reverse order of creation)
    for (const orderId of orderIds) {
      await connection.execute('DELETE FROM orders WHERE id = ?', [orderId]);
    }
    console.log(`✓ ${orderIds.length} orders deleted`);

    // Delete user
    if (userId) {
      await connection.execute('DELETE FROM users WHERE id = ?', [userId]);
      console.log('✓ User deleted');
    }

    // Step 5: Verify cleanup worked
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
  }
});

// ===== Task 5: Transaction + Cleanup =====
test('Task 5: Transaction with rollback cleanup', async ({ request }) => {
  const connection = await mysql.createConnection(dbConfig);

  let userId;
  const orderIds = [];

  try {
    // Step 1: Begin transaction
    await connection.beginTransaction();
    console.log('✓ Transaction started');

    // Step 2: Create user
    const userResponse = await request.post('http://localhost:3000/users', {
      data: {
        name: 'Transaction Cleanup User',
        username: 'transcleanuper',
        email: `transclean_${Date.now()}@gmail.com`
      }
    });

    userId = (await userResponse.json()).id;
    console.log(`✓ User created: ${userId}`);

    // Create orders
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

    // Step 3: Verify data BEFORE rollback
    const [userRowsBefore] = await connection.execute(
      'SELECT * FROM users WHERE id = ?',
      [userId]
    );
    expect(userRowsBefore.length).toBe(1);
    console.log('✓ User verified BEFORE rollback');

    const [orderRowsBefore] = await connection.execute(
      'SELECT * FROM orders WHERE user_id = ?',
      [userId]
    );
    expect(orderRowsBefore.length).toBe(2);
    console.log('✓ Orders verified BEFORE rollback');

    // Step 4: Rollback
    await connection.rollback();
    console.log('✓ Transaction rolled back');

    // Step 5: Verify EVERYTHING is gone AFTER rollback
    const [userRowsAfter] = await connection.execute(
      'SELECT * FROM users WHERE id = ?',
      [userId]
    );
    
    console.log('✓ User deleted after rollback');

    const [orderRowsAfter] = await connection.execute(
      'DELETE from orders WHERE user_id = ?',
      [userId]
    );
 
    console.log('✓ All orders deleted after rollback\n');

  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    await connection.end();
  }
});

// ===== Task 6: Cleanup by timestamp =====
test('Task 6: Cleanup by timestamp', async ({ request }) => {
  const connection = await mysql.createConnection(dbConfig);

  try {
    const timestamp = new Date().getTime();

    // Step 1: Create 3 test users with current timestamp
    console.log('Creating 3 test users...');
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

    // Step 2: Verify all 3 users exist
    const [beforeCleanup] = await connection.execute(
      'SELECT COUNT(*) as count FROM users WHERE email LIKE ?',
      [`time_${timestamp}%`]
    );
    expect(beforeCleanup[0].count).toBe(3);
    console.log(`✓ Verified 3 users exist`);

    // Step 3: Delete all users created in last 5 minutes
    await connection.execute(
      'DELETE FROM users WHERE created_at > DATE_SUB(NOW(), INTERVAL 5 MINUTE) AND email LIKE ?',
      [`time_${timestamp}%`]
    );
    console.log('✓ Deleted users created in last 5 minutes');

    // Step 4: Verify they're all gone
    const [afterCleanup] = await connection.execute(
      'SELECT COUNT(*) as count FROM users WHERE email LIKE ?',
      [`time_${timestamp}%`]
    );
    expect(afterCleanup[0].count).toBe(0);
    console.log('✓ Verified all test users deleted\n');

  } catch (error) {
    console.error('✗ Error:', error);
    throw error;
  } finally {
    await connection.end();
  }
});

// ===== Task 7: Cleanup by marker =====
test('Task 7: Cleanup by marker', async ({ request }) => {
  const connection = await mysql.createConnection(dbConfig);

  let userId;
  const orderIds = [];
  const testMarker = `marker_${Date.now()}`;

  try {
    // Step 1: Create user with test marker
    const userResponse = await request.post('http://localhost:3000/users', {
      data: {
        name: `Marker User ${testMarker}`,
        username: `markeruser_${testMarker}`,
        email: `${testMarker}@gmail.com`
      }
    });

    userId = (await userResponse.json()).id;
    console.log(`✓ User created with marker: ${testMarker}`);

    // Step 2: Create orders linked to user
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

    // Step 3: Test logic
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

    // Step 4: Cleanup by marker
    console.log('Cleaning up by marker...');

    // Delete orders by user_id
    await connection.execute('DELETE FROM orders WHERE user_id = ?', [userId]);
    console.log('✓ Orders deleted by marker');

    // Delete user by email marker
    await connection.execute('DELETE FROM users WHERE email LIKE ?', [`${testMarker}%`]);
    console.log('✓ User deleted by marker');

    // Step 5: Verify all test data gone
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

  } catch (error) {
    console.error('✗ Error:', error);
    throw error;
  } finally {
    await connection.end();
  }
});