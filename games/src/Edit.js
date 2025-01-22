import Request from './Request.js';

class Edit extends Request {
    constructor(Page) {
        super(Page.page);
        this.Page = Page;



        this.form = document.querySelector('[data-form=edit]');
        this.modal = document.querySelector('[data-modal=edit]');
        

        // this.form.querySelector('[data-type=submit]')
        // .addEventListener('click', this.submitCreate.bind(this));
    }

    showModal() {
        this.modal.style.display = 'block';
    }

    hideModal() {
        this.modal.style.display = 'none';
    }
}

export default Edit;