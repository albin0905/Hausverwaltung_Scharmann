import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaCog, FaUserCircle } from 'react-icons/fa';
import logo from '../../../assets/logo.png';
import GoogleMapPopup from "./GoogleMapPopup";

const Header: React.FC = () => {
    const [isMapOpen, setIsMapOpen] = useState(false);

    return (
        <header className="d-flex justify-space-between align-items-center">
            <div className="logo">
                <Link to="/">
                    <img src={logo} alt="Hausverwaltung Scharmann Logo" />
                </Link>
            </div>
            <nav>
                <Link to="/Hausverwaltung">Hausverwaltung</Link>
            </nav>
            <nav>
                <Link to="/settings"><FaCog /> Einstellungen</Link>
                <Link to="#">DE</Link>
                <Link to="/login"><FaUserCircle /> Login</Link>
                <Link to={"/GoogleMaps"}>Google Maps</Link>
            </nav>
        </header>
    );
}

export default Header;
