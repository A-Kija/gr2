import Create from './Create.js';
import Read from './Read.js';
import Edit from './Edit.js';


class Genre {

    constructor() {
        this.page = 'genres';
        this.Read = new Read(this);
        this.Create = new Create(this);
        this.Edit = new Edit(this);


        
    }



}

export default Genre;