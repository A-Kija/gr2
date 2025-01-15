import axios from 'axios';


const URL = 'http://localhost:3000/';


const init = _ => {
    getTrees();
    doSearch();



    const createForm = document.querySelector('[data-form-create]');
    const deleteForm = document.querySelector('[data-form-delete]');
    const editForm = document.querySelector('[data-form-edit]');

    createForm.querySelector('button').addEventListener('click', _ => {
        const inputs = createForm.querySelectorAll('[name]');
        const data = {};

        inputs.forEach(input => {
            data[input.getAttribute('name')] = input.value;
            input.value = '';
        });

        axios.post(URL + 'sodinti-medi', data)
            .then(res => {
                console.log(res.data);
                getTrees();
            })
            .catch(error => {
                console.log('Klaida siunčiant duomenis į DB');
            });

    });

    deleteForm.querySelector('button').addEventListener('click', _ => {
        const id = deleteForm.querySelector('[name="id"]').value;
        deleteForm.querySelector('[name="id"]').value = '';
        
        axios.delete(URL + 'iskasti-medi/' + id)
            .then(res => {
                console.log(res.data);
                getTrees();
            })
            .catch(error => {
                console.log('Klaida trinant duomenis iš DB');
            });
    });


    editForm.querySelector('button').addEventListener('click', _ => {
        const inputs = editForm.querySelectorAll('[name]');
        const data = {};

        inputs.forEach(input => {
            data[input.getAttribute('name')] = input.value;
            input.value = '';
        });

        const id = data.id;
        delete data.id;

        axios.put(URL + 'persodinti-medi/' + id, data)
            .then(res => {
                console.log(res.data);
                getTrees();
            })
            .catch(error => {
                console.log('Klaida siunčiant duomenis į DB');
            });
    });
}

const doSearch = _ => {
    const searchField = document.querySelector('[data-search]');

    searchField.addEventListener('input', _ => {
        const q = searchField.value;
        if (q.length < 2) {
            getTrees(1);
            return;
        }
        getTrees(1, q);
    });


}


const getTrees = (ap = 1, q = '') => {
    const qurl = q ? '?q=' + q : '';
    axios.get(URL + 'medziu-sarasas/' + ap + qurl)
        .then(res => {
            console.log(res.data);
            renderTrees(res.data);
            getPaginator(ap, q);
        })
        .catch(error => {
            console.log('Klaida gaunant duomenis iš DB');
        });
}


const renderTrees = trees => {
    const listTemplate = document.querySelector('template[data-list]');
    const listUL = document.querySelector('ul[data-list]');
    listUL.innerHTML = '';

    trees.forEach(tree => {
        const li = document.importNode(listTemplate.content, true);
        li.querySelector('[data-list-id]').innerText = tree.id + '.';
        li.querySelector('[data-list-name]').innerText = tree.name;
        li.querySelector('[data-list-height]').innerText = tree.height.toFixed(2) + ' m';
        li.querySelector('[data-list-type]').innerText = tree.type;
        listUL.appendChild(li);
    });
}

const getPaginator = (ap, q = '') => {
    const qurl = q ? '?q=' + q : '';
    axios.get(URL + 'medziu-skaicius' + qurl)
        .then(res => {
            console.log(res.data);
            renderPaginator(res.data.pages, ap, q);
        })
        .catch(error => {
            console.log('Klaida gaunant duomenis iš DB');
        });
}

const renderPaginator = (pages, activPage, q) => {
    const paginator = document.querySelector('div[data-paginator]');
    paginator.innerHTML = '';
    let span;
    span = document.createElement('span');
    span.innerText = 'Atgal';
    if (activPage !== 1) {
        span.classList.add('active');
        span.addEventListener('click', _ => {
            getTrees(activPage - 1, q);
        });
    }
    paginator.appendChild(span);

    for (let i = 1; i <= pages; i++) {
        const span = document.createElement('span');
        span.innerText = i;
        if (i !== activPage) {
            span.classList.add('active');
            span.addEventListener('click', _ => {
                getTrees(i, q);
            });
        } else {
            span.classList.add('current');
        }
        paginator.appendChild(span);
    }

    span = document.createElement('span');
    span.innerText = 'Pirmyn';
    if (activPage !== pages) {
        span.classList.add('active');
        span.addEventListener('click', _ => {
            getTrees(activPage + 1, q);
        });
    }
    paginator.appendChild(span);
}



init();