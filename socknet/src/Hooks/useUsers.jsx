import { useReducer, useEffect } from 'react';
import * as C from '../Constants/main';
import * as A from '../Constants/actions';
import axios from 'axios';
import usersReducer from '../Reducers/usersReducer';

export default function useUsers() {

    const [users, dispatchUsers] = useReducer(usersReducer, null); // aprasytas steitas

    useEffect(_ => {
        axios.get(C.SERVER_URL + 'users/active-list')
            .then(res => {
                console.log(res.data.db); // is serverio gauti users duomenys
                // action yra OBJEKTAS dispatch viduje
                dispatchUsers({
                    type: A.LOAD_ACTIVE_USERS_FROM_SERVER, // tipas ka daryt
                    payload: res.data.db // payloadas su kuo tai daryt
                });
            })
            .catch(error => {
                console.log(error)
            });
    }, []);



    return { users, dispatchUsers }
}