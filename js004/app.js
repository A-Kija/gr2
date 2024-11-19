console.log('Hello from app.js');

const zodis = 'Barsukas';




console.log(zodis.length, '->', zodis[zodis.length - 1]);


// console.log(zodis[0]);
// console.log(zodis[1]);
// console.log(zodis[2]);
// console.log(zodis[3]);
// console.log(zodis[4]);
// console.log(zodis[5]);
// console.log(zodis[6]);
// console.log(zodis[7]);

for (let i = 0; i < 10; i++) {
    // eilutė kartoja kodą 10 kartų
    console.log(i);
}

console.clear();

for (let i = 0; i < zodis.length; i++) {
    console.log(zodis[i]);
}

console.clear();

const li = document.querySelector('ul li');

console.log(li, li.innerText);

const lis = document.querySelectorAll('ul li');

console.log(lis, lis[3].innerText, lis.length);

for (let i = 0; i < lis.length; i++) {
    console.log(lis[i].innerText);
}

// const v1 = `dvi eilutes`;



let barsukoHtml = '';

for (let i = 0; i < zodis.length; i++) {
    // barsukoHtml += '<span>' + zodis[i] + '</span>';
    barsukoHtml += `<span>${zodis[i]}</span>`;
}

console.log(barsukoHtml);

document.querySelector('.bar').innerHTML = barsukoHtml;

// Susumuoti skaičius iš sekcijos numbers ir rezultatą išspausdinti į console
// Naudojam for, querySelectorAll ir innerText bei parseInt

let suma1 = 0;

const secNumbers = document.querySelectorAll('.numbers span');

console.log(secNumbers);

for (let i = 0; i < secNumbers.length; i++) {
    suma1 += parseInt(secNumbers[i].innerText);
    // suma1 = suma1 + parseInt(secNumbers[i].innerText);
}

console.log(suma1);

// Suskaičiuoti kiek yra A raidžių div'e letters
// Naudojam for, querySelectorAll ir innerText bei if

let kiekisA = 0;

const divoRaides = document.querySelectorAll('.letters span');

for (let i = 0; i < divoRaides.length; i++) {
    if (divoRaides[i].innerText === 'A') {
        kiekisA++;
    }
}

console.log(kiekisA);

// Suskaičiuoti kiek yra raidžių div'e gyvuliai

let sumaG = 0;
const gyvLetters = document.querySelectorAll('.gyvuliai span');
for (let i = 0; i < gyvLetters.length; i++) {
    sumaG += gyvLetters[i].innerText.length;
}
console.log(sumaG);

// Suskaičiuoti kiek yra gyvulių yra dive'e gyvuliai

const gyvuliuSkaicius = document.querySelectorAll('.gyvuliai span').length;

console.log(gyvuliuSkaicius);

// Suskaičiuoti kiek yra vardų div'e vardai, kurie prasideda raide A

let kiekisVardu = 0;
const vardai = document.querySelectorAll('.vardai span');
for (let i = 0; i < vardai.length; i++) {
    if (vardai[i].innerText[0] === 'A') {
        kiekisVardu++;
    }
}
console.log(kiekisVardu);