import { NavLink, useLocation } from 'react-router';
import { HIDE_NAV_PATHS } from '../Constants/main';
import { useContext } from 'react';
import Auth from '../Contexts/Auth';

export default function Nav() {

    const { pathname } = useLocation();

    const { user } = useContext(Auth);

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
                {
                    user.role === 'guest' && <NavLink to="/login" end>Login</NavLink>
                }
                {
                    user.role !== 'guest' &&
                    <>
                        <div className="nav-right__username">{user.name}</div>
                        <NavLink to="/logout" end>Logout</NavLink>
                    </>
                }
            </div>
        </nav>
    );
}