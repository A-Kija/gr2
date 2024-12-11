console.log('app.js');



const masyvas1 = ['katė', 'šuo', 'pelė', 'žirafa', 'liūtas'];

const masyvas2 = [...masyvas1];

const kazkas = { ...masyvas1 }

masyvas2[0] = 'papūga';

const normalusObjektas = {
    a: 5,
    b: 10,
    c1: 15
}

const normalusObjektas2 = {
    z: 100,
    b: 200
}

const kopija = { c: 'viso', ...normalusObjektas, d: 20, b: 'labas', ...normalusObjektas2 };

kopija.a = 100;

console.log(kopija);


const objektasNLO1 = {
    a: 5,
    b: 10,
    c: {
        x: 100,
        y: 200
    }
}

const objektasNLO2 = { ...objektasNLO1 };

const objektasNLO3 = structuredClone(objektasNLO1);


objektasNLO2.a = 100;
objektasNLO2.c.x = 777;

console.log(objektasNLO1, objektasNLO2, objektasNLO3);


const dideleSuma = (a, b, c, ...visi) => {
    let suma = 0;
    for (const sk of visi) {
        suma += sk;
    }
    return suma;
}


const suma = dideleSuma(4, 4, 4, 10, 10, 10, 10);

console.log(suma);


const duGyviai = ['žirafa', 'liūtas'];

const [gyvunas1, gyvunas2] = duGyviai;

// const gyvunas1 = duGyviai[0];
// const gyvunas2 = duGyviai[1];


console.log(gyvunas1, gyvunas2);

const trysGyviai = ['žirafa', 'liūtas', 'dramblys'];

const [gyvunas3, ...likoGyvunu] = trysGyviai;

console.log(gyvunas3, likoGyvunu);


const medziuObjektas = {
    vienas: 'Beržas',
    kitas: 'Eglė',
    darVienas: 'Klevas',
    vaSita: 'Pušis'
}

const { darVienas: kasTu, vaSita = 'Kazkas tokio', ...visisKiti } = medziuObjektas;

console.log(kasTu, vaSita, visisKiti);

console.clear();

const uzduotiesMasyvasNr1 = [
    { spalva: 'raudona', kiekis: 5, gera: true },
    { spalva: 'mėlyna', kiekis: 11, gera: false },
    { spalva: 'žalia', kiekis: 74, gera: true },
    { spalva: 'juoda', kiekis: -8, gera: false },
    { spalva: 'balta', kiekis: 0, gera: true },
];

// 1. Sukurkite naują masyvą, pagal Nr1 kuriame visos spalvos būtų 'geltona'. Naudoti map metodą ir spread operator'ius.;


const uzd1 = uzduotiesMasyvasNr1.map(obj => ({ ...obj, spalva: 'geltona' }));

console.log(uzd1);

// 2. Sukurkite naują masyvą, pagal Nr1 kuriame visi kiekiai būtų 0. Naudoti map metodą ir spread operator'ius.;


const uzd2 = uzduotiesMasyvasNr1.map(obj => ({ ...obj, kiekis: 0 }));

console.log(uzd2);


// 3. Sukurkite naują masyvą, pagal Nr1 kuriame visi kiekiai būtų vienetu didesni nei buvo. Naudoti map metodą ir spread operator'ius.;

const uzd3 = uzduotiesMasyvasNr1.map(obj => ({ ...obj, kiekis: obj.kiekis + 1 }));

const uzd3SuFor = [];

for (const obj of uzduotiesMasyvasNr1) {
    const kopija = { ...obj };
    kopija.kiekis++;
    uzd3SuFor.push(kopija);
}

console.log(uzd3SuFor);

// 4. Sukurkite naują masyvą, pagal Nr1 kuriame kas buvo gera tapo bloga, o kas buvo bloga, tapo gera. Naudoti map metodą ir spread operator'ius.;

const uzd4 = uzduotiesMasyvasNr1.map(obj => ({ ...obj, gera: !obj.gera }));

console.log(uzd4);



// 5. Sukurkite naują masyvą, pagal Nr1 kuriame kas buvo balta tapo juoda, o kas buvo juoda, tapo balta. Naudoti map metodą ir spread operator'ius.;


const uzd5 = uzduotiesMasyvasNr1.map(obj => {
    switch (obj.spalva) {
        case 'balta': return { ...obj, spalva: 'juoda' };
        case 'juoda': return { ...obj, spalva: 'balta' };
        default: return obj;
    }
});

console.log(uzd5);


// 6. Sukurkite naują masyvą, pagal Nr1 kuriame visos geros spalvos taptų 'geltona'. Naudoti map metodą ir spread operator'ius.;


const uzd6 = uzduotiesMasyvasNr1.map(obj => obj.gera ? { ...obj, spalva: 'geltona' } : obj);

console.log(uzd6);







