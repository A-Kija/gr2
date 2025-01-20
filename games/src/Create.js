import Request from './Request.js';

class Create extends Request {

    constructor(page) {
        super(page);
        this.form = document.querySelector('[data-form=create]');

        this.form.querySelector('[data-type=submit]')
        .addEventListener('click', this.submitCreate.bind(this));

        console.log(this.form);
    }

    submitCreate() {
        console.log('Submit create');
    }

}

export default Create;