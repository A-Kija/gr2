import { createContext } from 'react';
import useUsers from '../Hooks/useUsers';

const Data = createContext();


export const DataProvider = ({ children }) => {

    const { users, dispatchUsers } = useUsers();

    return (
        <Data.Provider value={{
            users, dispatchUsers
        }}>
            {children}
        </Data.Provider>
    );
}

export default Data;