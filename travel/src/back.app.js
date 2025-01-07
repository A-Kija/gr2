const Sortable = require('sortablejs');

const el = document.querySelector('#list');
const sortable = Sortable.create(el);



if (document.querySelector('[data-msg]')) {
    const msg = document.querySelector('[data-msg]');
    setTimeout(_ => {
        msg.remove();
    }, 3000);
}