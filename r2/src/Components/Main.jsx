import { useContext } from 'react';
import RouterContext from '../Contexts/Router';
import Page404 from './Page404';

const Routes = new Map([
    ['', { c: 'Home' }],
    ['about', { c: 'About' }],
    ['contact', { c: 'Contacts' }],
    ['products', { c: 'Products' }],
    ['product', { c: 'Product', p: ['id'] }],
]);

console.log('Routes', Routes);

export default function Main({ children }) {

    const { page, params } = useContext(RouterContext);

    console.log('Main', page, params);

    const route = _ => {
        if (Routes.has(page)) {
            const { c, p } = Routes.get(page);
            if (p) {
                if (p.length !== params.length) { // tikrinam tik parametrų skaičių
                    return null;
                }
            } else {
                if (params.length > 0) {
                    return null;
                }
            }
            return c;
        }
        return null;
    }


    return (
        <main>
            {
                children.find(child => child.type.name === route()) ?? <Page404 />
            }
        </main>
    );
}