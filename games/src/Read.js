import Request from './Request.js';

class Read extends Request {

    constructor(Page) {
        super(Page.page);
        this.list = document.querySelector('[data-list]');
        this.template = document.querySelector('[data-list-template]');
        this.listBin = document.querySelector('[data-list-bin]');
        this.Page = Page;

        

        this.list.querySelector('[data-type=submit]')
        .addEventListener('click', this.sortList.bind(this));

        this.list.querySelector('[data-type=search]')
        .addEventListener('input', this.findList.bind(this));

        this.read();


    }

    sortList() {
        this.listData.sort((a, b) => a.age - b.age);
        this.render({data: this.listData});
    }

    findList() {
        const search = this.list.querySelector('[data-type=search]').value;
        const data = this.listData.filter(item => {
            const keys = Object.keys(item);
            for (let i = 0; i < keys.length; i++) {
                if (item[keys[i]].toString().toLowerCase().includes(search.toLowerCase())) {
                    return true;
                }
            }
            return false;
        });
        this.render({data});
    }

    response(response) {
        this.listData = response.data;
        this.render(response);
    }

    render(response) {
        this.listBin.innerHTML = '';
        response.data.forEach(item => {
            const clone = this.template.content.cloneNode(true);
            const keys = Object.keys(item); //[id, title, ...]
            keys.forEach(key => {
                if (clone.querySelector(`[data-key=${key}]`)) {
                    clone.querySelector(`[data-key=${key}]`).innerText = item[key];
                }
            });
            const editButton = clone.querySelector('[data-button-type=edit]');
            editButton.addEventListener('click', _ => {
                this.Page.Edit.showModal(item);
            });
            const deleteButton = clone.querySelector('[data-button-type=delete]');
            deleteButton.addEventListener('click', _ => {
                this.Page.Delete.showModal(item);
            });


            this.listBin.appendChild(clone);
        });
    }



}

export default Read;