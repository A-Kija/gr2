import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import md5 from 'md5';
import cookieParser from 'cookie-parser';
import { v4 } from 'uuid';
import fs from 'node:fs';

const postsPerPage = 11;

const app = express();
const port = 3333;
const frontURL = 'http://localhost:5173';
const serverUrl = `http://localhost:${port}/`;

app.use(express.json({ limit: '50mb' }));
app.use(express.static('public'));

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


const saveImageAsFile = imageBase64String => {

    if (!imageBase64String) {
        return null;
    }

    let type, image;

    if (imageBase64String.indexOf('data:image/png;base64,') === 0) {
        type = 'png';
        image = Buffer.from(imageBase64String.replace(/^data:image\/png;base64,/, ''), 'base64');
    } else if (imageBase64String.indexOf('data:image/jpeg;base64,') === 0) {
        type = 'jpg';
        image = Buffer.from(imageBase64String.replace(/^data:image\/jpeg;base64,/, ''), 'base64');
    } else {
        error400(res, 'Bad image format 1255');
        return;
    }

    const fileName = md5(v4()) + '.' + type;

    fs.writeFileSync('public/upload/' + fileName, image);

    return fileName;

}



// auth middleware
app.use((req, res, next) => {
    const token = req.cookies['sock-net-token'] || 'no-token';
    const sql = `
        SELECT u.id, u.role, u.name, u.avatar
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
                id: 0,
                avatar: null
            }
        } else {
            req.user = {
                role: result[0].role,
                name: result[0].name,
                id: result[0].id,
                avatar: result[0].avatar
            }
        }

        const regex = /^\/admin\//;
        const find = req.path.search(regex);
        if (-1 !== find) {
            if ('admin' !== result[0].role) {
                error401(res, 'Please login as Admin.');
                return;
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
                    id: result[0].id,
                    avatar: result[0].avatar
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
                    id: 0,
                    avatar: null
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
        ORDER BY p.id DESC
        LIMIT ? OFFSET ?
    `;

        con.query(sql, [postsPerPage, (page - 1) * postsPerPage], (err, result) => {
            if (err) return error500(res, err);

            result = result.map(r => (
                {
                    ...r,
                    votes: JSON.parse(r.votes),
                    mainImage: r.mainImage.indexOf('http') === 0 ? r.mainImage : frontURL + '/upload/' + r.mainImage
                }
            ));
            res.json({
                success: true,
                db: result
            });

        });

    }, 1500);
});

app.post('/posts/new', (req, res) => {

    setTimeout(_ => {

        const content = req.body.text;
        const created_at = new Date();
        const updated_at = new Date();
        const votes = JSON.stringify({ l: [], d: [] });
        const user_id = req.user.id;
        const uuid = req.body.uuid;

        const sql1 = `
        INSERT INTO posts
        (content, created_at, updated_at, votes, user_id)
        VALUES (?, ?, ?, ?, ?)
    `;
        con.query(sql1, [content, created_at, updated_at, votes, user_id], (err, result) => {
            if (err) return error500(res, err);
            const postID = result.insertId;

            const dbImages = [];

            req.body.images.forEach(img => {
                const fileName = saveImageAsFile(img.src);
                const dbImage = {
                    url: fileName,
                    post_id: postID,
                    main: img.main ? 1 : 0
                }
                dbImages.push(dbImage);
            });

            const sql2 = `
            INSERT INTO images
            (url, post_id, main)
            VALUES ?
        `;
            con.query(sql2, [dbImages.map(i => [i.url, i.post_id, i.main])], (err, result) => {
                if (err) return error500(res, err);

                res.json({
                    id: postID,
                    uuid,
                    success: true,
                    msg: {
                        type: 'success',
                        text: `You are nice`
                    }
                });
            });
        });

    }, 3000);
});


app.post('/posts/update/:id', (req, res) => {

    if (!req.user.id) {
        error401(res, 'Please login first.');
        return;
    }

    const postID = parseInt(req.params.id); // postID
    if (isNaN(postID)) {
        error400(res, '5788 Invalid Post ID');
        return;
    }


    const { type, payload } = req.body;

    const sql1 = 'SELECT * FROM posts WHERE id = ?';
    con.query(sql1, [postID], (err, result1) => {
        if (err) return error500(res, err);
        if (!result1.length) return error400(res, 554); // 554 is lubu paimtas

        if ('up_vote' === type || 'down_vote' === type) {

            const votes = JSON.parse(result1[0].votes);
            const up = new Set(votes.l);
            const down = new Set(votes.d);
            const userID = req.user.id; //userID

            if ('up_vote' === type) {
                if (up.has(userID)) {
                    up.delete(userID);
                } else if (down.has(userID)) {
                    down.delete(userID);
                    up.add(userID);
                } else {
                    up.add(userID);
                }
            }
            if ('down_vote' === type) {
                if (down.has(userID)) {
                    down.delete(userID);
                } else if (up.has(userID)) {
                    up.delete(userID);
                    down.add(userID);
                } else {
                    down.add(userID);
                }
            }
            let newVotes = { l: [...up], d: [...down] };
            newVotes = JSON.stringify(newVotes);
            const sql2 = `
                UPDATE posts
                SET votes = ?
                WHERE id = ?
            `;
            con.query(sql2, [newVotes, postID], (err) => {
                if (err) return error500(res, err);
                res.status(200).json({
                    msg: { type: 'success', text: `Thank you for your vote. You are the best!` },
                });
                return;
            });
        }

    });
});


