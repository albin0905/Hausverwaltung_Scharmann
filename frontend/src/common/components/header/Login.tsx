import React, { useState } from 'react';
import {useAuth} from "../../../context/AuthContext";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const auth = useAuth();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!email || !password) {
            setError('Bitte geben Sie sowohl E-Mail als auch Passwort ein');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Fehler beim Abrufen der Benutzerdaten.');
            }

            const users = await response.json();

            const user = users.find((u: { email: string; password: string }) =>
                u.email === email && u.password === password
            );

            if (user) {
                setSuccess('Login erfolgreich!');
                setError('');
                auth.login();
                console.log('Eingeloggter Benutzer:', user);
            } else {
                setSuccess('');
                setError('Ungültige E-Mail oder Passwort');
            }
        } catch (error: any) {
            setSuccess('');
            setError(error.message || 'Ein Fehler ist aufgetreten.');
            console.error('Fehler:', error);
        }
    };

    return (
        <div className="login-container marginBody">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">E-Mail: </label>
                    <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Passwort: </label>
                    <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );
}

export default Login;