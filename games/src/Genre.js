import Create from './Create.js';
import Read from './Read.js';


class Genre {

    constructor() {
        this.Read = new Read('genres');
        new Create('genres', this.Read);
        
    }



}

export default Genre;