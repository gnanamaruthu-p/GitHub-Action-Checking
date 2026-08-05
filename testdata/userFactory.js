const {faker} = require('@faker-js/faker');



function createUser(overrides = {}) {
    return {
        name: faker.person.firstName(),
        username: faker.internet.username(),
        email: faker.internet.email(),
        ...overrides
    };
}

function createOrder(overrides = {}) {
    return {
        product_id: faker.number.int({ min: 1, max: 3 }),
        quantity: faker.number.int({ min: 1, max: 5 }),
        ...overrides
    };
}

module.exports = {
    createUser,
    createOrder
}   ;

