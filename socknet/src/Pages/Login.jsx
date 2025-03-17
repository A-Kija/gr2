import { NavLink } from 'react-router';

export default function Login() {

    return (
        <section className="main login-page">
            <div className="login-page__box">
                <div className="login-page__box__row">
                    <label>Name</label>
                    <input type="text" name="name" />
                </div>
                <div className="login-page__box__row">
                    <label>Password</label>
                    <input type="password" name="password" />
                </div>
                <div className="login-page__box__row">
                    <button>Login</button>
                </div>
                <div className="login-page__box__row">
                    <NavLink to="/" end>Back home</NavLink>
                </div>
            </div>
        </section>
    );
}