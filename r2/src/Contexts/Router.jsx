import { createContext, useEffect, useState } from 'react';

const RouterContext = createContext();





export const Router = ({children}) => {

    const [page, setPage] = useState(_ => {
        let hash = window.location.hash;
        hash = hash.replace(/^#/, '');
        return hash;
    });

    useEffect(_ => {
        window.addEventListener('hashchange', _ => {
            let hash = window.location.hash;
            hash = hash.replace(/^#/, '');
            setPage(hash);
    
            console.log('hash go', hash);
        });
    }, []);





    return (
        <RouterContext.Provider value={{page}}>
            {children}
        </RouterContext.Provider>
    );

}

export default RouterContext;