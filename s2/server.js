const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const md5 = require('md5');
const cookieParser = require('cookie-parser');
const uuid = require('uuid');

const URL = 'http://localhost:5173';

app.use(cookieParser());

app.use(cors(
    {
        origin: URL,
        credentials: true
    }
));

app.use(express.json());

const products = [
    { id: 11, name: 'Pienas', price: 100 },
    { id: 27, name: 'Duona', price: 200 },
    { id: 30, name: 'Sviestas', price: 300 },
    { id: 44, name: 'Kiaušiniai', price: 400 },
    { id: 51, name: 'Kefyras', price: 500 },
    { id: 67, name: 'Varškė', price: 600 },
    { id: 77, name: 'Jogurtas', price: 700 }, 
];

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'users_db'
});

app.post('/login', (req, res) => {
    const { name, password } = req.body;
    const sql = 'SELECT * FROM users WHERE name = ? AND password = ?';
    con.query(sql, [name, md5(password)], (err, result) => {
        if (err) {
            res.status(500).send('Klaida bandant prisijungti');
            return;
        }
        if (result.length === 0) {
            res.status(401).send('Neteisingi prisijungimo duomenys');
            return;
        }
        const token = uuid.v4();
        const updateSql = 'UPDATE users SET session_id = ? WHERE name = ?';
        con.query(updateSql, [token, name], (err) => {
            if (err) {
                res.status(500).send('Klaida bandant prisijungti');
                return;
            }
            res.cookie('r2-token', token, { httpOnly: true, SameSite: 'none' });
            res.status(200).json({
                success: true,
                message: 'Prisijungimas sėkmingas',
                user: {
                    role: result[0].role,
                    name: result[0].name,
                    id: result[0].id
                }
            });
        });
    });
});

app.get('/get-user', (req, res) => {
    setTimeout(_ => {
        const token = req.cookies['r2-token'] || 'no-token';
        const sql = 'SELECT * FROM users WHERE session_id = ?';
        con.query(sql, [token], (err, result) => {
            if (err) {
                res.status(500).send('Klaida bandant prisijungti');
                return;
            }
            if (result.length === 0) {
                res.status(200).json({
                    role: 'guest',
                    name: 'Guest',
                    id: 0
                });
                return;
            }
            res.status(200).json({
                role: result[0].role,
                name: result[0].name,
                id: result[0].id
            });
        });
    }, 1000);
});


app.post('/logout', (req, res) => {
    setTimeout(_ => {
        const token = req.cookies['r2-token'] || 'no-token';
        console.log('logout', token);
        const sql = 'UPDATE users SET session_id = ? WHERE session_id = ?';
        con.query(sql, [null, token], (err) => {
            if (err) {
                res.status(500).send('Klaida bandant atsijungti');
                return;
            }
            res.clearCookie('r2-token');
            res.status(200).json({
                success: true,
                message: 'Atsijungimas sėkmingas',
                user: {
                    role: 'guest',
                    name: 'Guest',
                    id: 0
                }
            });
        });
    }, 2000);
});


app.get('/products', (req, res) => {
    setTimeout(_ => {
        res.status(200).json(products);
    }, 1000);
});


con.connect(err => {
    if (err) {
        console.log('Klaida prisijungiant prie DB');
        return;
    }
    console.log('Prisijungimas prie DB buvo sėkmingas');
});






// Start server

const port = 3333;
app.listen(port, () => {
    console.log(`Serveris pasiruošęs ir laukia ant ${port} porto!`);
});