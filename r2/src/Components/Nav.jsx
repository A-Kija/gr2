import { useContext } from 'react';
import Link from './Link.jsx';
import RouterContext from '../Contexts/Router';

export default function Nav() {

    const { page, Routes } = useContext(RouterContext);

    const hideNav = _ => {
        if (Routes.has(page)) {
            return Routes.get(page).nav === false; // jeigu turi ir false grąžina true
        }
        return false;
    }

    if (hideNav()) {
        return null;
    }

    return (
        <nav>
            <ul>
                <li>
                    <Link to="">Home</Link>
                </li>
                <li>
                    <Link to="about">About</Link>
                </li>
                <li>
                    <Link to="contact">Contact</Link>
                </li>
                <li>
                    <Link to="products">Products</Link>
                </li>
            </ul>
            <ul className="right">
                <li>
                    <a href="#login">Login</a>
                </li>
            </ul>
        </nav>
    );
}
