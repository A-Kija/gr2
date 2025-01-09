const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const handlebars = require('handlebars');
const multer = require('multer');

handlebars.registerHelper('isdefined', function (value) {
    return value !== undefined && value !== null;
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/');
    },
    filename: function (req, file, cb) {
        const randomName = uuidv4();
        const extension = file.originalname.split('.').pop();
        const filename = `${randomName}.${extension}`;
        cb(null, filename);
    }
});


const cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');
const md5 = require('md5');
const URL = 'http://localhost:3000/';



// Helpers
const makeHtml = (data, page, back = true) => {
    const dir = back ? 'back' : 'front';
    data.url = URL;
    const topHtml = fs.readFileSync(`./templates/${dir}/top.hbr`, 'utf8');
    const bottomHtml = fs.readFileSync(`./templates/${dir}/bottom.hbr`, 'utf8');
    const pageHtml = fs.readFileSync(`./templates/${dir}/${page}.hbr`, 'utf8');
    const html = handlebars.compile(topHtml + pageHtml + bottomHtml)(data);
    return html;
}

const updateSession = (req, prop, data) => {
    const sessionId = req.user.sessionId;
    let sessions = fs.readFileSync('./data/session.json', 'utf8');
    sessions = JSON.parse(sessions);
    let session = sessions.find(s => s.sessionId === sessionId);
    if (!session) {
        return;
    }
    if (null === data) {
        delete session[prop];
    } else {
        session[prop] = data;
    }
    sessions = JSON.stringify(sessions);
    fs.writeFileSync('./data/session.json', sessions);
}

// Midleware

// Cookie middleware
const cookieMiddleware = (req, res, next) => {
    let visitsCount = req.cookies.visits || 0;
    visitsCount++;
    // ONE YEAR
    res.cookie('visits', visitsCount, { maxAge: 1000 * 60 * 60 * 24 * 365 });
    next();
}

// Session middleware
const sessionMiddleware = (req, res, next) => {
    let sessionId = req.cookies.sessionId || null;
    if (!sessionId) {
        sessionId = md5(uuidv4()); // md5 kad būtų trumpesnis
    }
    let session = fs.readFileSync('./data/session.json', 'utf8');
    session = JSON.parse(session);
    let user = session.find(u => u.sessionId === sessionId);
    if (!user) {
        user = {
            sessionId
        };
        session.push(user);
        session = JSON.stringify(session);
        fs.writeFileSync('./data/session.json', session);
    }
    req.user = user;
    res.cookie('sessionId', sessionId, { maxAge: 1000 * 60 * 60 * 24 * 365 });
    next();
};

//Messages middleware
const messagesMiddleware = (req, res, next) => {
    if (req.method === 'GET') {
        updateSession(req, 'message', null);
    }
    next();
};

// Old data middleware
const oldDataMiddleware = (req, res, next) => {
    if (req.method === 'POST') {
        const oldData = req.body;
        updateSession(req, 'oldData', oldData);
    }
    if (req.method === 'GET') {
        updateSession(req, 'oldData', null);
    }
    next();
};

//Auth middleware
const auth = (req, res, next) => {

    const isLogin = req.url.includes('/login') && req.method === 'GET';
    if (isLogin && req.user?.user) {
        res.redirect(URL);
        return;
    }

    const isAdmin = req.url.includes('/admin');
    if (!isAdmin) {
        next();
        return;
    }

    if (req.user?.user?.role === 'admin' || req.user?.user?.role === 'editor') {
        next();
    } else {
        res.redirect(URL + 'login');
    }
}

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png' && file.mimetype !== 'image/webp') {
            cb(null, false);
            req.fileValidationError = true;
        } else {
            cb(null, true);
        }
    }
});



app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(upload.single('top_image'));
app.use(cookieMiddleware);
app.use(sessionMiddleware);
app.use(messagesMiddleware);
app.use(oldDataMiddleware);
app.use(auth);

// Routes

//READ
app.get('/admin/list', (req, res) => {

    let list = fs.readFileSync('./data/list.json', 'utf8');
    list = JSON.parse(list);

    const data = {
        pageTitle: 'Sąrašas',
        list,
        message: req.user.message || null,
        user: req.user.user || null
    };

    const html = makeHtml(data, 'list');
    res.send(html);

});

