import Request from './Request.js';

class Delete extends Request {
    constructor(Page) {
        super(Page.page);
        this.Page = Page;



        this.form = document.querySelector('[data-form=delete]');
        this.modal = document.querySelector('[data-modal=delete]');

        this.modal.querySelectorAll('[data-type="cancel"]').forEach(button => {
            button.addEventListener('click', this.hideModal.bind(this));
        });
        

        // this.form.querySelector('[data-type=submit]')
        // .addEventListener('click', this.submitEdit.bind(this));
    }


    // submitEdit() {
    //     const id = this.form.dataset.id;
    //     this.edit(this.collectData(), id);
    //     this.hideModal();
    // }

    showModal(item) {
        this.modal.style.display = 'block';
        const keys = Object.keys(item); //[id, title, ...]
        keys.forEach(key => {
            if (this.form.querySelector(`[data-key=${key}]`)) {
                this.form.querySelector(`[data-key=${key}]`).innerText = item[key];
            }
        });
        this.form.dataset.id = item.id;
    }

    hideModal() {
        this.modal.style.display = 'none';
    }
}

export default Delete;