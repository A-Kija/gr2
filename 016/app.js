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
