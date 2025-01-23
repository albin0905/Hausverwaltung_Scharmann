import React, { useState } from 'react';
import { useAuth } from '../../common/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/login.css';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const auth = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!email || !password) {
            setError('Bitte geben Sie sowohl E-Mail als auch Passwort ein.');
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

            const users: { email: string; password: string }[] = await response.json();

            const user = users.find((u) => u.email === email && u.password === password);

            if (user) {
                auth.login();
                navigate('/');
            } else {
                setError('Ungültige E-Mail oder Passwort.');
            }
        } catch (error) {
            setError('Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">E-Mail:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Geben Sie Ihre E-Mail ein"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Passwort:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Geben Sie Ihr Passwort ein"
                            required
                        />
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <button type="submit" className="btn-login">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
