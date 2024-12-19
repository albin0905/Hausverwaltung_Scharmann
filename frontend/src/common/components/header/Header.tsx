import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCog, FaUserCircle } from 'react-icons/fa';
import logo from '../../../assets/logo.png';
import {useLanguage} from "../../../context/LanguageContext";

const Header: React.FC = () => {
    const language = useLanguage();

    const handleChange = (event:any) => {
        console.log(event.target.value)
        language.setLanguage(event.target.value);
    };

    return (
        <header className="d-flex justify-space-between align-items-center">
            <div className="logo">
                <Link to="/">
                    <img src={logo} alt="Hausverwaltung Scharmann Logo" />
                </Link>
            </div>
            <nav>
                <Link to="/Hausverwaltung">{language.texts.hausverwaltung}</Link>
            </nav>
            <nav>
                <Link to="/settings"><FaCog/> {language.texts.settings}</Link>
                <select
                    id="language-dropdown"
                    value={language.language}
                    onChange={handleChange}
                    style={{
                        padding: "5px",
                        fontSize: "16px",
                    }}
                >
                    <option value="de">{language.texts.german}</option>
                    <option value="en">{language.texts.english}</option>
                    <option value="al">{language.texts.albanian}</option>
                </select>
                <Link to="/login"><FaUserCircle/> {language.texts.login}</Link>
                <Link to={"/GoogleMaps"}>Google Maps</Link>
            </nav>
        </header>
    );
}

export default Header;
