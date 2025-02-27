/*
likes: {
    l: [1, 7, 6, 9, 8],
    d: [2, 3, 4, 10]
}
*/

import { faker } from '@faker-js/faker';


export const makeLikes = count => {
    const lCount = faker.number.int({ min: 0, max: count })
    const dCount = faker.number.int({ min: 0, max: count - lCount })

    const lSet = new Set();
    do {
        lSet.add(faker.number.int({ min: 1, max: count }));
    } while (lSet.size < lCount);

    const dSet = new Set();
    do {
        const id = faker.number.int({ min: 1, max: count });
        if (!lSet.has(id)) {
            dSet.add(id);
        }
    } while (dSet.size < dCount);

    return { 
        l: [...lSet], 
        d: [...dSet] 
    };
}