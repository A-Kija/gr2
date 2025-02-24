import { createContext, useEffect, useState } from 'react';
import axios from 'axios';


const AuthContext = createContext();
const server = 'http://localhost:3333/';

export const Auth = ({children}) => {

    const [user, setUser] = useState(null);

    useEffect(_ => {
        axios.get(server + 'get-user', { withCredentials: true })
            .then(response => {
                setUser(response.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <AuthContext.Provider value={{}}>
            {user ? children : 'Trying to authenticate...'}
        </AuthContext.Provider>
    );

}

export default Auth;