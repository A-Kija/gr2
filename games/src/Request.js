import axios from 'axios';

class Request {

    constructor(page) {
        this.url = URL_API + page;
    }

    edit(data, id) {
        axios.put(this.url + '/' + id, data)
        .then(res => {
            console.log(res);
            this.response(res);
        })
        .catch(err => {
            console.log(err);
        });
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

    collectData() {
        const data = {};
        this.form.querySelectorAll('[name]')
        .forEach(input => {
            data[input.name] = input.value;
        });

        return data;
    }

    response(response) {
        this.Page.Read.read();
    }

}

export default Request;