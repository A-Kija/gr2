import axios from 'axios';
import { useState, useEffect } from 'react';

export default function usePost(url) {

    const server = 'http://localhost:3333/';

    const [data, setData] = useState(null);
    const [response, setResponse] = useState(null);

    useEffect(_ => {
        if (null === data) {
            return;
        }
        axios.post(server + url, data, { withCredentials: true })
            .then(response => {
                setResponse(response.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [url, data]);

    return { setData, response };

}