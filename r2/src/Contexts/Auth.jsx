import { createContext, useEffect, useState } from 'react';
import axios from 'axios';


const AuthContext = createContext();
const server = 'http://localhost:3333/';

export const Auth = ({children}) => {

    const [user, setUser] = useState(null);


    useEffect(_ => {
        axios.get(server + 'get-user', { withCredentials: true })
            .then(response => {
                console.log('get-user', response.data);
                setUser(response.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <AuthContext.Provider value={{user, setUser}}>
            {user ? children : 'Trying to authenticate...'}
        </AuthContext.Provider>
    );

}

export default AuthContext;