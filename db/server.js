const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');

const URL = 'http://localhost:3000/';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'miskas2'
});

con.connect(err => {
    if (err) {
        console.log('Klaida prisijungiant prie DB');
        return;
    }
    console.log('Prisijungimas prie DB buvo sėkmingas');
});


// Start server

const port = 3000;
app.listen(port, () => {
    console.log(`Serveris pasiruošęs ir laukia ant ${port} porto!`);
});