
const input1 = document.querySelector('#nr1 input');
const button1 = document.querySelector('#nr1 button');

button1.addEventListener('click', _ => {
    console.log(input1.value);
});



const input2 = document.querySelector('#nr2 input');

input2.addEventListener('input', _ => {
    console.log(input2.value);
});



const input3 = document.querySelector('#nr3 input');

console.log(input3.value);




const select4 = document.querySelector('#nr4 select');
const button4 = document.querySelector('#nr4 button');

button4.addEventListener('click', _ => {
    console.log(select4.value);
});




const text5 = document.querySelector('#nr5 textarea');
const button5 = document.querySelector('#nr5 button');

button5.addEventListener('click', _ => {
    console.log(text5.value);
});



const radio6 = document.querySelectorAll('#nr6 input');
const button6 = document.querySelector('#nr6 button');

button6.addEventListener('click', _ => {
    radio6.forEach(radio => {
        if (radio.checked) {
            console.log(radio.value);
        }
    });
});


const cb7 = document.querySelectorAll('#nr7 input');
const button7 = document.querySelector('#nr7 button');

button7.addEventListener('click', _ => {
    let allChecked = '';
    cb7.forEach(cb => {
        if (cb.checked) {
            allChecked += cb.value;
        }
    });
    console.log(allChecked);
});


const input8 = document.querySelector('#nr8 input');
const button8 = document.querySelector('#nr8 button');
const div8 = document.querySelector('#nr8 div');

button8.addEventListener('click', _ => {
    console.log(input8.value);
});

input8.addEventListener('input', _ => {
    div8.innerText = input8.value;
});


// Devintoje sekcijoje sukurti "color" tipo input elementą. Keičiant jo reikšmę, keisti puslapio fono spalvą.

const input9 = document.querySelector('#nr9 input');
const body = document.querySelector('body');

input9.addEventListener('input', _ => {
    body.style.backgroundColor = input9.value;
});

const sw = document.querySelector('#nr10 .switch');

const handle = sw.querySelector('.handle');

handle.addEventListener('click', _ => {
    if (sw.dataset.pos === 'on') {
        sw.dataset.pos = 'off';
        body.classList.remove('dark');
        body.classList.add('light');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.remove('light');
        body.classList.add('dark');
        sw.dataset.pos = 'on';
        localStorage.setItem('theme', 'dark');
    }
});


const theme = localStorage.getItem('theme') || 'light';
if (theme === 'dark') {
    body.classList.add('dark');
    sw.dataset.pos = 'on';
} else {
    body.classList.add('light');
    sw.dataset.pos = 'off';
}