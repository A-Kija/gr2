const rand = (min, max) => {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

const randColor = _ => Math.floor(Math.random() * 16777215).toString(16).padEnd(6, '0');

// 1. Programiškai sukurti masyvą masyvas01, kuriame būtų 10 elementų - atsitiktinių skaičių nuo 10 iki 100.


const masyvas01 = [];

for (let i = 0; i < 10; i++) {
    const kaDedam = rand(10, 100);
    masyvas01.push(kaDedam);
}

console.log(masyvas01);

// 2. Programiškai sukurti masyvą masyvas02, kuriame būtų 10 elementų - atsitiktinių spalvų.


const masyvas02 = [];

for (let i = 0; i < 10; i++) {
    const kaDedam = randColor();
    masyvas02.push(kaDedam);
}

console.log(masyvas02);


// 3. Programiškai sukurti masyvą masyvas03, kuriame būtų 10 elementų - atsitiktinai raidė "A" arba "B".


const masyvas03 = [];

for (let i = 0; i < 10; i++) {
    let kaDedam;
    const randomSkaicius = rand(0, 1);
    if (randomSkaicius) {
        kaDedam = 'A';
    } else {
        kaDedam = 'B';
    }
    masyvas03.push(kaDedam);
}

console.log(masyvas03);


// 4. Sukurkite funkciją ab, kuri grąžintų atsitiktinai raidę "A" arba "B". Programiškai sukurti masyvą masyvas01, kuriame būtų 10 elementų - atsitiktinai raidė "A" arba "B", naudojant funkciją ab.


const ab = _ => {
    const randomSkaicius = rand(0, 1);
    if (randomSkaicius) {
        return 'A';
    }
    return 'B';
}

const masyvas04 = [];

for (let i = 0; i < 10; i++) {
    const kaDedam = ab();
    masyvas04.push(kaDedam);
}

console.log(masyvas04);


// 5. Programiškai suskaičiuoti kiek raidžių "A" yra sukurtame 4 uždavinio masyve.

let aKiekis = 0;

masyvas04.forEach(masyvoRaide => {
    let raide = masyvoRaide;
    if (raide == 'A') {
        aKiekis++;
    }
});

// reduce one liner
const aKiekis2 = masyvas04.reduce((raidziuAKiekis, masyvoRaide) => masyvoRaide == 'A' ? raidziuAKiekis + 1 : raidziuAKiekis, 0);

console.log(aKiekis2);


// Į section nr1 įdėti h1 tagą su tekstu "Masyvas 01";

const section1 = document.querySelector('#nr1');

const h1 = document.createElement('h1');
h1.innerText = 'Masyvas 01';

section1.appendChild(h1);


// Į section nr2 įdėti p tagus su skaičiais iš masyvo masyvas01;

const section2 = document.querySelector('#nr2');

masyvas01.forEach(skaicius => {
    const p = document.createElement('p');
    p.innerText = skaicius;
    section2.appendChild(p);
});

// Į section nr3 įdėti p tagus su žodiui "Spalva" nuspalvinta atitinkama spalva iš masyvo masyvas02;


const section3 = document.querySelector('#nr3');

masyvas02.forEach(kodas => {
    const p = document.createElement('p');
    p.innerText = 'Spalva';
    p.style.color = `#${kodas}`;
    section3.appendChild(p);
});