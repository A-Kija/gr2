import { createContext, useEffect, useState } from 'react';

const RouterContext = createContext();

export const Router = ({ children }) => {

    const [page, setPage] = useState(_ => {
        let hash = window.location.hash;
        hash = hash.replace(/^#/, '');
        const params = hash.split('/');
        const type = params.shift();
        return { type, params };
    });

    useEffect(_ => {
        window.addEventListener('hashchange', _ => {
            let hash = window.location.hash;
            hash = hash.replace(/^#/, '');
            const params = hash.split('/');
            const type = params.shift();
            setPage({ type, params });
            console.log('hash go', hash);
        });
    }, []);

    return (
        <RouterContext.Provider value={{
            page: page.type,
            params: page.params
        }}>
            {children}
        </RouterContext.Provider>
    );

}

export default RouterContext;