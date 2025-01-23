import Request from './Request.js';

class Select extends Request {

    constructor(page, dataSelector, selectName) {
        super(page);
        this.dataSelector = dataSelector;
        this.selectName = selectName
        this.read();
    }

    renderSelect(data) {
        const selects = document.querySelectorAll(`[${this.dataSelector}]`);
        selects.forEach(select => {
            const s = document.createElement('select');
            s.classList.add('form-select');
            s.name = this.selectName;
            data.forEach(item => {
                const option = document.createElement('option');
                option.value = item.id;
                option.innerText = item.title;
                s.appendChild(option);
            });
            select.appendChild(s);
        });
    }
    
    response(response) {
        this.renderSelect(response.data);
    }
}

export default Select;