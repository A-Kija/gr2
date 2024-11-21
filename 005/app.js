

const nr1 = document.querySelector('#nr1 div');
const nr1Text = nr1.innerText;
console.log(nr1Text);


const nr2 = document.querySelectorAll('#nr2 div');
for (let i = 0; i < nr2.length; i++) {
    const nr2Text = nr2[i].innerText;
    console.log(nr2Text);
}


const nr3 = document.querySelector('#nr3');
nr3.innerHTML = '<div>Nr. 3</div>';


const nr4 = document.querySelector('#nr4');
let divs = '';
for (let i = 0; i < 5; i++) {
    divs += `<div>Nr. ${i + 1}</div>`;
}
nr4.innerHTML = divs;



const nr5 = document.querySelectorAll('#nr5 div');
let newDivs = '';
for (let i = 0; i < nr5.length; i++) {
    const nr5Text = nr5[i].innerText;
    newDivs += `<div style="background-color: crimson;">${nr5Text}</div>`;
}
const nr6 = document.querySelector('#nr6');
nr6.innerHTML = newDivs;


const keistas = {
    pirmas: 'Bebras',
    antras: 'Bobis',
    trecias: 'Kazys',
    ketvirtas: 'Rexas',
    penktas: 'Domas'
}

const masyvas = ['Bebras', 'Bobis', 'Kazys', 'Rexas', 'Domas'];

console.log(keistas, typeof keistas);
console.log(masyvas, typeof masyvas);

for (let i = 0; i < masyvas.length; i++) {
    console.log(masyvas[i]);
}


const nr7 = document.querySelector('#nr7');
let divs7 = '';

for (let i = 0; i < masyvas.length; i++) {
    divs7 += `<div>${masyvas[i]}</div>`;
}

nr7.innerHTML = divs7;

console.clear();


function fun1() {
    console.log('Funkcija 1');
    return 5;
}

const fun2 = function () {
    console.log('Funkcija 2');
    return 7;
}

const fun3 = function(skaicius, skaicius2, skaicius3 = 5) {
    const kaDaro = skaicius * skaicius2 + skaicius3;
    return kaDaro;
}

const fun4 = (skaicius, skaicius2, skaicius3 = 5) => {
    const kaDaro = skaicius * skaicius2 + skaicius3;
    return kaDaro;
}



console.log('Pradžia');


console.log('Vidurys');


const kaGrazina = fun3(15, 4);


console.log('Pabaiga', kaGrazina);

console.clear();


const fun5 = function (sk) {
    return sk * 2;
}

const fun6 = (sk) =>  {
    return sk * 2;
}

const fun7 = (sk) => sk * 2;

const fun8 = sk => sk * 2;

const fun9 = () => 5 * 2;

const fun10 = _ => 5 * 2;

const suma = (a, b) => a + b;  

console.log(suma(4, 5));



const calc = (a, b, bilekas) => bilekas(a, b);



const sum = (a, b) => a + b;
const diff = (a, b) => a - b;

const sumaKita = sum;

const keturi = 4;


console.log(calc(keturi, 5, sumaKita));
console.log(calc(4, 5, diff));

