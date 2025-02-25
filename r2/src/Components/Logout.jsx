// import Redirect from './Redirect';
import { useContext, useEffect } from 'react';
import AuthContext from '../Contexts/Auth';
import axios from 'axios';

const server = 'http://localhost:3333/';

export default function Logout() {

    const { setUser } = useContext(AuthContext);

    useEffect(_ => {

        

        axios.post(server + 'logout', {}, { withCredentials: true })
            .then(res => {
                setUser(res.data.user);
                window.location.assign('#');
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <>
            Logouting...
        </>
    );

}