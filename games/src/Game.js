import Create from './Create.js';
import Read from './Read.js';
import Edit from './Edit.js';
import Delete from './Delete.js';
import Select from './Select.js';


class Game {

    constructor() {
        this.page = 'games';
        this.Read = new Read(this);
        this.Create = new Create(this);
        this.Edit = new Edit(this);
        this.Delete = new Delete(this);

        this.rangeHelper(document);

        new Select('genres', 'data-select-genres', 'genre_id');
        
    }

    rangeHelper(el) {
        el.querySelectorAll('[type=range]').forEach(range => {
            const output = range.closest('div').querySelector('label span');
            output.innerText = range.value;
            range.addEventListener('input', _ => {
                output.innerText = range.value;
            });
        });
    }



}

export default Game;