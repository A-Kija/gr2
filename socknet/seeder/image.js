/*
CREATE TABLE `images` (
  `id` int(10) UNSIGNED NOT NULL,
  `url` varchar(100) NOT NULL,
  `post_id` int(10) UNSIGNED NOT NULL,
  `main` tinyint(3) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
*/


import { faker } from '@faker-js/faker';

export function createImage() {
    return {
        url: faker.image.urlPicsumPhotos(),
    };
}