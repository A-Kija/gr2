import { NavLink, useLocation } from 'react-router';
import { HIDE_NAV_PATHS } from '../Constants/main';

export default function Nav() {

    const { pathname } = useLocation();

    if (HIDE_NAV_PATHS.includes(pathname)) {
        return null;
    }

    return (
        <nav>
            <div className="nav-left">
                <ul>
                    <li><NavLink to="/" end>Home</NavLink></li>
                    <li><NavLink to="/chat" end>Chat</NavLink></li>
                </ul>
            </div>
            <div className="nav-right">
                <NavLink to="/login" end>Login</NavLink>
            </div>
        </nav>
    );
}