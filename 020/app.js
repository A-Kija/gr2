const express = require('express');
// body parser
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

//public folderio turinio naudojimas
app.use(express.static('public'));


app.use(bodyParser.urlencoded({ extended: true }));


// ROUTES (keliai)

app.get('/', (req, res) => {
  res.send('Labas barsukai!');
});

app.get('/bebras', (req, res) => {
  res.send('Labas BEBRAI!');
});

app.get('/bebras/kailinis', (req, res) => {
  res.send('Labas Meska!');
});


app.get('/bebras/:spalva/:kailis', (req, res) => {

  const color = req.params.spalva;
  const kailis = req.params.kailis;

  res.send(`Labas ${color} ${kailis} bebrai!`);
});

// 1 sukurti dviejų skaičių sumos skaičiuoklę

app.get('/suma/:pirmas/:antras', (req, res) => {
  const pirmas = parseInt(req.params.pirmas);
  const antras = parseInt(req.params.antras);
  const suma = pirmas + antras;
  res.send(`Rezultatas: ${suma}`);
});

app.get('/briedis', (req, res) => {

  const spalva = req.query.spalva;
  const kailis = req.query.kailis;


  res.send(`Labas ${spalva} ${kailis} Briedziai!`);

});


// 2 sukurti dviejų skaičių daugybos skaičiuoklę su query

app.get('/daugyba', (req, res) => {
  const pirmas = parseInt(req.query.pirmas);
  const antras = parseInt(req.query.antras);
  const daugyba = pirmas * antras;
  res.send(`Rezultatas: ${daugyba}`);
});


app.post('/mano-forma', (req, res) => {
  const vardas = req.body.vardas;
  // redirect
  res.status(302).redirect('/gavau-duomenis?vardas=' + vardas);
});

app.get('/gavau-duomenis', (req, res) => {
  const vardas = req.query.vardas;
  res.send(`Ačiū, ${vardas}, Gavau duomenis!`);
});


app.listen(port, () => {
  console.log(`Mano serveris veikia ant ${port} porto!`);
});

// Padaryti formą su 2 input ir mygtuku. Paspaudus mygtuką turi būti atvaizduojamas suma.