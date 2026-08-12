const {test,expect} = require('@playwright/test');

const mysql = require('mysql2/promise');


test('Create and verify user ', async ({ request }) => {

    const connection = await mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'QDSQL',
        database: 'learning',
    })


    const userdata = await request.post('http://localhost:3000/users', {
        data:{
            name: 'Tester',
            username: 'testuser',
            email:'Test1@gmail.com'
        }
    });

        await expect(userdata.status()).toBe(201);

      const [rows]=  await 
        connection.execute('SELECT * FROM users WHERE email = ?', ['Test1@gmail.com']);

        console.log(rows);

        expect(rows[0]).toBeDefined();
        expect(rows[0].name).toBe('Tester');
        expect(rows[0].username).toBe('testuser');
        expect(rows[0].email).toBe('Test1@gmail.com');

        await connection.end();



});


test('Update and verify user', async ({ request }) => {

    const connection = await mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'QDSQL',
        database: 'learning',
    })

    const userdata = await request.put('http://localhost:3000/users/1', {
        data:{
            name: 'Tester',
             username: 'testuser',
            email:'Test1@gmail.com'
        }
    });

    await expect(userdata.status()).toBe(200);

    const [rows]=  await    connection.execute('SELECT * FROM users WHERE email = ?', ['Test1@gmail.com']);

    console.log(rows);

    expect(rows[0]).toBeDefined();
    expect(rows[0].name).toBe('Tester');
    expect(rows[0].username).toBe('testuser');
    expect(rows[0].email).toBe('Test1@gmail.com');

    await connection.end();

});



test('Delete and verify user', async ({ request }) => {

    
    const connection = await mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'QDSQL',
        database: 'learning',
    })

    const createResponse = await request.post('http://localhost:3000/users', {
        data: {
            name: 'Delete User',
            username: 'deleteuser',
            email: 'deleteuser@gmail.com'
        }
    })


 expect(createResponse.status()).toBe(201);

 const createUser = await createResponse.json();

const  createUserId = createUser.id;

console.log('Created user ID: $[createUserId]');

const deleteResponse  = await request.delete(`http://localhost:3000/users/${createUserId}`);

expect(deleteResponse.status()).toBe(200);

const [rows] = await connection.execute('SELECT * FROM users WHERE id = ?', [createUserId]);

expect(rows.length).toBe(0);    

await connection.end();


});


test('Count verification' , async ({ request }) => {

    const connection = await mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'QDSQL',
        database: 'learning',
    });

    const suffix = Date.now();
    const users = [
        {
            name: 'Count One',
            username: 'countuser1',
            email: `count1-${suffix}@gmail.com`
        },
        {
            name: 'Count Two',
            username: 'countuser2',
            email: `count2-${suffix}@gmail.com`
        },
        {
            name: 'Count Three',
            username: 'countuser3',
            email: `count3-${suffix}@gmail.com`
        }
    ];

    const insertedIds = [];
    for (const user of users) {
        const createResponse = await request.post('http://localhost:3000/users', {
            data: user
        });

        expect(createResponse.status()).toBe(201);
        const createUser = await createResponse.json();
        insertedIds.push(createUser.id);
    }

    const placeholders = insertedIds.map(() => '?').join(', ');
    const [rows] = await connection.execute(
        `SELECT COUNT(*) AS count FROM users WHERE id IN (${placeholders})`,
        insertedIds
    );

    expect(rows[0].count).toBe(3);

    await connection.end();

});


test('Relationship verification' , async({request}) => {

  const connection=await mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'QDSQL',
        database: 'learning',
    });

    const userResponse = await request.post('http://localhost:3000/users', {
        data: {
            name: 'Relationship User 1',
            username: 'relationshipuser',
            email: 'relation@gmail.com'
        }   
    });

    expect(userResponse.status()).toBe(201);
    const body = await userResponse.json();
    const userId = body.id;


    const userResponse1 = await request.post('http://localhost:3000/orders', {
        data: {
        "user_id": userId,
        "product_id": 2,
        "quantity": 3,
    }
    });


    expect(userResponse1.status()).toBe(201);

    const [rows]=await connection.execute('SELECT * FROM orders WHERE user_id = ?', [userId]);

   expect(rows.length).toBe(1);
   expect(rows[0].user_id).toBe(userId);

   await connection.end();




    



});
