const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const handlebars = require('handlebars');
const URL = 'http://localhost:3000/';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

const makeHtml = (data, page, back = true) => {
    const dir = back ? 'back' : 'front';
    data.url = URL;
    const topHtml = fs.readFileSync(`./templates/${dir}/top.hbr`, 'utf8');
    const bottomHtml = fs.readFileSync(`./templates/${dir}/bottom.hbr`, 'utf8');
    const pageHtml = fs.readFileSync(`./templates/${dir}/${page}.hbr`, 'utf8');
    const html = handlebars.compile(topHtml + pageHtml + bottomHtml)(data);
    return html;
}


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


const port = 3000;
app.listen(port, () => {
    console.log(`Serveris pasiruošęs ir laukia ant ${port} porto!`);
});