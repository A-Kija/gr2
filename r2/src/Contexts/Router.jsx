import { createContext, useEffect, useState } from 'react';

const RouterContext = createContext();

export const Router = ({ children }) => {

    const Routes = new Map([
        ['', { c: 'Home' }],
        ['about', { c: 'About' }],
        ['contact', { c: 'Contacts' }],
        ['products', { c: 'Products', auth: ['admin', 'editor'] }],
        ['product', { c: 'Product', p: ['id'] }],
        ['login', { c: 'Login', nav: false }],
        ['logout', { c: 'Logout', nav: false }]
    ]);

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
            params: page.params,
            Routes
        }}>
            {children}
        </RouterContext.Provider>
    );

}

export default RouterContext;