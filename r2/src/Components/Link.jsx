import { useContext } from 'react';
import RouterContext from '../Contexts/Router';


export default function Link({ to, children }) {

    const { page } = useContext(RouterContext);

    return (
        <a href={`#${to}`} style={{
            color: page === to ? '#535bf2' : null,
            borderBottom: page === to ? '2px solid #535bf2' : null
        }}>{children}</a>
    );
}