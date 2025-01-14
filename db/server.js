const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');

const URL = 'http://localhost:3000/';

app.use(express.static('public'));
app.use(bodyParser.json());

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

app.get('/medziu-sarasas', (req, res) => {

    // SELECT column1, column2, ...
    // FROM table_name;

    const sql = `
        SELECT id, name, height, type
        FROM trees
        -- WHERE type = 'Lapuotis' AND height > 10
        -- ORDER BY type DESC, height
        ORDER BY name
        -- LIMIT 1, 3
    
    `;

    con.query(sql, (err, result) => {
        if (err) {
            console.log('Klaida gaunant duomenis iš DB');
            res.status(400).json({ error: 'Klaida gaunant duomenis iš DB' });
            return;
        }
        res.json(result);
    });
});

app.post('/sodinti-medi', (req, res) => {

    const { name, height, type } = req.body;

    // INSERT INTO table_name 
    // (column1, column2, column3, ...)
    // VALUES (value1, value2, value3, ...);

    const sql = `
        INSERT INTO trees 
        (name, height, type)
        VALUES ('${name}', ${height}, '${type}')
    `;

    con.query(sql, (err, result) => {
        if (err) {
            console.log('Klaida įrašant duomenis į DB', err);
            res.status(400).json({ error: 'Klaida įrašant duomenis į DB'});
            return;
        }
        res.json({ success: 'Medis sėkmingai įrašytas į DB', result });
    });

});

app.delete('/iskasti-medi/:id', (req, res) => {

    const id = req.params.id;

    // DELETE FROM table_name 
    // WHERE condition;

    // const sql = `
    //     DELETE FROM trees
    //     WHERE id = ${id}
    // `;

    const sql = `
        DELETE FROM trees
        WHERE id = ?
    `;

    con.query(sql, [id], (err, result) => {
        if (err) {
            console.log('Klaida trinant duomenis iš DB', err);
            res.status(400).json({ error: 'Klaida trinant duomenis iš DB'});
            return;
        }
        res.json({ success: 'Medis sėkmingai iškastas iš DB', result });
    });

});



// Start server

const port = 3000;
app.listen(port, () => {
    console.log(`Serveris pasiruošęs ir laukia ant ${port} porto!`);
});