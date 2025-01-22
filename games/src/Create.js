import Request from './Request.js';

class Create extends Request {

    constructor(Page) {
        super(Page.page);
        this.form = document.querySelector('[data-form=create]');
        this.Page = Page;

        this.form.querySelector('[data-type=submit]')
        .addEventListener('click', this.submitCreate.bind(this));
    }

    response(response) {
        this.Page.Read.read();
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