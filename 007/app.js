console.log('Įvykiai');


const mygtukas1 = document.querySelector('#btn1');


mygtukas1.addEventListener('click', e => {
    console.log('Paspaustas mygtukas 1', e);
});

mygtukas1.addEventListener('dblclick', _ => {
    console.log('Paspaustas du kart mygtukas 1');
});

mygtukas1.addEventListener('mouseenter', _ => {
    console.log('Pelė virš mygtuko 1');
});

window.addEventListener('scroll', _ => {
    console.log('Pelė skrolina puslapį');
});

const mygtukas2 = document.querySelector('#btn2');

mygtukas2.addEventListener('click', _ => {

    console.log(mygtukas2.style.backgroundColor);

    if (mygtukas2.style.backgroundColor === 'lightcoral') {
        mygtukas2.style.backgroundColor = 'lightblue';
    } else {
        mygtukas2.style.backgroundColor = 'lightcoral';
    }


});

const mygtukas3 = document.querySelector('#btn3');

mygtukas3.addEventListener('click', _ => {

    const busena = mygtukas3.dataset.busena || 'pradine';

    console.log(busena);

    if (busena === 'pradine') {
        mygtukas3.dataset.busena = 'pakeista';
        mygtukas3.style.backgroundColor = '#45CD10';
        mygtukas3.style.letterSpacing = '4px';
    } else {
        mygtukas3.dataset.busena = 'pradine';
        mygtukas3.style.backgroundColor = '#4CAF50';
        mygtukas3.style.letterSpacing = '1px';
    }

});


const boxes = document.querySelectorAll('section .faq-box');


boxes.forEach(box => {

    box.addEventListener('click', e => {
        const box = e.target.closest('.faq-box');

        if (box.dataset.state === 'open') {
            boxClose(box);
        } else {
            boxes.forEach(b => boxClose(b));
            boxOpen(box);
        }
    });

});

const boxOpen = box => {
    box.dataset.state = 'open';
    const answer = box.querySelector('.answer');
    answer.style.maxHeight = answer.scrollHeight + 'px';
}

const boxClose = box => {
    box.dataset.state = 'closed';
    const answer = box.querySelector('.answer');
    answer.style.maxHeight = 0;
}


fetch('https://in3.dev/inv/')
.then(response => response.json())
.then(data => {
    console.log(data);
});

console.log('Pabaiga');


