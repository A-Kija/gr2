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

app.get('/medziu-sarasas/:page', (req, res) => {

    // SELECT column1, column2, ...
    // FROM table_name;

    const page = parseInt(req.params.page) || 1;
    const perPage = 3;
    const limit = (page - 1) * perPage;

    const sql = `
        SELECT id, name, height, type
        FROM trees
        -- WHERE type = 'Lapuotis' AND height > 10
        -- ORDER BY type DESC, height
        ORDER BY name
        LIMIT ?, ?
    
    `;

    con.query(sql, [limit, perPage], (err, result) => {
        if (err) {
            console.log('Klaida gaunant duomenis iš DB');
            res.status(400).json({ error: 'Klaida gaunant duomenis iš DB' });
            return;
        }
        res.json(result);
    });
});

app.get('/medziu-skaicius', (req, res) => {
    
    // SELECT COUNT(column_name)
    // FROM table_name;

    const sql = `
        SELECT COUNT(id) AS total
        FROM trees
    `;

    con.query(sql, (err, result) => {
        if (err) {
            console.log('Klaida gaunant duomenis iš DB');
            res.status(400).json({ error: 'Klaida gaunant duomenis iš DB' });
            return;
        }
        const perPage = 3;
        const pages = Math.ceil(result[0].total / perPage);
        res.json({ pages });
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

app.put('/persodinti-medi/:id', (req, res) => {

    // UPDATE table_name
    // SET column1 = value1, column2 = value2, ...
    // WHERE condition;

    const id = req.params.id;
    const { name, height, type } = req.body;

    const sql = `
        UPDATE trees
        SET name = ?, height = ?, type = ?
        WHERE id = ?
    `;

    con.query(sql, [name, height, type, id], (err, result) => {
        if (err) {
            console.log('Klaida atnaujinant duomenis DB', err);
            res.status(400).json({ error: 'Klaida atnaujinant duomenis DB'});
            return;
        }
        res.json({ success: 'Medis sėkmingai persodintas DB', result });
    });
});



// Start server

const port = 3000;
app.listen(port, () => {
    console.log(`Serveris pasiruošęs ir laukia ant ${port} porto!`);
});