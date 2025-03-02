console.log('start seeding');
import { faker } from '@faker-js/faker';
import { createUser } from './user.js';
import { createPost } from './post.js';
import { makeLikes, makeMessagesUsers } from './functions.js';
import { createImage } from './image.js';
import { createMessage } from './message.js';
import mysql from 'mysql';


const usersCount = 10;
const postsCount = 50;


const users = faker.helpers.multiple(createUser, {
    count: usersCount,
});

const posts = faker.helpers.multiple(createPost, {
    count: postsCount,
});

const images = [];
const messages = [];

users.forEach((_, key) => {
    const toUserId = key + 1;
    const fromUsers = makeMessagesUsers(toUserId, usersCount);

    fromUsers.forEach(fromUserId => {
        if (!messages.some(msg => {
            (msg.toUserId === toUserId && msg.fromUserId === fromUserId)
                ||
                (msg.toUserId === fromUserId && msg.fromUserId === toUserId)
        })
        ) {
            const endTime = faker.date.recent({ days: 5 });
            const replies = faker.number.int({ min: 1, max: 50 });
            let seenTo = true;
            let seenFrom = !faker.number.int({ min: 0, max: 1 });
            const seen = [];
            seenTo && seen.push(toUserId);
            seenFrom && seen.push(fromUserId);
            // d1.setMinutes(d1.getMinutes() - 879);
            messages.push({
                ...createMessage(),
                toUserId,
                fromUserId,
                seen,
                created_at: endTime
            });
            for (let i = 0; i < replies; i++) {
                //
            }
        }
    });
});



posts.forEach((p, key) => {
    p.user_id = faker.number.int({ min: 1, max: usersCount });
    p.votes = JSON.stringify(makeLikes(usersCount));

    // add images
    const imagesCount = faker.number.int({ min: 1, max: 5 });
    for (let i = 0; i < imagesCount; i++) {
        images.push({
            ...createImage(),
            post_id: key + 1,
            main: !i ? 1 : 0
        });
    }
});



const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sock_net'
});

con.connect(function (err) {
    if (err) throw err;
    console.log('Connected!');
});

let sql;

sql = 'DROP TABLE IF EXISTS images;'
con.query(sql, (err) => {
    if (err) {
        console.log('Images table drop error', err);
    } else {
        console.log('Images table was dropped');
    }
});

sql = 'DROP TABLE IF EXISTS posts;'
con.query(sql, (err) => {
    if (err) {
        console.log('Posts table drop error', err);
    } else {
        console.log('Posts table was dropped');
    }
});

sql = 'DROP TABLE IF EXISTS users;'
con.query(sql, (err) => {
    if (err) {
        console.log('User table drop error', err);
    } else {
        console.log('User table was dropped');
    }
});

sql = `
    CREATE TABLE users (
    id int(10) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name varchar(100) NOT NULL UNIQUE,
    email varchar(100) NOT NULL UNIQUE,
    password char(32) NOT NULL,
    role enum('user','admin','gold','bot') NOT NULL DEFAULT 'user',
    avatar text DEFAULT NULL,
    created_at date NOT NULL,
    status enum('banned','verified','registered') NOT NULL DEFAULT 'registered',
    online tinyint(3) UNSIGNED NOT NULL DEFAULT 0
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`;
con.query(sql, (err) => {
    if (err) {
        console.log('Users table create error', err);
    } else {
        console.log('Users table was created');
    }
});

sql = `
CREATE TABLE posts (
    id int(10) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    content text NOT NULL,
    created_at date NOT NULL,
    updated_at date NOT NULL,
    votes text NOT NULL,
    user_id int(10) UNSIGNED DEFAULT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`;
con.query(sql, (err) => {
    if (err) {
        console.log('Posts table create error', err);
    } else {
        console.log('Posts table was created');
    }
});

sql = `
CREATE TABLE images (
  id int(10) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  url varchar(100) NOT NULL,
  post_id int(10) UNSIGNED NOT NULL,
  main tinyint(1) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`;

con.query(sql, (err) => {
    if (err) {
        console.log('Images table create error', err);
    } else {
        console.log('Images table was created');
    }
});


sql = `
    INSERT INTO users
    (name, email, password, role, avatar, created_at, status, online)
    VALUES ?
`;
con.query(sql, [users.map(user => [user.name, user.email, user.password, user.role, user.avatar, user.created_at, user.status, user.online])], (err) => {
    if (err) {
        console.log('Users table seed error', err);
    } else {
        console.log('Users table was seeded');
    }
});

sql = `
    INSERT INTO posts
    (content, created_at, updated_at, votes, user_id)
    VALUES ?
`;
con.query(sql, [posts.map(post => [post.content, post.created_at, post.updated_at, post.votes, post.user_id])], (err) => {
    if (err) {
        console.log('Posts table seed error', err);
    } else {
        console.log('Posts table was seeded');
    }
});


sql = `
    -- Ką tu
    INSERT INTO images
    (url, post_id, main)
    VALUES ?
`;
con.query(sql, [images.map(image => [image.url, image.post_id, image.main])], (err) => {
    if (err) {
        console.log('Images table seed error', err);
    } else {
        console.log('Images table was seeded');
    }
});





con.end();