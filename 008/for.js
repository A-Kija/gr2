
const animals = [
    '🐶',
    '🐱',
    '🐭',
    '🐹',
    '🐰',
    '🦊',
];


for (let i = 0; i < animals.length; i++) {
    console.log(i, animals[i]);
}


const forEachByMyself = (list, action) => {
    for (let i = 0; i < list.length; i++) {
        action(list[i], i);
    }
}

console.log('-----------------');


forEachByMyself(animals, (animal, i) => console.log(i, animal));


console.log('-----------------');

const fun = (animal, i) => console.log(i, animal);


animals.forEach(fun);





    
