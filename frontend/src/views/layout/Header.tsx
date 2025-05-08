import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import {FaCog, FaUserCircle, FaHome, FaMapMarkerAlt, FaCalendar} from 'react-icons/fa';
import logo from '../../assets/logo.png';
import google_maps from '../../assets/Google_Maps_Logo.png';
import { useLanguage } from "../../common/context/LanguageContext";
import { useAuth } from "../../common/context/AuthContext";
import '../../styles/header.css';
import GoogleMapPopup from "../../components/GoogleMapPopup";

const Header: React.FC = () => {
    const { language, texts, setLanguage } = useLanguage();
    const auth = useAuth();

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedLanguage = event.target.value as 'de' | 'en' | 'al';
        setLanguage(selectedLanguage);
    };

    const [showMap, setShowMap] = useState(false);

    return (
        <>
            <header className="header-container d-flex justify-start align-items-center">
                <div className="logo">
                    <Link to="/">
                        <img src={logo} alt="Hausverwaltung Scharmann Logo" />
                    </Link>
                </div>

                <div className="nav-container d-flex align-items-center">
                    {auth.isAdmin ? (
                        <Link to="/Hausverwaltung" className="nav-link">
                            <FaHome className="icon" />
                            <span className="nav-text">{texts.hausverwaltung}</span>
                        </Link>
                    ) : auth.isAuthenticated && (
                        <Link to="/Termin" className="nav-link">
                            <FaCalendar className="icon" />
                            <span className="nav-text">Termin</span>
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
                            <FaUserCircle className="icon" />
                            <span className="nav-text">
                             {auth.currentUser?.firstname} {auth.currentUser?.lastname}
                        </span>
                        </div>
                    ) : (
                        <Link to="/login" className="nav-link">
                            <FaUserCircle className="icon" />
                            <span className="nav-text">{texts.login}</span>
                        </Link>
                    )}
                    <img
                        src={google_maps}
                        alt="Google Maps"
                        onClick={() => setShowMap(true)}
                        style={{
                            width: '19px',
                            height: '24px',
                            cursor: 'pointer',
                        }}
                    />
                </div>
            </header>
            {showMap && (
                <div onClick={() => setShowMap(false)} style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    zIndex: 9998
                }}>
                    <GoogleMapPopup />
                </div>
            )}
        </>
    );
}

export default Header;