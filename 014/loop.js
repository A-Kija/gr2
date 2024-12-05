console.log('loop.js');

function rand(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}


const maistas = ['bulvės', 'pomidorai', 'grietinė', 'jogurtas', 'kečupas', 'druska', 'pomidorų padažas', 'kumpis'];
const maistoObjektas = {
    bulves: '10kg bulvių',
    pomidorai: '1kg pomidorų',
    grietine: '1 puodelis grietinės',
    jogurtas: '1 puodelis jogurto',
    kecupas: '1 butelis kečupo',
    druska: '1 pakelis druskos',
    pomidoruPadazas: '1 butelis pomidorų padažo',
    kumpis: '1 kumpis',
};


//#1 FOR LOOP (Žinom kiek kartų kartoti)

const forLoop = document.querySelector('#for-loop');

for (let i = 0; i < maistas.length; i++) {
    console.log(maistas[i]);

    const div = document.createElement('div');
    div.innerText = maistas[i];
    forLoop.appendChild(div);
}

console.log('---------------------');

//#2 FOR OF LOOP (Naudojama su iteruojamaisiais objektais, negaunam index'o)

const forOfLoop = document.querySelector('#for-of-loop');

for (const produktas of maistas) {
    console.log(produktas);

    const div = document.createElement('div');
    div.innerText = produktas;
    forOfLoop.appendChild(div);
}

console.log('---------------------');

//#3 FOR IN LOOP (Naudojama su objektais, gaunam index'o, negauna reikšmės)

const forInLoop = document.querySelector('#for-in-loop');

for (const prop in maistoObjektas) {
    console.log(`${prop}: ${maistoObjektas[prop]}`);

    const div = document.createElement('div');
    div.innerText = maistoObjektas[prop];
    forInLoop.appendChild(div);
}

//#4 DO WHILE LOOP (Nežinom kiek kartų kartoti, bet bent vieną kartą tikrai)


const doWhileLoop = document.querySelector('#do-while-loop');

let moneta1;
let moneta2;
let saugiklis = 1000;

do {
    moneta1 = rand(0, 1) ? 'H' : 'S';
    moneta2 = rand(0, 1) ? 'H' : 'S';
    console.log(moneta1, moneta2);
    const div = document.createElement('div');
    div.innerText = moneta1 + moneta2;
    doWhileLoop.appendChild(div);

    // laikinai idedamas saugiklis, kad neuzsikeltu begalinis ciklas
    if (--saugiklis < 0) {
        break;
    }

} while (moneta1 !== 'S' || moneta2 !== 'S');


/*

< -------- >=
> -------- <=
== -------- !=
=== ------- !==
|| -------- &&

*/


//#5 WHILE LOOP (Nežinom kiek kartų kartoti, kartojam nuo 0 kartų iki begalybės)



const whileLoop = document.querySelector('#while-loop');

let bronius = 0;

const batai = 500;

const mociute = rand(200, 800);

// gimtadienis

bronius = mociute;

console.log('Bronius po gimtadienio:', bronius);


while (bronius < batai) {
    const bolt = rand(20, 100);
    bronius += bolt;
    console.log('Bronius vaziuoja:', bronius);

    const div = document.createElement('div');
    div.innerText = bronius;
    whileLoop.appendChild(div);
}


console.log('---------------------');


//#6 SWITCH (Ypatingais atvejais)

const switchLoop = document.querySelector('#switch-loop');

console.clear();


const siunta = 'M';

switch (siunta) {
    case 'S': console.log('Bandome patalpinti Į S');
    case 'M': console.log('Bandome patalpinti Į M');
    case 'L': console.log('Bandome patalpinti Į L');
    case 'XL': console.log('Bandome patalpinti Į XL');
    default: console.log('Vietų nėra');
}

console.log('---------------------');

// with IFS

if (siunta === 'S') {
    console.log('Bandome patalpinti Į S');
}
if (siunta === 'S' || siunta === 'M') {
    console.log('Bandome patalpinti Į M');
}
if (siunta === 'S' || siunta === 'M' || siunta === 'L') {
    console.log('Bandome patalpinti Į L');
}
if (siunta === 'S' || siunta === 'M' || siunta === 'L' || siunta === 'XL') {
    console.log('Bandome patalpinti Į XL');
}
console.log('Vietų nėra');

console.log('---------------------');


if (siunta === 'S') {
    console.log('Maža siunta');
} else if (siunta === 'M') {
    console.log('Vidutinė siunta');
} else if (siunta === 'L') {
    console.log('Didelė siunta');
} else if (siunta === 'XL') {
    console.log('Labai didelė siunta');
} else {
    console.log('Nežinoma siunta');
}

switch (siunta) {
    case 'S': console.log('Maža siunta');
        break;
    case 'M': console.log('Vidutinė siunta');
        break;
    case 'L': console.log('Didelė siunta');
        break;
    case 'XL': console.log('Labai didelė siunta');
        break;
    default: console.log('Nežinoma siunta');
}




