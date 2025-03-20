import { createContext } from 'react';
import useUsers from '../Hooks/useUsers';
import usePosts from '../Hooks/usePosts';

const Data = createContext();


export const DataProvider = ({ children }) => {

    console.log('-------Data Contex-------');

    const { users, dispatchUsers } = useUsers();
    const { posts, dispatchPosts, setPostUpdate } = usePosts();

    console.log('Data Contex <--- useUsers, usePost', users?.length, posts?.length);

    return (
        <Data.Provider value={{
            users, dispatchUsers,
            posts, dispatchPosts, setPostUpdate
        }}>
            {children}
        </Data.Provider>
    );
}

export default Data;