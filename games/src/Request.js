import axios from 'axios';

class Request {

    constructor(page) {
        this.url = URL_API + page;
    }

    create(data) {
        axios.post(this.url, data)
        .then(res => {
            console.log(res);
            this.response(res);
        })
        .catch(err => {
            console.log(err);
        });
    }

    read() {
        axios.get(this.url)
        .then(res => {
            this.response(res);
        })
        .catch(err => {
            console.log(err);
        });
    }

}

export default Request;