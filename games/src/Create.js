import Request from './Request.js';

class Create extends Request {

    constructor(page, Read) {
        super(page);
        this.form = document.querySelector('[data-form=create]');

        this.form.querySelector('[data-type=submit]')
        .addEventListener('click', this.submitCreate.bind(this));
        this.Read = Read;


    }

    response(response) {
        this.Read.read();
    }

    submitCreate() {
        this.create(this.collectData());
        this.form.querySelectorAll('[name]')
        .forEach(input => {
            input.value = '';
        });
    }

    collectData() {
        const data = {};
        this.form.querySelectorAll('[name]')
        .forEach(input => {
            data[input.name] = input.value;
        });

        return data;
    }

}

export default Create;