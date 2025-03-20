import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import md5 from 'md5';
import cookieParser from 'cookie-parser';
import { v4 } from 'uuid';

const postsPerPage = 11;

const app = express();
const port = 3333;
const frontURL = 'http://localhost:5173';
const serverUrl = `http://localhost:${port}/`;

app.use(cookieParser());

app.use(cors(
    {
        origin: frontURL,
        credentials: true
    }
));

app.use(express.json());


const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sock_net'
});


con.connect(err => {
    if (err) {
        console.log('Klaida prisijungiant prie DB');
        return;
    }
    console.log('Prisijungimas prie DB buvo sėkmingas');
});

const error500 = (res, err) => res.status(500).json(err);
const error400 = (res, customCode = 0) => res.status(400).json({
    msg: { type: 'error', text: 'Invalid request. Code: ' + customCode }
});
const error401 = (res, message) => res.status(401).json({
    msg: { type: 'error', text: message }
});

// Identifikacija - pagal numatytą ID identifikuojam vartototoją pvz Ragana-su-šluota
// Autorizacija - pagal vartotojo identifikuotą ID, vartotojui suteikiamos teisės pvz gali balsuoti, pirkti cigaretes
// Autentifikacija - pagal numatytą ID autentifikuojam vartotoją pvz Arvydas Kijakauskas a/k 55555555555



// auth middleware
app.use((req, res, next) => {
    const token = req.cookies['sock-net-token'] || 'no-token';
    const sql = `
        SELECT u.id, u.role, u.name
        FROM sessions AS s
        INNER JOIN users AS u
        ON s.user_id = u.id
        WHERE token = ?
    `;
    con.query(sql, [token], (err, result) => {
        if (err) return error500(res, err);
        if (result.length === 0) {
            req.user = {
                role: 'guest',
                name: 'Guest',
                id: 0
            }
        } else {
            req.user = {
                role: result[0].role,
                name: result[0].name,
                id: result[0].id
            }
        }
        next();
    });
});

app.post('/login', (req, res) => {
    const { name, password } = req.body;
    const sql = 'SELECT * FROM users WHERE name = ? AND password = ?';
    con.query(sql, [name, md5(password)], (err, result) => {
        if (err) return error500(res, err);
        if (result.length === 0) {
            error401(res, 'Invalid user name or password');
            return;
        }

        const token = md5(v4());
        const userId = result[0].id;
        let time = new Date();
        time = time.setMinutes(time.getMinutes() + (60 * 24));
        time = new Date(time);

        const insertSql = `
            INSERT INTO sessions
            (user_id, token, valid_until)
            VALUES (?, ?, ?)
        `;
        con.query(insertSql, [userId, token, time], (err) => {
            if (err) return error500(res, err);
            res.cookie('sock-net-token', token, { httpOnly: true, SameSite: 'none' });
            res.status(200).json({
                msg: { type: 'success', text: `Hello, ${result[0].name}! How are you?` },
                user: {
                    role: result[0].role,
                    name: result[0].name,
                    id: result[0].id
                }
            });
        });
    });
});


//TODO paimti is middleware
app.get('/auth-user', (req, res) => {
    setTimeout(_ => {
        res.json(req.user);
    }, 1000);
});


app.post('/logout', (req, res) => {
    setTimeout(_ => {
        const token = req.cookies['sock-net-token'] || 'no-token';

        const sql = `
            DELETE FROM sessions
            WHERE token = ?
        `
        con.query(sql, [token], (err) => {
            if (err) return error500(res, err);
            res.clearCookie('sock-net-token');
            res.status(200).json({
                msg: { type: 'success', text: `Bye bye!` },
                user: {
                    role: 'guest',
                    name: 'Guest',
                    id: 0
                }
            });
        });
    }, 2000);
});




// USERS/***** */

app.get('/users/active-list', (req, res) => {

    setTimeout(_ => {

        const sql = `
        SELECT id, name, avatar, role AS userRole, online
        FROM users
        -- WHERE role = 'gold'
        ORDER BY online DESC, name
    `;

        con.query(sql, (err, result) => {
            if (err) return error500(res, err);
            res.json({
                success: true,
                db: result
            });
        });

    }, 2000);
});


// POSTS/***** */

app.get('/posts/load-posts/:page', (req, res) => {
    const page = parseInt(req.params.page);

    setTimeout(_ => {

        const sql = `
        SELECT p.id, p.content, p.created_at AS postDate, p.votes, u.name, u.avatar, i.url AS mainImage
        FROM posts AS p
        INNER JOIN users AS u
        ON u.id = p.user_id
        INNER JOIN images AS i
        ON p.id = i.post_id AND i.main = 1
        ORDER BY p.created_at DESC
        LIMIT ? OFFSET ?
    `;

        con.query(sql, [postsPerPage, (page - 1) * postsPerPage], (err, result) => {
            if (err) return error500(res, err);

            result = result.map(r => ({ ...r, votes: JSON.parse(r.votes) }));

            res.json({
                success: true,
                db: result
            });

        });

    }, 1500);
});


app.post('/posts/update/:id', (req, res) => {

    if (!req.user.id) {
        error401(res, 'Please login first.');
        return;
    }

    const id = parseInt(req.params.id);
    const { type, payload } = req.body;

    const sql1 = 'SELECT * FROM posts WHERE id = ?';
    con.query(sql1, [id], (err, result1) => {
        if (err) return error500(res, err);
        if (!result1.length) return error400(res, 554); // 554 is lubu paimtas

        if ('up_vote' === type) {

        }

    });
});

// Start server


app.listen(port, () => {
    console.log(`Serveris pasiruošęs ir laukia ant ${port} porto!`);
});