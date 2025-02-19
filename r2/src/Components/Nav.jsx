import Link from './Link.jsx';

export default function Nav() {
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
        </nav>
    );
}
