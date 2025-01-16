import axios from 'axios';


const URL = 'http://localhost:3000/';


const init = _ => {
    getClients('inner');
    getClients('left');
    getClients('right');
}

const getClients = t => {
    axios.get(URL + 'klientai/' + t)
        .then(res => {
            console.log(res.data);
            renderClients(res.data, t);
        })
        .catch(error => {
            console.log('Klaida gaunant duomenis iš DB');
        });
}



const renderClients = (clients, list) => {

    const lists = {
        inner: document.querySelector('ul[data-list-inner]'),
        left: document.querySelector('ul[data-list-left]'),
        right: document.querySelector('ul[data-list-right]')
    };

    const listTemplate = document.querySelector('template[data-list]');
    const listUL = lists[list];
    listUL.innerHTML = '';

    const liTop = `
        <span data-list-cid class="id">cid</span>
        <span data-list-name class="name">name</span>

        <span data-list-pid class="id">pid</span>
        <span data-list-number class="number">number</span>
        <span data-list-cpid class="id">c_id</span>
    `;

    const liTopEl = document.createElement('li');
    liTopEl.innerHTML = liTop;
    listUL.appendChild(liTopEl);

    clients.forEach(client => {
        const li = document.importNode(listTemplate.content, true);
        li.querySelector('[data-list-cid]').innerText = client.id + '.';
        li.querySelector('[data-list-name]').innerText = client.name;

        li.querySelector('[data-list-pid]').innerText = client.id + '.';
        li.querySelector('[data-list-number]').innerText = client.number;
        li.querySelector('[data-list-cpid]').innerText = client.client_id + '.';
        listUL.appendChild(li);
    });
}

init();