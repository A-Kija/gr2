const h1 = document.querySelector('h1');
h1.innerText = '1';

const go4Div2 = document.querySelector('#go4 div:nth-of-type(2)');

go4Div2.innerText = '2';

console.log('go4Div2', go4Div2);


const go8Div2 = document.querySelector('#go8 div:nth-of-type(3)');

const color = go8Div2.style.backgroundColor;

console.log('color', color);