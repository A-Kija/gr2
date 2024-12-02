console.log('app.js');


const animals = [
    { name: 'cat', sound: 'meow' },
    { name: 'dog', sound: 'woof' },
    { name: 'cow', sound: 'moo1' },
    { name: 'chicken', sound: 'cluck' },
    { name: 'horse', sound: 'neigh' },
    { name: 'pig', sound: 'oink' },
    { name: 'sheep', sound: 'baa' },
    { name: 'duck', sound: 'quack' },
    { name: 'goose', sound: 'honk' },
    { name: 'cow', sound: 'moo2' },
    { name: 'turkey', sound: 'gobble' },
];

const cow1 = animals.filter(animal => animal.name === 'cow');

console.log(cow1);

const cow2 = animals.find(animal => animal.name === 'cow');

console.log(cow2);


const trees = [
    { name: 'oak', count: -100 },
    { name: 'birch', count: -50 },
    { name: 'pine', count: -75 },
    { name: 'oak', count: -150 },
    { name: 'birch', count: -25 },
    { name: 'pine', count: -50 },
    { name: 'oak', count: -200 },
    { name: 'birch', count: -75 },
    { name: 'pine', count: -100 }
];

const allTrees = trees.reduce((total, tree) => total + tree.count, 0);

const allPines = trees.reduce((total, tree) => tree.name === 'pine' ? total + tree.count : total, 0);

const maxCount = trees.reduce((max, tree) => tree.count > max ? tree.count : max, -Infinity);


console.log(maxCount);

//by name

trees.sort((a, b) => b.name.localeCompare(a.name));

const names = ['Ąžuolas', 'Žąsinas', 'Avis', 'Vilkas', 'Ėriukas', 'Šuo', 'Zebras', 'Saulė'];

names.sort((a, b) => a.localeCompare(b, 'lt'));

console.log(names);