//CREATE
app.get('/admin/list/create', (req, res) => {

    const data = {
        pageTitle: 'Pridėti naują įrašą',
        message: req.user.message || null,
        oldData: req.user.oldData || null,
        user: req.user.user || null
    };

    const html = makeHtml(data, 'create');
    res.send(html);

});
//STORE
app.post('/admin/list/store', (req, res) => {

    const { title, text } = req.body;

    if (!title || !text) {
        updateSession(req, 'message', { text: 'Užpildykite visus laukus', type: 'danger' });
        res.redirect(URL + 'admin/list/create');
        return;
    }



    const id = uuidv4();

    let list = fs.readFileSync('./data/list.json', 'utf8');
    list = JSON.parse(list);

    list.push({
        id,
        title,
        text
    });

    list = JSON.stringify(list);
    fs.writeFileSync('./data/list.json', list);

    updateSession(req, 'message', { text: 'Įrašas pridėtas', type: 'success' });

    res.redirect(URL + 'admin/list');
});

//EDIT
app.get('/admin/list/edit/:id', (req, res) => {

    let list = fs.readFileSync('./data/list.json', 'utf8');
    list = JSON.parse(list);

    const item = list.find(i => i.id === req.params.id);

    if (!item) {
        const data = {
            pageTitle: 'Puslapis nerastas',
            noMenu: true,
            metaRedirect: true,
        };
        const html = makeHtml(data, '404');
        res.status(404).send(html);
        return;
    }


    const data = {
        pageTitle: 'Redaguoti įrašą',
        item,
        message: req.user.message || null,
        oldData: req.user.oldData || null,
        user: req.user.user || null
    };

    const html = makeHtml(data, 'edit');
    res.send(html);

});

//DELETE
app.get('/admin/list/delete/:id', (req, res) => {
    let list = fs.readFileSync('./data/list.json', 'utf8');
    list = JSON.parse(list);
    const item = list.find(i => i.id === req.params.id);
    if (!item) {
        const data = {
            pageTitle: 'Puslapis nerastas',
            noMenu: true,
            metaRedirect: true,
        };
        const html = makeHtml(data, '404');
        res.status(404).send(html);
        return;
    }
    const data = {
        pageTitle: 'Patvirtinimas',
        item,
        noMenu: true,
    };
    const html = makeHtml(data, 'delete');
    res.send(html);
});

//DESTROY
app.post('/admin/list/destroy/:id', (req, res) => {

    let list = fs.readFileSync('./data/list.json', 'utf8');
    list = JSON.parse(list);

    list = list.filter(i => i.id !== req.params.id);

    list = JSON.stringify(list);
    fs.writeFileSync('./data/list.json', list);

    updateSession(req, 'message', { text: 'Įrašas ištrintas', type: 'success' });

    res.redirect(URL + 'admin/list');

});


//UPDATE
app.post('/admin/list/update/:id', (req, res) => {

    const { title, text } = req.body;

    if (!title || !text) {
        updateSession(req, 'message', { text: 'Užpildykite visus laukus', type: 'danger' });
        res.redirect(URL + 'admin/list/edit/' + req.params.id);
        return;
    }




    let list = fs.readFileSync('./data/list.json', 'utf8');
    list = JSON.parse(list);

    const item = list.find(i => i.id === req.params.id);

    if (!item) {
        const data = {
            pageTitle: 'Puslapis nerastas',
            noMenu: true,
            metaRedirect: true,
        };
        const html = makeHtml(data, '404');
        res.status(404).send(html);
        return;
    }

    item.title = title;
    item.text = text;

    list = JSON.stringify(list);
    fs.writeFileSync('./data/list.json', list);

    updateSession(req, 'message', { text: 'Įrašas atnaujintas', type: 'success' });

    res.redirect(URL + 'admin/list');

});

//SHOW
app.get('/admin/list/show/:id', (req, res) => {

    let list = fs.readFileSync('./data/list.json', 'utf8');
    list = JSON.parse(list);

    const item = list.find(i => i.id === req.params.id);

    if (!item) {
        const data = {
            pageTitle: 'Puslapis nerastas',
            noMenu: true,
            metaRedirect: true,
        };
        const html = makeHtml(data, '404');
        res.status(404).send(html);
        return;
    }

    const lettersInText = item.text.length;


    const data = {
        pageTitle: 'Peržiūrėti įrašą',
        item,
        lettersInText,
        message: req.user.message || null,
        user: req.user.user || null
    };

    const html = makeHtml(data, 'show');
    res.send(html);

});

