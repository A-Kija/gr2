const express = require('express');
const app = express();
// const fs = require('fs');
// const handlebars = require('handlebars');

app.use(express.static('public'));


const port = 3000;
app.listen(port, () => {
    console.log(`Serveris pasiruošęs ir laukia ant ${port} porto!`);
});