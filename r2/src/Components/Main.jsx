import { useContext } from 'react';
import RouterContext from '../Contexts/Router';

const Routes = new Map([
    ['', 'Home'],
    ['about', 'About'],
    ['contact', 'Contact']
]	
);

console.log('Routes', Routes);

export default function Main({children}) {

    const { page } = useContext(RouterContext);

    console.log('page', page);


    // children.forEach(child => console.log(child.type.name));
    
    return (
        <main>
            {children}
        </main>
    );
}