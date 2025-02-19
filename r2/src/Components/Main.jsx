import { useContext } from 'react';
import RouterContext from '../Contexts/Router';
import Page404 from './Page404';

const Routes = new Map([
    ['', 'Home'],
    ['about', 'About'],
    ['contact', 'Contacts'],
    ['products', 'Products'],
]);

console.log('Routes', Routes);

export default function Main({ children }) {

    const { page, params } = useContext(RouterContext);

    console.log('Main', page, params);

    return (
        <main>
            {
                children.find(child => child.type.name === Routes.get(page)) ?? <Page404 />
            }
        </main>
    );
}