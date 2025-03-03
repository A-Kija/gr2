/*
likes: {
    l: [1, 7, 6, 9, 8],
    d: [2, 3, 4, 10]
}
*/

import { faker } from '@faker-js/faker';

// 5

// 2

// 5 - 2 = 3

export const makeMessagesUsers = (notUserId, usersCount) => {
    const conCount = faker.number.int({ min: 0, max: usersCount / 20 });
    const users = new Set();
    while (users.size < conCount) {
        const id = faker.number.int({ min: 1, max: usersCount });
        if (id !== notUserId) {
            users.add(id);
        }
    }
    return [...users];

}


export const makeLikes = count => {
    const lCount = faker.number.int({ min: 0, max: count });
    const dCount = faker.number.int({ min: 0, max: count - lCount });

    const lSet = new Set();
    while (lSet.size < lCount) {
        lSet.add(faker.number.int({ min: 1, max: count }));
    };

    const dSet = new Set();
    while (dSet.size < dCount) {
        const id = faker.number.int({ min: 1, max: count });
        if (!lSet.has(id)) {
            dSet.add(id);
        }
    };

    return { 
        l: [...lSet], 
        d: [...dSet] 
    };
}