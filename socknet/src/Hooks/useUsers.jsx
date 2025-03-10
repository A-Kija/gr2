import { useReducer, useEffect } from 'react';
import * as C from '../Constants/main';
import axios from 'axios';

export default function useUsers() {

    const [users, dispatchUsers] = useReducer(null, null);

    useEffect(_ => {
        axios.get(C.SERVER_URL + 'users/active-list')
            .then(res => {
                console.log(res.data)
            })
            .catch(error => {
                console.log(error)
            });
    }, []);



    return { users, dispatchUsers }
}