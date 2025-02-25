import { createContext, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import RouterContext from './Router';
import Page401 from '../Components/Page401';


const AuthContext = createContext();
const server = 'http://localhost:3333/';

export const Auth = ({children}) => {

    const [user, setUser] = useState(null);

    const { page, Routes } = useContext(RouterContext);

    const doAuth = _ => {
        if (!Routes.get(page)?.auth) {
            return children;
        }
        if (user && user.role === 'guest') {
            window.location.assign('#login');
            return null;
        }
        if (user && Routes.get(page).auth.includes(user.role)) {
            return children;
        }
        return <Page401 />;
    }

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
            {user ? doAuth() : 'Trying to authenticate...'}
        </AuthContext.Provider>
    );

}

export default AuthContext;