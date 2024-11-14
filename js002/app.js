console.log('Hello, its me, app.js');


let kintamasSkaicius = 5;
let kintamasSkaicius2 = 7;
let kintamasTekstas = 'Labas rytas';

const preke = {
    pavadinimas: 'Kompiuteris',
    kaina: 500,
    spalva: 'juoda'
}

console.log(preke, typeof preke);


console.log(preke.kaina);

const rezultatas = kintamasSkaicius + kintamasSkaicius2;
console.log(rezultatas);


const objektas1 = {
    a: 1,
    b: 2
}

const objektas2 = {
    b: 3,
    c: 4
}

// 1. susumuoti b reiksmes

const suma = objektas1.b + objektas2.b;
console.log(suma);

kintamasSkaicius = kintamasSkaicius + 1;

objektas1.a = 100;

console.log(objektas1.a);

objektas1.naujaSavybe = 'NAUJA!';

console.log(objektas1);

const objektas3 = {};

console.log(objektas3);

objektas3.pirmas = 'pirmas';
objektas3.antras = 'antras';
objektas3.trecias = 'trecias';

objektas3.kitasObjektas = {
    a: 1,
    b: 2
}

console.log(objektas3.kitasObjektas.a);

const pirmasObjektas = {
    gyvunas: 'suo'
}

const antrasObjektas = pirmasObjektas; // by reference

antrasObjektas.gyvunas = 'kate';

console.log(pirmasObjektas, antrasObjektas);


const pirmasGyvunas = 'suo';
let antrasGyvunas = pirmasGyvunas; // by value

antrasGyvunas = 'kate';

console.log(pirmasGyvunas, antrasGyvunas);


let skaicius = 20;
let skaicius2 = 7;

console.log(skaicius + skaicius2);
console.log(skaicius - skaicius2);
console.log(skaicius * skaicius2);
console.log(skaicius / skaicius2);
console.log(skaicius % skaicius2);

console.clear();

console.log((0 + 1) % 3 || 'green');
console.log((1 + 1) % 3 || 'green');
console.log((2 + 1) % 3 || 'green');
console.log((3 + 1) % 3 || 'green');
console.log((4 + 1) % 3 || 'green');
console.log((5 + 1) % 3 || 'green');


console.clear();

skaicius = 2;
skaicius2 = 3;

const fancy = skaicius++ * ++skaicius;

// console.log(++skaicius);
// console.log(skaicius);

console.log(fancy);

let bananas = 'bananas';

bananas++;

console.log(bananas, typeof bananas);


const div = document.querySelector('.numeris');

let divSkaicius = div.innerText;

console.log(divSkaicius);

divSkaicius = parseInt(divSkaicius);

console.log(divSkaicius);

divSkaicius += 10;  // divSkaicius = divSkaicius + 10;

div.innerText = divSkaicius;


console.log(10 / 0);

const rez = 0.1 + 0.2;

console.log(rez);

console.log(rez.toFixed(2));

console.log(Math.sqrt(9));

let LK = true;

console.log(LK, typeof LK);


LK = !LK;

console.clear();

console.log('true && true:', true && true);
console.log('true && false:', true && false);
console.log('false && true:', false && true);
console.log('false && false:', false && false);

console.log('true || true:', true || true);
console.log('true || false:', true || false);
console.log('false || true:', false || true);
console.log('false || false:', false || false);


const A = 0;


console.log(A || 0 || 99);


let B = null;

console.log(B, typeof B);


console.log('A' > 'Ž');