app.post('/admin/list/sort', (req, res) => {
    const order = req.body.order;
    let list = fs.readFileSync('./data/list.json', 'utf8');
    list = JSON.parse(list);

    //sort list by order
    list.sort((a, b) => {
        return order.indexOf(a.id) - order.indexOf(b.id);
    });

    list = JSON.stringify(list);
    fs.writeFileSync('./data/list.json', list);
    updateSession(req, 'message', { text: 'Sąrašas atnaujintas', type: 'success' });
    res.redirect(URL + 'admin/list');
});


app.get('/admin', (req, res) => {

    const data = {
        pageTitle: 'Administravimas Pagrindinis',
        user: req.user.user || null
    };

    const html = makeHtml(data, 'main');

    res.send(html);
});


app.get('/admin/page-top', (req, res) => {

    let mainTopData = fs.readFileSync('./data/main-top.json', 'utf8');
    mainTopData = JSON.parse(mainTopData);

    const data = {
        pageTitle: 'Pagrindinio puslapio viršus',
        mainTopData,
        message: req.user.message || null,
        oldData: req.user.oldData || null,
        user: req.user.user || null
    };

    const html = makeHtml(data, 'pageTop');
    res.send(html);
});

app.post('/admin/page-top', (req, res) => {

    const { main_title, sub_title, page_text } = req.body;
    // will be validated later

    if (req.fileValidationError){
        updateSession(req, 'message', { text: 'Netinkamas paveiksliukas', type: 'danger' });
        res.redirect(URL + 'admin/page-top');
        return;
    }


    let mainTopData = fs.readFileSync('./data/main-top.json', 'utf8');
    mainTopData = JSON.parse(mainTopData);
    let fileName = req.file?.filename;
    if (!fileName) {
        fileName = mainTopData.top_image;
    } else {
        if (mainTopData.top_image) {
            fs.unlinkSync('./public/images/' + mainTopData.top_image);
        }
    }

    mainTopData = {
        main_title,
        sub_title,
        page_text,
        top_image: fileName
    };

    mainTopData = JSON.stringify(mainTopData);

    fs.writeFileSync('./data/main-top.json', mainTopData);

    updateSession(req, 'message', { text: 'Puslapis atnaujintas', type: 'success' });

    res.redirect(URL + 'admin/page-top');

});

//LOGIN
app.get('/login', (req, res) => {
    const data = {
        pageTitle: 'Prisijungimas',
        message: req.user.message || null,
        oldData: req.user.oldData || null,
        noMenu: true,
    };
    const html = makeHtml(data, 'login');
    res.send(html);
});

app.post('/login', (req, res) => {
    const isLogout = req.query.hasOwnProperty('logout');
    if (isLogout) {
        updateSession(req, 'user', null);
        updateSession(req, 'message', { text: 'Sėkmingai atsijungta', type: 'success' });
        res.redirect(URL + 'login');
        return;
    }

    const { name, psw } = req.body;
    let users = fs.readFileSync('./data/users.json', 'utf8');
    users = JSON.parse(users);
    const user = users.find(u => u.name === name && u.psw === md5(psw));
    if (!user) {
        updateSession(req, 'message', { text: 'Neteisingi prisijungimo duomenys', type: 'danger' });
        res.redirect(URL + 'login');
        return;
    }
    updateSession(req, 'message', { text: 'Sėkmingai prisijungta', type: 'success' });
    updateSession(req, 'user', user);
    if (user.role === 'admin' || user.role === 'editor') {
        res.redirect(URL + 'admin');
    } else {
        res.redirect(URL);
    }
});





app.get('/', (req, res) => {

    let mainTopData = fs.readFileSync('./data/main-top.json', 'utf8');
    mainTopData = JSON.parse(mainTopData);

    let list = fs.readFileSync('./data/list.json', 'utf8');
    list = JSON.parse(list);

    mainTopData.page_text = mainTopData.page_text.split('\n');

    const data = {
        pageTitle: 'Pirmasis puslapis',
        mainTopData,
        list,
        user: req.user.user || null
    };

    const html = makeHtml(data, 'landing', false);

    res.send(html);
});


// Start server

const port = 3000;
app.listen(port, () => {
    console.log(`Serveris pasiruošęs ir laukia ant ${port} porto!`);
});