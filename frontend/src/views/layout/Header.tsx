import React from 'react';
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
        const selectedLanguage = event.target.value as 'de' | 'en' | 'al'; // Beispiel für Sprach-Enums
        setLanguage(selectedLanguage);
    };

    return (
        <header className="header-container d-flex justify-start align-items-center"> {/* Links ausrichten */}
            <div className="logo">
                <Link to="/">
                    <img src={logo} alt="Hausverwaltung Scharmann Logo" />
                </Link>
            </div>

            <div className="nav-container d-flex align-items-center"> {/* Menü links ausrichten */}
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

                <select
                    id="language-dropdown"
                    value={language}
                    onChange={handleChange}
                    className="language-select"
                >
                    <option value="de">{texts.german}</option>
                    <option value="en">{texts.english}</option>
                    <option value="al">{texts.albanian}</option>
                </select>

                <Link to="/login" className="nav-link">
                    <FaUserCircle className="icon" />
                    <span className="nav-text">{texts.login}</span>
                </Link>
                <Link to="/GoogleMaps" className="nav-link">
                    <FaMapMarkerAlt className="icon" />
                    <span className="nav-text">Google Maps</span>
                </Link>
            </div>

            {/* Dropdown für kleine Bildschirme */}
            <div className="dropdown-container">
                <select
                    className="dropdown-menu"
                    onChange={(e) => window.location.href = e.target.value}
                >
                    <option value="/">{texts.home}</option>
                    {auth.isAuthenticated && <option value="/Hausverwaltung">{texts.hausverwaltung}</option>}
                    <option value="/settings">{texts.settings}</option>
                    <option value="/login">{texts.login}</option>
                    <option value="/GoogleMaps">Google Maps</option>
                </select>
            </div>
        </header>
    );
}

export default Header;
