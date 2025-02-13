import React, { useState } from 'react';
import { useAuth } from '../../common/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/login.css'
import {IUser} from "../../common/models/IUser.d";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const auth = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event:any) => {
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

            const user:IUser = users.find((u:any) => u.email === email && u.password === password);

            if (user) {
                setSuccess('Login erfolgreich!');
                setError('');
                if(user.administrator === 1){
                    auth.login(user)
                }
                console.log('Eingeloggter Benutzer:', user);
                navigate('/');
            } else {
                setSuccess('');
                setError('Ungültige E-Mail oder Passwort');
            }
        } catch (error) {
            setSuccess('');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header bg-primary text-white text-center">
                            <h1>Login</h1>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group mb-3">
                                    <label htmlFor="email" className="form-label">E-Mail:</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="password" className="form-label">Passwort:</label>
                                    <input
                                        type="password"
                                        id="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                {error && <div className="alert alert-danger">{error}</div>}
                                {success && <div className="alert alert-success">{success}</div>}
                                <button type="submit" className="btn btn-primary w-100">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;