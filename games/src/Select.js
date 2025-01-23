import Request from './Request.js';

class Select extends Request {

    constructor(page) {
        super(page);
    }


    renderSelect(data) {
        const select = document.querySelector('[data-select]');
        select.innerHTML = '';
        data.forEach(item => {
            const option = document.createElement('option');
            option.value = item.id;
            option.innerText = item.title;
            select.appendChild(option);
        });
    }



}

export default Select;