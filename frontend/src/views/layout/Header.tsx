import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCog, FaUserCircle, FaHome, FaMapMarkerAlt } from 'react-icons/fa';
import logo from '../../assets/logo.png';
import { useLanguage } from "../../common/context/LanguageContext";
import { useAuth } from "../../common/context/AuthContext";
import '../../styles/header.css'

const Header: React.FC = () => {
    const { language, texts, setLanguage } = useLanguage();
    const auth = useAuth();

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedLanguage = event.target.value as 'de' | 'en' | 'al';
        setLanguage(selectedLanguage);
    };

    const handleLogout = () => {
        const logoutWindow = window.open("", "Logout", "width=300,height=200");
        if (logoutWindow) {
            logoutWindow.document.write(`
                <html>
                <head>
                    <title>Abmelden</title>
                    <style>
                        body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
                        button { margin: 10px; padding: 10px; cursor: pointer; }
                    </style>
                </head>
                <body>
                    <h4>Möchten Sie sich wirklich abmelden?</h4>
                    <button id="confirmLogout">Abmelden</button>
                    <button id="cancelLogout">Abbrechen</button>
                    <script>
                        document.getElementById("confirmLogout").addEventListener("click", () => {
                            window.opener.postMessage("logout", "*");
                            window.close();
                        });
                        document.getElementById("cancelLogout").addEventListener("click", () => {
                            window.close();
                        });
                    </script>
                </body>
                </html>
            `);
        }
    };

    window.addEventListener("message", (event) => {
        if (event.data === "logout") {
            auth.logout();
        }
    });

    return (
        <header className="header-container d-flex justify-start align-items-center">
            <div className="logo">
                <Link to="/">
                    <img src={logo} alt="Hausverwaltung Scharmann Logo" />
                </Link>
            </div>

            <div className="nav-container d-flex align-items-center">
                {auth.isAuthenticated && (
                    <Link to="/Hausverwaltung" className="nav-link">
                        <FaHome className="icon" />
                        <span className="nav-text">{texts.hausverwaltung}</span>
                    </Link>
                )}
                <Link to="/settings" className="nav-link">
                    <FaCog className="icon" />
                    <span className="nav-text">{texts.settings}</span>
                </Link>

                <select id="language-dropdown" value={language} onChange={handleChange} className="language-select">
                    <option value="de">{texts.german}</option>
                    <option value="en">{texts.english}</option>
                    <option value="al">{texts.albanian}</option>
                </select>

                {auth.isAuthenticated ? (
                    <div className="user-dropdown">
                        <span className="nav-link user-name" onClick={handleLogout}>
                            <FaUserCircle className="icon" />
                            <span className="nav-text">{auth.currentUser?.firstname} {auth.currentUser?.lastname}</span>
                        </span>
                    </div>
                ) : (
                    <Link to="/login" className="nav-link">
                        <FaUserCircle className="icon" />
                        <span className="nav-text">{texts.login}</span>
                    </Link>
                )}
                <Link to="/GoogleMaps" className="nav-link">
                    <FaMapMarkerAlt className="icon" />
                    <span className="nav-text">Google Maps</span>
                </Link>
            </div>
        </header>
    );
}

export default Header;