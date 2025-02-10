const express = require('express');
const app = express();
// const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const URL = 'http://localhost:3000';

app.use(cors(
    {
        origin: URL,
    }
));

// app.use(bodyParser.json());
app.use(express.json());

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'planet_db'
});

con.connect(err => {
    if (err) {
        console.log('Klaida prisijungiant prie DB');
        return;
    }
    console.log('Prisijungimas prie DB buvo sėkmingas');
});

// READ
app.get('/', (req, res) => {

    setTimeout(_ => { // Simulate server delay
        const sql = `
        SELECT * 
        FROM 
        planets
        ORDER BY id DESC
        `;
        con.query(sql, (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            result = result.map(planet => ({ ...planet, satellites: JSON.parse(planet.satellites) }));
            res.json(result);
        });
    }, 3700);
});



// CREATE
app.post('/', (req, res) => {
    const { name, size, color_hex, satellites } = req.body;
    const sats = JSON.stringify(satellites);
    const sql = `
        INSERT INTO planets
        (name, size, color_hex, satellites)
        VALUES (?,?,?,?)`;
    con.query(sql, [name, size, color_hex, sats], (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ success: true });
    });
});





// Start server

const port = 3333;
app.listen(port, () => {
    console.log(`Serveris pasiruošęs ir laukia ant ${port} porto!`);
});