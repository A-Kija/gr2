import axios from 'axios';


const URL = 'http://localhost:3000/';


const init = _ => {
    getTrees();

    const createForm = document.querySelector('[data-form-create]');
    const deleteForm = document.querySelector('[data-form-delete]');

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


}


const getTrees = _ => {
    axios.get(URL + 'medziu-sarasas')
        .then(res => {
            console.log(res.data);
            renderTrees(res.data);
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



init();