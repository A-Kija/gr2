const express = require('express');
const app = express();
const fs = require('fs');
const handlebars = require('handlebars');

app.use(express.static('public'));

const makeHtml = (data, page, back = true) => {
    const dir = back ? 'back' : 'front';
    data.url = 'http://localhost:3000/';
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


const port = 3000;
app.listen(port, () => {
    console.log(`Serveris pasiruošęs ir laukia ant ${port} porto!`);
});