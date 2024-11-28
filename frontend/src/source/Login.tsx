import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate(); // useNavigate initialisieren

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(""); // Reset message

        try {
            // API-Anfrage zum Login
            const response = await axios.post("http://localhost:3000/auth/login", {
                email,
                password,
            });

            // Erfolgreicher Login
            setMessage(`Erfolg: ${response.data.message}`);

            // Weiterleitung nach erfolgreichem Login
            navigate("/flats_74"); // Weiterleitung zur gewünschten Seite
        } catch (error:any) {
            // Fehlerbehandlung
            if (error.response) {
                setMessage(`Fehler: ${error.response.data.error}`);
            } else {
                setMessage("Ein Fehler ist aufgetreten.");
            }
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div style={{ marginBottom: "10px" }}>
                    <label>
                        Email:
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                                display: "block",
                                width: "100%",
                                padding: "8px",
                                marginTop: "5px",
                            }}
                            required
                        />
                    </label>
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label>
                        Passwort:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                display: "block",
                                width: "100%",
                                padding: "8px",
                                marginTop: "5px",
                            }}
                            required
                        />
                    </label>
                </div>
                <button
                    type="submit"
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#007BFF",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Login
                </button>
            </form>
            {message && (
                <div
                    style={{
                        marginTop: "20px",
                        padding: "10px",
                        backgroundColor: message.startsWith("Erfolg") ? "#D4EDDA" : "#F8D7DA",
                        color: message.startsWith("Erfolg") ? "#155724" : "#721C24",
                        border: message.startsWith("Erfolg")
                            ? "1px solid #C3E6CB"
                            : "1px solid #F5C6CB",
                        borderRadius: "5px",
                    }}
                >
                    {message}
                </div>
            )}
        </div>
    );
};

export default Login;
