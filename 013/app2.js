console.log('app2.js');

const masyvas = new Array('b', 'z', 'a', 'd');

const objektas = {b: 'b', z: 'z', a: 'a', d: 'd'};

console.log(masyvas);
console.log(objektas);

console.log(objektas.hasOwnProperty('b88'));


const mapas = new Map([['b', 'b'], ['z', 'z'], ['a', 'a'], ['d', 'd']]);

mapas.set('zuikis', 'kiškis');
mapas.set('raktas', 'reikšmė');



mapas.set('zuikis', 'vilkas');

const A = {a: 'a'};
const B = A;
const C = B;


mapas.set(A, 123456);

mapas.set(B, 789789);

mapas.set(function() {return 'Ate';}, function() {return 'labas';});



const reiksme = mapas.get({a: 'a'});

mapas.delete('b');

console.log(reiksme);

console.log(mapas);

console.log(mapas.size);

const setas = new Set(['b', 'z', 'a', 'd']);

setas.add('b');
setas.add('u');


console.log(setas);

console.log(setas.has('b'));

setas.delete('b');

console.log(setas.size);

