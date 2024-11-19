console.log('Hello from app.js');

const zodis = 'Barsukas';




console.log(zodis.length, '->', zodis[zodis.length - 1]);


// console.log(zodis[0]);
// console.log(zodis[1]);
// console.log(zodis[2]);
// console.log(zodis[3]);
// console.log(zodis[4]);
// console.log(zodis[5]);
// console.log(zodis[6]);
// console.log(zodis[7]);

for (let i = 0; i < 10; i++) {
    // eilutė kartoja kodą 10 kartų
    console.log(i);
}

console.clear();

for (let i = 0; i < zodis.length; i++) {
    console.log(zodis[i]);
}

console.clear();

const li = document.querySelector('ul li');

console.log(li, li.innerText);

const lis = document.querySelectorAll('ul li');

console.log(lis, lis[3].innerText, lis.length);

for (let i = 0; i < lis.length; i++) {
    console.log(lis[i].innerText);
}

// const v1 = `dvi eilutes`;



let barsukoHtml = '';

for (let i = 0; i < zodis.length; i++) {
    // barsukoHtml += '<span>' + zodis[i] + '</span>';
    barsukoHtml += `<span>${zodis[i]}</span>`;
}

console.log(barsukoHtml);

document.querySelector('section').innerHTML = barsukoHtml;