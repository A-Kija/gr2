import Request from './Request.js';

class Edit extends Request {
    constructor(Page) {
        super(Page.page);
        this.Page = Page;



        this.form = document.querySelector('[data-form=edit]');
        this.modal = document.querySelector('[data-modal=edit]');

        this.modal.querySelectorAll('[data-type="cancel"]').forEach(button => {
            button.addEventListener('click', this.hideModal.bind(this));
        });
        

        this.form.querySelector('[data-type=submit]')
        .addEventListener('click', this.submitEdit.bind(this));
    }


    submitEdit() {
        const id = this.form.dataset.id;
        this.edit(this.collectData(), id);
        this.hideModal();
    }

    showModal(item) {
        this.modal.style.display = 'block';
        const keys = Object.keys(item); //[id, title, ...]
        keys.forEach(key => {
            if (this.form.querySelector(`[name=${key}]`)) {
                const i = this.form.querySelector(`[name=${key}]`);
                if (['text','range'].includes(i.type)) {
                    i.value = item[key];
                    if (i.type === 'range') {
                        i.dispatchEvent(new Event('input'));
                    }
                }

            }
        });
        this.form.dataset.id = item.id;
    }

    hideModal() {
        console.log(this);
        this.modal.style.display = 'none';
    }
}

export default Edit;