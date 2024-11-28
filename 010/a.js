


// localStorage.setItem('kate', 'Tom');
// localStorage.setItem('pale', 'Jerry');


console.log(localStorage.getItem('kate'));

console.log(localStorage.getItem('bebras'));

localStorage.removeItem('pale');


localStorage.setItem('skaicius', 101);

console.log(localStorage.getItem('skaicius'));

const sitasObjektas = {
    a: 1,
    b: 2,
    c: 3
}

const sitasObjektasString = JSON.stringify(sitasObjektas);

localStorage.setItem('objektas', sitasObjektasString);

const gautasObjektasString = localStorage.getItem('objektas');

const gautasObjektas = JSON.parse(gautasObjektasString);

console.log(gautasObjektas);


const mas = [
    {id: 1, name: 'Jonas', age: 99},
    {id: 2, name: 'Bebras', age: 88},
    {id: 3, name: 'Ona', age: 77},
];


// const istrintasBebras = mas.filter(obj => obj.id !== 2);

// console.log(istrintasBebras);


const again18 = mas.map(obj => {
    if (obj.id == 2) {
        obj.age = 18;
    }
    return obj;
});


console.log(again18);

