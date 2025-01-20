import axios from 'axios';

class Request {

    constructor(page) {
        this.url = URL_API + page;
    }

    create(data) {
        axios.post(this.url, data)
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        });
    }

}

export default Request;