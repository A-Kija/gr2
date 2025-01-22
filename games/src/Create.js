import Request from './Request.js';

class Create extends Request {

    constructor(Page) {
        super(Page.page);
        this.form = document.querySelector('[data-form=create]');
        this.Page = Page;

        this.form.querySelector('[data-type=submit]')
        .addEventListener('click', this.submitCreate.bind(this));
    }



    submitCreate() {
        this.create(this.collectData());
        this.form.querySelectorAll('[name]')
        .forEach(input => {
            input.value = '';
        });
    }



}

export default Create;