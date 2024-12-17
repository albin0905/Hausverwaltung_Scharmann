import React from 'react';

function Login() {
    return (
        <div>
            <div className="login-container marginBody">
                <h1>Login</h1>
                <form id="loginForm">
                    <div className="form-group">
                        <label htmlFor="username">E-Mail: </label>
                        <input type="email" id="email" name="email" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Passwort: </label>
                        <input type="password" id="password" name="password" required/>
                    </div>
                    <button type="submit" className="login-button">Login</button>
                    <br/>
                    <a href="#" className="forgot-password">Passwort vergessen?</a>
                </form>
            </div>
        </div>
    );
}

export default Login;