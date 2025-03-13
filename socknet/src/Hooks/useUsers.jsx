import { useReducer, useEffect } from 'react';
import * as C from '../Constants/main';
import * as A from '../Constants/actions';
import axios from 'axios';
import usersReducer from '../Reducers/usersReducer';

export default function useUsers() {

    

    const [users, dispatchUsers] = useReducer(usersReducer, null); // aprasytas steitas

    console.log('useUsers', 'user:', users?.length);
    
    
    useEffect(_ => {
        console.log('useUsers UseEffect start - request to server');
        let s = 0;
        const timer = setInterval(_ => {
            s += 400;
            console.log('waiting users ms...', s);
        }, 400);
        axios.get(C.SERVER_URL + 'users/active-list')
            .then(res => {
                clearTimeout(timer);
                // console.log(res.data.db); // is serverio gauti users duomenys
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