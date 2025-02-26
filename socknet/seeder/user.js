/*
CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(100) NOT NULL UNIQUE,
  `email` varchar(100) NOT NULL UNIQUE,
  `password` char(32) NOT NULL,
  `role` enum('user','admin','gold','bot') NOT NULL DEFAULT 'user',
  `avatar` text DEFAULT NULL,
  `created_at` date NOT NULL,
  `status` enum('banned','verified','registered') NOT NULL DEFAULT 'registered',
  `online` tinyint(3) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
 */


import { faker } from '@faker-js/faker';

export function createUser() {
    return {
        name: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: faker.helpers.arrayElement(['user', 'admin', 'gold', 'bot']),
        avatar: null,
        created_at: faker.date.recent(),
        status: faker.helpers.arrayElement(['banned', 'verified', 'registered']),
        online: faker.number.int({ min: 0, max: 1 })

    };
}