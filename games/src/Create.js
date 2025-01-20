import Request from './Request.js';

class Create extends Request {

    constructor(page) {
        super(page);
        this.form = document.querySelector('[data-form=create]');

        this.form.querySelector('[data-type=submit]')
        .addEventListener('click', this.submitCreate.bind(this));


    }

    submitCreate() {
        this.create(this.collectData());
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