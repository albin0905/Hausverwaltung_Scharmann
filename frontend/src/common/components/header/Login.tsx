import React from 'react';
import {ILogin} from "../../models/ILogin.d";

function loginDataSave() {
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;

    const data = new URLSearchParams();
    data.append("email", JSON.stringify(email));
    data.append("password", JSON.stringify(password));

    fetch('http://localhost:3000/login', {
        method: 'POST',
        body: data
    });
}

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
                    <button type="submit" className="login-button" onClick={loginDataSave}>Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;