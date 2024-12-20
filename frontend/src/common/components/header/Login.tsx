import React, { useState } from 'react';

function Login() {
    // State für E-Mail, Passwort und Fehlernachricht
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Handler für das Absenden des Login-Formulars
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault(); // Verhindere das Standardverhalten des Formulars (Seitenneuladen)

        // Sicherstellen, dass sowohl E-Mail als auch Passwort vorhanden sind
        if (!email || !password) {
            setError('Bitte geben Sie sowohl E-Mail als auch Passwort ein');
            return;
        }

        try {
            // POST-Anfrage an den Server senden
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // JSON-Format
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            // Überprüfen, ob die Antwort OK ist
            if (!response.ok) {
                throw new Error('Fehler beim Login, bitte versuchen Sie es später erneut.');
            }

            const data = await response.json();
            console.log(data);  // Hier kannst du etwas mit den zurückgegebenen Daten machen
            alert('Login erfolgreich!');  // Erfolgsmeldung anzeigen
        } catch (error) {
            console.error('Fehler:', error);
        }
    };

    return (
        <div className="login-container marginBody">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">E-Mail: </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // State aktualisieren
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Passwort: </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // State aktualisieren
                        required
                    />
                </div>
                {error && <p className="error-message">{error}</p>}  {/* Fehlernachricht anzeigen, wenn vorhanden */}
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );
}

export default Login;
