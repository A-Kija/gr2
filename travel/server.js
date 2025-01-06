const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const handlebars = require('handlebars');
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
    if (!session){
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



app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cookieMiddleware);
app.use(sessionMiddleware);
app.use(messagesMiddleware);

// Routes

//READ
app.get('/admin/list', (req, res) => {

    let list = fs.readFileSync('./data/list.json', 'utf8');
    list = JSON.parse(list);

    const data = {
        pageTitle: 'Sąrašas',
        list,
        message: req.user.message || null
    };

    const html = makeHtml(data, 'list');
    res.send(html);

});

//CREATE
app.get('/admin/list/create', (req, res) => {

    const data = {
        pageTitle: 'Pridėti naują įrašą',
    };

    const html = makeHtml(data, 'create');
    res.send(html);

});
//STORE
app.post('/admin/list/store', (req, res) => {

    const { title, text } = req.body;
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

    updateSession(req, 'message', {text: 'Įrašas pridėtas', type: 'success'});

    res.redirect(URL + 'admin/list');
});




app.get('/admin', (req, res) => {

    const data = {
        pageTitle: 'Administravimas Pagrindinis',
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
        message: req.user.message || null
    };

    const html = makeHtml(data, 'pageTop');
    res.send(html);
});

app.post('/admin/page-top', (req, res) => {

    const { main_title, sub_title, page_text } = req.body;
    // will be validated later
    

    let mainTopData = {
        main_title,
        sub_title,
        page_text,
    };

    mainTopData = JSON.stringify(mainTopData);

    fs.writeFileSync('./data/main-top.json', mainTopData);

    updateSession(req, 'message', {text: 'Puslapis atnaujintas', type: 'success'});

    res.redirect(URL + 'admin/page-top');

});



app.get('/', (req, res) => {

    let mainTopData = fs.readFileSync('./data/main-top.json', 'utf8');
    mainTopData = JSON.parse(mainTopData);

    mainTopData.page_text = mainTopData.page_text.split('\n');

    const data = {
        pageTitle: 'Pirmasis puslapis',
        mainTopData
    };

    const html = makeHtml(data, 'landing', false);

    res.send(html);
});


// Start server

const port = 3000;
app.listen(port, () => {
    console.log(`Serveris pasiruošęs ir laukia ant ${port} porto!`);
});