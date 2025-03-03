/*

CREATE TABLE `messages` (
  `id` int(10) UNSIGNED NOT NULL,
  `from_user_id` int(10) UNSIGNED NOT NULL,
  `to_user_id` int(10) UNSIGNED NOT NULL,
  `content` text NOT NULL,
  `created_at` date NOT NULL DEFAULT current_timestamp(),
  `seen` text NOT NULL,
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

*/

import { faker } from '@faker-js/faker';

export function createMessage() {
    return {
        content: faker.word.words({ count: { min: 1, max: 30 } }),
    };
}