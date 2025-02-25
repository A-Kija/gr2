import { useEffect, useState, useContext, useCallback } from 'react';
import usePost from '../Hooks/usePost';
import AuthContext from '../Contexts/Auth';

const redirectAfterLogin = 'about';

export default function Login() {


    const [form, setForm] = useState({
        username: '',
        password: ''
    });

    const { setData, response } = usePost('login');

    const doLogin = useCallback(_ => {
        setData({
            name: form.username,
            password: form.password
        });
    }, [form.username, form.password, setData]);

    useEffect(_ => {
        window.addEventListener('keydown', e => {
            if (e.key === 'Enter') {
                doLogin();
            }
        });
        return _ => {
            window.removeEventListener('keydown', e => {
                if (e.key === 'Enter') {
                    doLogin();
                }
            });
        }
    }, [doLogin]);

    const { setUser } = useContext(AuthContext);

   

    useEffect(_ => {

        if (null === response) {
            return;
        }
        
        if (response.success) {
            setUser(response.user);
            window
                .location
                .replace('#' + redirectAfterLogin);
            return;
        }

    }, [response]);

    const goHome = _ => {
        setForm({ username: '', password: '' });
        window.location.replace('#');
        // window.location.hash = '';
        return false;
    }



    const doForm = e => {
        setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    }


    return (
        <div>
            <h1>Login</h1>
            <fieldset>
                <legend>Login</legend>
                <input type="text" name="username" placeholder="Username" value={form.username} onChange={doForm} />
                <input type="password" name="password" placeholder="Password" value={form.password} onChange={doForm} />
                <button type="button" onClick={doLogin}>Login</button>
                <button type="button" onClick={goHome}>Cancel</button>
            </fieldset>
        </div>
    );
}