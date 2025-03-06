import { NavLink } from 'react-router';

export default function Nav() {

    return (
        <nav>
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/chat" end>Chat</NavLink>
        </nav>
    );
}