import Create from './Create.js';
import Read from './Read.js';
import Edit from './Edit.js';
import Delete from './Delete.js';


class Genre {

    constructor() {
        this.page = 'genres';
        this.Read = new Read(this);
        this.Create = new Create(this);
        this.Edit = new Edit(this);
        this.Delete = new Delete(this);


        
    }



}

export default Genre;