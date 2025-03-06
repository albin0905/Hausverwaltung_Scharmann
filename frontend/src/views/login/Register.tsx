import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Register() {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!email || !password || !firstname || !lastname) {
            setError('Bitte füllen Sie alle Pflichtfelder aus.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/user', {
                firstname,
                lastname,
                email,
                password,
                phone,
                address,
                administrator: 0,
            });

            setSuccess('Registrierung erfolgreich!');
            setError('');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err: unknown) {
            setSuccess('');
            if (axios.isAxiosError(err)) {
                setError('Fehler bei der Registrierung. ' + (err.response?.data?.message || err.message));
            } else {
                setError('Fehler bei der Registrierung. Ein unbekannter Fehler ist aufgetreten.');
            }
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header bg-success text-white text-center">
                            <h1>Registrierung</h1>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group mb-3">
                                    <label className="form-label">Vorname:</label>
                                    <input type="text" className="form-control" value={firstname} onChange={(e) => setFirstname(e.target.value)} required />
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-label">Nachname:</label>
                                    <input type="text" className="form-control" value={lastname} onChange={(e) => setLastname(e.target.value)} required />
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-label">E-Mail:</label>
                                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-label">Passwort:</label>
                                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-label">Telefonnummer:</label>
                                    <input type="text" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-label">Adresse:</label>
                                    <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} />
                                </div>
                                {error && <div className="alert alert-danger">{error}</div>}
                                {success && <div className="alert alert-success">{success}</div>}
                                <button type="submit" className="btn btn-success w-100">Registrieren</button>
                            </form>
                            <div className="text-center mt-3">
                                <p>Bereits ein Konto?</p>
                                <button className="btn btn-secondary" onClick={() => navigate('/login')}>Zum Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;