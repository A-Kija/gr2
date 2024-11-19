console.log('js003/app.js');

/*
Palyginimo operatoriai:
- lygu: == (ar lygu?)
- nelygu: != (ar nelygu?)
- griežtai lygu: === (ar lygu ir tipas?)
- griežtai nelygu: !== (ar nelygu ir tipas?)
- daugiau: > (ar daugiau?)
- daugiau arba lygu: >= (ar daugiau arba lygu?)
- mažiau: < (ar mažiau?)
- mažiau arba lygu: <= (ar mažiau arba lygu?)

Loginiai operatoriai:
- ir: && (ar abu teisingi?)
- arba: || (ar bent vienas teisingas?)
- ne: ! (priešinga reikšmė)
*/

console.log('1 == "1"', 1 == '1');
console.log('1 === "1"', 1 === '1');

console.log('1 == "2"', 1 == '2');
console.log('1 === "2"', 1 === '2');


const obj1 = {
    name: 'Jonas'
};

const obj2 = {
    name: 'Jonas'
};

console.log('obj1.name != obj2.name', obj1.name != obj2.name);

const obj3 = obj1;
const objABCDEF = obj1;

console.log('obj1 == obj2', obj1 == obj2);

console.log('obj1 == obj3', objABCDEF == obj3);

console.log('5 > 5', 5 > 5);
console.log('5 >= 5', 5 >= 5);

console.log('5 < 5', 5 < 5);
console.log('5 <= 5', 5 <= 5);

console.log('obj1 > obj2', obj1 > obj2 );

const section1 = document.querySelector('.section1');
const section2 = document.querySelector('.section2');

console.log('section1 == section2', section1 == section2);


console.log('5 > 10 || 5 > 4', 5 > 10 || 5 > 4);
console.log('5 > 10 && 5 > 4', 5 > 10 && 5 > 4);
console.log('!(5 > 10) && 5 > 14', !(5 > 10) && 5 > 14);

console.log('!(5 > 10 && 5 > 14)', !(5 > 10 && 5 > 14));

console.log('!5 > 10', !5 > 10);

console.log(!5 + 0);


const A = 10;
const B = 101;

if (A > B) {
    console.log('A yra daugiau uz B');
} else if (A === B) {
    console.log('A yra lygu B');
} else {
    console.log('B yra daugiau uz A');
}

if ('') {
    console.log('true');
} else {
    console.log('false');
}

// Klausimas kuriame tage span ar p yra didesnis skaitmuo
// naudojant if, querySelector, innerText, parseInt

const span = document.querySelector('span');
const p = document.querySelector('p');

const spanNumber = parseInt(span.innerText);
const pNumber = parseInt(p.innerText);

if (spanNumber > pNumber) {
    console.log('span yra didesnis');
} else if (spanNumber === pNumber) {
    console.log('span yra lygus');
} else {
    console.log('p yra didesnis');
}
