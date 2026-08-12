const {test, expect, request} = require('@playwright/test');


test('empty  username ', async ({request}) => { 

const response = await request.post('https://dummyjson.com/auth/login', { data : {username:"",password :"emilyspass"}

});

await expect(response.status()).toBe(400);

const error  = await response.json();

await expect(error.message).toBe("Username and password required");


});


test('empty  password ', async ({request}) => { 

const response = await request.post('https://dummyjson.com/auth/login', { data : {username:"emilys",password :""}

});

await expect(response.status()).toBe(400);

const error  = await response.json();

await expect(error.message).toBe("Username and password required");


});

test ('invalid email address' , async ({request})=>{


const response = await request.post('http://localhost:3000/users ' , { data : { name : "John Doe" , username : "johndoe" , email : "invalidemail.com" } });

await expect(response.status()).toBe(400);  

const error = await response.json();

await expect(error.message).toBe("Invalid email. Please provide a valid Gmail address.");



}); 



test ('Qunatity zero' , async ({request})=>{
    
const response = await request.post('http://localhost:3000/orders' , { data : { user_id : 1 , product_id : 1 , quantity : 0 } });

await expect(response.status()).toBe(400);  

const error = await response.json();

await expect(error.message).toBe("Quantity must be a positive integer between 1 and 999.");




});

test ('Qunatity -1 ' , async ({request})=>{
    
const response = await request.post('http://localhost:3000/orders' , { data : { user_id : 1 , product_id : 1 , quantity : -1 } });

await expect(response.status()).toBe(400);  

const error = await response.json();

await expect(error.message).toBe("Quantity must be a positive integer between 1 and 999.");




});


test ('Qunatity 1000000 ' , async ({request})=>{
    
const response = await request.post('http://localhost:3000/orders' , { data : { user_id : 1 , product_id : 1 , quantity : 1000000 } });

await expect(response.status()).toBe(400);  

const error = await response.json();

await expect(error.message).toBe("Quantity must be between 1 and 999. Values like 1000000 are not allowed.");




});


test ('Qunatity 1 ' , async ({request})=>{
    
const response = await request.post('http://localhost:3000/orders' , { data : { user_id : 1 , product_id : 1 , quantity : 1 } });

await expect(response.status()).toBe(201);  






});


test ('Qunatity 99 ' , async ({request})=>{
    
const response = await request.post('http://localhost:3000/orders' , { data : { user_id : 1 , product_id : 1 , quantity : 99 } });

await expect(response.status()).toBe(201);  






});


test ('race conditions test ' , async ({request}) => {

const promises = [];

for (let i = 0; i < 10; i++) {
    promises.push(request.post('http://localhost:3000/cart/items', {
        data: { user_id: 1, product_id: 1, quantity: 1 }
    }));
}

const results = await Promise.all(promises);

const response = await request.get('http://localhost:3000/cart/1' );

await expect(response.status()).toBe(200);

const cart = await response.json();

await expect(cart.items).toHaveLength(1);

 await expect(cart.items[0].quantity).toBe(10);


 await request.delete('http://localhost:3000/cart/1');





});


test('Handle missing optional fields', async ({ request }) => {

    // Create user without optional email field
    const suffix = Date.now();
    const username = `johndoe-${suffix}`;

    const response = await request.post('http://localhost:3000/users', {
        data: {
            name: `John Doe ${suffix}`,
            username
        },
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const body = await response.json();
    if (response.status() !== 201) {
        console.log('Create user failed:', response.status(), body);
    }

    await expect(response.status()).toBe(201);
    await expect(body.message).toBe('User Created');
    await expect(body.id).toBeGreaterThan(0);

    // Fetch the created user
    const userResponse = await request.get(`http://localhost:3000/users/${body.id}`);
    await expect(userResponse.status()).toBe(200);

    const user = await userResponse.json();

    // Verify provided values (includes timestamp suffix)
    await expect(user.name).toBe(`John Doe ${suffix}`);
    await expect(user.username).toBe(username);

    // Verify default email was applied
    await expect(user.email).toBeDefined();
    await expect(user.email).not.toBeNull();
    await expect(user.email).toMatch(/^[a-zA-Z0-9._%+-]+@gmail\.com$/);
    // end of Handle missing optional fields test
});

test('Duplicate username returns 409', async ({ request }) => {
    const email1 = `dup-${Date.now()}@gmail.com`;
    const payload1 = { name: 'Dup User', username: `dupuser-${Date.now()}`, email: email1 };

    const r1 = await request.post('http://localhost:3000/users', { data: payload1, headers: { 'Content-Type': 'application/json' } });
    await expect(r1.status()).toBe(201);

    // Attempt to create another user with same username
    const payload2 = { name: 'Dup User 2', username: payload1.username, email: `other-${Date.now()}@gmail.com` };
    const r2 = await request.post('http://localhost:3000/users', { data: payload2, headers: { 'Content-Type': 'application/json' } });
    await expect(r2.status()).toBe(409);
    const body = await r2.json();
    await expect(body.message).toContain('already exists');
});

test('Duplicate email return 409', async ({ request }) => {
    const email = `dup-email-${Date.now()}@gmail.com`;
    const payload1 = { name: 'Email Dup', username: `user${Date.now()}`, email };

    const r1 = await request.post('http://localhost:3000/users', { data: payload1, headers: { 'Content-Type': 'application/json' } });
    await expect(r1.status()).toBe(201);

    // Attempt to create another user with same email but different username
    const payload2 = { name: 'Email Dup 2', username: `user2${Date.now()}`, email };
    const r2 = await request.post('http://localhost:3000/users', { data: payload2, headers: { 'Content-Type': 'application/json' } });
    await expect(r2.status()).toBe(409);
    const body = await r2.json();
    await expect(body.message).toContain('already exists');
});




