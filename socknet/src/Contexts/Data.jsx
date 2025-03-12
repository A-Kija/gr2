import { createContext } from 'react';
import useUsers from '../Hooks/useUsers';
import usePosts from '../Hooks/usePosts';

const Data = createContext();


export const DataProvider = ({ children }) => {

    const { users, dispatchUsers } = useUsers();
    const { posts, dispatchPosts } = usePosts();

    return (
        <Data.Provider value={{
            users, dispatchUsers,
            posts, dispatchPosts
        }}>
            {children}
        </Data.Provider>
    );
}

export default Data;