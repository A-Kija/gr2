const spalvosIveste = document.querySelector('input');
const gautumosMygtukas = document.querySelector('button');
const kurDetSpalvosVarda = document.querySelector('h2 span');    

gautumosMygtukas.addEventListener('click', _ => {
    const spalva = spalvosIveste.value;
    const spalvaBeGroteliu = spalva.replace('#', '');

    const nuorodaISpalvuAPI = `https://www.thecolorapi.com/id?hex=${spalvaBeGroteliu}`;

    fetch(nuorodaISpalvuAPI)
        .then(response => response.json())
        .then(data => {
            const spalvosVardas = data.name.value;
            kurDetSpalvosVarda.innerText = spalvosVardas;
        });
});