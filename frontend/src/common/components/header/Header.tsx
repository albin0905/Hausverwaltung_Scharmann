import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaCog, FaUserCircle } from 'react-icons/fa';
import logo from '../../../assets/logo.png';
import GoogleMapPopup from "./GoogleMapPopup";

const Header: React.FC = () => {
    const [isMapOpen, setIsMapOpen] = useState(false);

    return (
        <header className="header">
            <div className="logo">
                <Link to="/">
                    <img src={logo} alt="Hausverwaltung Scharmann Logo" />
                </Link>
            </div>
            <nav>
                <Link to="/settings"><FaCog /> Einstellungen</Link>
                <button onClick={() => setIsMapOpen(!isMapOpen)}><FaMapMarkerAlt /> Google Maps</button>
                <Link to="#">DE</Link>
                <Link to="/login"><FaUserCircle /> Login</Link>
            </nav>
            {isMapOpen && <GoogleMapPopup onClose={() => setIsMapOpen(false)} />}
        </header>
    );
}

export default Header;