// COMMENTS/***** */

app.get('/comments/for-post/:id', (req, res) => {

    const postID = req.params.id;

    const sql = `
        SELECT c.id, c.created_at, c.content, u.name, u.id AS userID
        FROM comments AS c
        INNER JOIN users AS u
        ON c.user_id = u.id
        WHERE c.post_id = ?
        ORDER BY c.id DESC
    `;



    con.query(sql, [postID], (err, result) => {
        if (err) return error500(res, err);

        res.json({
            success: true,
            c: result
        });

    });

});

app.post('/comments/create/:id', (req, res) => {

    if (!req.user.id) {
        error401(res, 'Please login first.');
        return;
    }

    const postID = req.params.id;
    const userID = req.user.id;
    const content = req.body.content; // maybe validate

    const sql = `
        INSERT INTO comments
        (post_id, user_id, content)
        VALUES (?, ?, ?)
    `;

    con.query(sql, [postID, userID, content], (err, result) => {
        if (err) return error500(res, err);

        res.json({
            success: true,
            id: result.insertId
        });

    });


});


app.post('/comments/delete/:id', (req, res) => {

    if (!req.user.id) {
        error401(res, 'Please login first.');
        return;
    }

    const commentID = req.params.id;
    const userID = req.user.id;

    const sql = `
        DELETE FROM comments
        WHERE id = ? AND user_id = ?
    `;

    con.query(sql, [commentID, userID], (err, result) => {
        if (err) return error500(res, err);

        res.json({
            success: !!result.affectedRows
        });

    });


});

// CHAT/***** */

app.get('/chat/list', (req, res) => {

    const userID = req.user.id;

    const sql1 = `
        SELECT DISTINCT from_user_id AS id
        FROM messages
        WHERE to_user_id = ?
    `;

    con.query(sql1, [userID], (err, result1) => {
        if (err) return error500(res, err);

        const sql2 = `
            SELECT id, name, avatar, online
            FROM users
            WHERE id IN (?)
        `;


        con.query(sql2, [result1.map(r => r.id)], (err, result2) => {
            if (err) return error500(res, err);

            res.json({
                status: 'success',
                users: result2
            });

        });

    });


});

app.get('/chat/chat-with/:id', (req, res) => {

    const from_user_id = req.params.id;
    const to_user_id = req.user.id;

    const sql = `
        SELECT from_user_id AS fromID, to_user_id AS toID, content AS message, created_at AS time, seen, id
        FROM messages
        WHERE (from_user_id = ? AND to_user_id = ?) OR (from_user_id = ? AND to_user_id = ?)
        ORDER BY created_at
    `;

    con.query(sql, [from_user_id, to_user_id, to_user_id, from_user_id], (err, result) => {
        if (err) return error500(res, err);

        result = result.map(r => {
            r.time = new Date(r.time).toLocaleString('lt-LT', {
                timeZone: 'Europe/Vilnius'
              });
              return r;
        });

        res.json({
            status: 'success',
            messages: result
        });

    });

});


app.post('/chat/new-message', (req, res) => {

    const from_user_id = req.user.id;
    const to_user_id = req.body.userID;
    const content = req.body.message;
    const created_at = new Date();

    const sql = `
        INSERT INTO messages
        (from_user_id, to_user_id, content, created_at, seen)
        VALUES (?, ?, ?, ?, ?)
    `;

    con.query(sql, [from_user_id, to_user_id, content, created_at, 0], (err, result) => {
        if (err) return error500(res, err);

        res.json({
            status: 'success'
        });
    });

});



// BACK OFFICE/***** */


app.post('/admin/comments/delete/:id', (req, res) => {

    const commentID = req.params.id;

    const sql = `
        DELETE FROM comments
        WHERE id = ?
    `;

    con.query(sql, [commentID], (err, result) => {
        if (err) return error500(res, err);

        res.json({
            success: !!result.affectedRows
        });

    });


});



// Start server


app.listen(port, () => {
    console.log(`Serveris pasiruošęs ir laukia ant ${port} porto!`);
});