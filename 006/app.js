console.log('006 app.js');


const fun1 = kazkokiaFunkcija => {
    const sk1 = 5;
    const sk2 = 7;
    const rezultatas = kazkokiaFunkcija(sk1, sk2);
    return rezultatas;
}

const suma = (a, b) => a + b;

const multi = (a, b) => a * b;


const rez = fun1(suma);

const rez1 = fun1(    (a, b) => a * b     );



console.log(rez, rez1);


const gyvuliai = ['zuikis', 'lapė', 'voverė', 'stirna', 'barsukas', 'laukinis katinas'];


for (let i = 0; i < gyvuliai.length; i++) {
    console.log(i, gyvuliai[i]);
}

console.log('-----------------');

const print = (gyvulys, i) => console.log(i, gyvulys);


gyvuliai.forEach(   (gyvulys, i) => console.log(i, gyvulys)    );

gyvuliai.forEach(gyvulys => console.log(gyvulys));



const miestai = ['Vilnius', 'Kaunas', 'Klaipėda', 'Šiauliai', 'Panevėžys', 'Alytus', 'Marijampolė', 'Mažeikiai', 'Jonava', 'Utena', 'Kėdainiai', 'Telšiai', 'Visaginas', 'Tauragė', 'Ukmergė', 'Plungė', 'Kretinga', 'Šilutė', 'Radviliškis', 'Palanga', 'Druskininkai', 'Rokiškis', 'Šakiai', 'Biržai', 'Elektrėnai', 'Garliava', 'Jurbarkas', 'Švenčionys', 'Lentvaris', 'Anykščiai', 'Prienai', 'Jonava', 'Kaišiadorys', 'Širvintos', 'Kupiškis', 'Zarasai', 'Kelmė', 'Šalčininkai', 'Švenčionėliai', 'Varėna', 'Nemenčinė', 'Trakai', 'Šilalė', 'Kazlų Rūda', 'Šeduva', 'Širvintos', 'Raseiniai', 'Švenčionėliai', 'Šilalė', 'Kazlų Rūda', 'Šeduva', 'Širvintos', 'Raseiniai', 'Švenčionėliai', 'Šilalė', 'Kazlų Rūda', 'Šeduva', 'Širvintos', 'Raseiniai', 'Švenčionėliai', 'Šilalė', 'Kazlų Rūda', 'Šeduva', 'Širvintos', 'Raseiniai', 'Švenčionėliai', 'Šilalė', 'Kazlų Rūda', 'Šeduva'];


// Naudodami forEach išspausdinkite miestų pirmas raides

miestai.forEach(miestas => console.log(miestas[0]));

// Naudodami forEach išspausdinkite miestų paskutines raides

miestai.forEach(miestas => console.log(miestas[miestas.length - 1]));

const A = 10;
const B = 20;

// Naudojat if consolėje atspausdinti kuris skaičius didesnis A ar B

if (A > B) {
    console.log('A daugiau už B');
} else {
    console.log('B daugiau už A');
}

console.clear();

// Naudojant ternary operatorių atspausdinti kuris skaičius didesnis A ar B

const R = (A > B) ? 'A daugiau už B' : 'B daugiau už A'

console.log(R);

console.clear();

const gyvuliai2 = ['zuikis', 'lapė', 'voverė', 'barsukas', 'laukinis katinas', 'stirna'];

const kas1 = gyvuliai2.forEach(gyvulys => console.log(gyvulys)); // nieko negrazina

console.log(kas1);

console.clear();

const kas2 = gyvuliai2.map(gyvulys => gyvulys + '-------*'); // grazina nauja masyva

console.log(kas2);

console.clear();

const secNr1 = document.querySelector('#nr1');

const suDivais = gyvuliai2.map(gyvulys => `<div>${gyvulys}</div>`);

console.log(suDivais);

const htmlGyvuliai = suDivais.join('');

secNr1.innerHTML = htmlGyvuliai;

const zol = ['zuikis', 'voverė', 'stirna']
const mes = ['barsukas', 'laukinis katinas', 'lapė'];


const VisiZol = gyvuliai2.filter(gyvulys => zol.includes(gyvulys));

console.log(VisiZol);


const niekas = gyvuliai2.filter(gyvulys => false);
const visi = gyvuliai2.filter(gyvulys => true);

console.log(niekas, visi);

console.clear();


const kasAntras = gyvuliai2.filter((_, i) => i % 2 === 0);

console.log(kasAntras);




