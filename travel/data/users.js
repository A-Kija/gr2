const fs = require('fs');
const md5 = require('md5');

let users = [
    { name: 'Bebras', psw: md5('123'), role: 'editor' },
    { name: 'Briedis', psw: md5('123'), role: 'admin' },
    { name: 'Barsukas', psw: md5('123'), role: 'user' },
];

users = JSON.stringify(users);

fs.writeFileSync('./users.json', users);

console.log('Vartotojai įrašyti.');