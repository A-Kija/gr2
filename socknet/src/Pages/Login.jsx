import { useContext, useState } from 'react';
import { NavLink } from 'react-router';
import useAuth from '../Hooks/useAuth';
import Auth from '../Contexts/Auth';

const defForm = { name: '', password: '' };

export default function Login() {

    const [form, setForm] = useState(defForm);
    const { setUser } = useContext(Auth);

    const { setLoginForm } = useAuth(setUser);

    const handleChange = e => {
        setForm(f => {
            return { ...f, [e.target.name]: e.target.value }
        });
    }

    const login = _ => {
        setLoginForm(form);

    }

    return (
        <section className="main login-page">
            <div className="login-page__box">
                <div className="login-page__box__row">
                    <label>Name</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} />
                </div>
                <div className="login-page__box__row">
                    <label>Password</label>
                    <input type="password" name="password" value={form.password} onChange={handleChange} />
                </div>
                <div className="login-page__box__row">
                    <button onClick={login}>Login</button>
                </div>
                <div className="login-page__box__row">
                    <NavLink to="/" end>Back home</NavLink>
                </div>
            </div>
        </section>
    );
}