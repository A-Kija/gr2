import { useEffect, useState } from 'react';
import axios from 'axios';
import * as C from '../Constants/main';

export default function useAuth() {

    const [loginForm, setLoginForm] = useState(null);
    const [responseOkUser, setResponseOkUser] = useState(null);
    const [responseOkLogin, setResponseOkLogin] = useState(null);


    const getUser = _ => {
        axios.get(C.SERVER_URL + 'auth-user', { withCredentials: true })
        .then(res => {
            console.log(res);
            setResponseOkUser(res.data);
        })
        .catch(err => {
            console.log(err);
        });
    }


    useEffect(_ => {
        if (null === loginForm) {
            return;
        }
        axios.post(C.SERVER_URL + 'login', loginForm, { withCredentials: true })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err)
            });

    }, [loginForm]);






    return { setLoginForm, getUser, responseOkUser, responseOkLogin }

}