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
    }, 700);
});



// CREATE
app.post('/', (req, res) => {

    setTimeout(_ => { // Simulate server delay
        const { name, size, color_hex, satellites } = req.body;

        if (!name) {
            res.status(422).json({ error: 'Neteisingai įvestas planetos pavadinimas' });
            return;
        }

        const sats = JSON.stringify(satellites);
        const sql = `
        INSERT INTO planets
        (name, size, color_hex, satellites)
        VALUES (?,?,?,?)`;
        con.query(sql, [name, size, color_hex, sats], (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            const id = result.insertId;
            res.json({ success: true, id });
        });
    }, 2000);
});


//UPDATE

app.put('/:id', (req, res) => {
    
    setTimeout(_ => { // Simulate server delay
        const { name, size, color_hex, satellites } = req.body;
        const id = req.params.id;

        if (!name) {
            res.status(422).json({ error: 'Neteisingai įvestas planetos pavadinimas' });
            return;
        }

        const sats = JSON.stringify(satellites);
        const sql = `
        UPDATE planets
        SET name = ?, size = ?, color_hex = ?, satellites = ?
        WHERE id = ?`;
        con.query(sql, [name, size, color_hex, sats, id], (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ success: true });
        });
    }, 2000);
});

// DELETE
app.delete('/:id', (req, res) => {
    
    setTimeout(_ => { // Simulate server delay

        const id = req.params.id;

        if (parseInt(id) === 8) {
            res.status(422).json({ error: 'Planeta yra nesunaikinama!' });
            return;
        }


        const sql = `
        DELETE FROM planets
        WHERE id = ?`;
        con.query(sql, [id], (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ success: true });
        });
    }, 2000);
});




// Start server

const port = 3333;
app.listen(port, () => {
    console.log(`Serveris pasiruošęs ir laukia ant ${port} porto!`);
});