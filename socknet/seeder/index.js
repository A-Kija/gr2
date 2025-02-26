console.log('start seeding');
import { faker } from '@faker-js/faker';
import { createUser } from './user.js';

const users = faker.helpers.multiple(createUser, {
    count: 5,
});

console.log(users);

