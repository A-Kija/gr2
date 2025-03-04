import { faker } from '@faker-js/faker';

export function createComment() {
    return {
        content: faker.word.words({ count: { min: 6, max: 100 } }),
    };
}