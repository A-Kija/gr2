import { createContext, useEffect, useState } from 'react';
import useAuth from '../Hooks/useAuth';


const Auth = createContext();


export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const { getUser, responseOkUser } = useAuth();

    useEffect(_ => {
        getUser();
    }, []);


    useEffect(_ => {
        if (null === responseOkUser) {
            return;
        }

    }, [responseOkUser]);


    return (
        <Auth.Provider value={{
            user, setUser
        }}>
            {null === user ? <span>Autorizacija...</span> : children}
        </Auth.Provider>
    );
}

export default Auth;