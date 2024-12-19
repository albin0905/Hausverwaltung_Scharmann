import React from 'react';
import { FaInstagram, FaFacebook, FaTiktok } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {useLanguage} from "../../../context/LanguageContext";

const Footer: React.FC = () => {
    const language = useLanguage();
    return (
        <footer className="d-flex justify-space-between align-items-center">
                <div className="social-links">
                    <FaInstagram/>
                    <FaFacebook/>
                    <FaTiktok/>
                </div>
                <div className="impressum">
                    <Link to="/impressum">{language.texts.impressum}</Link>
                </div>
                <div className="contact-info">
                    <p>Tel. Nr.: +43 664 8201490</p>
                    <p>E-Mail: helmut.scharmann@aon.at</p>
                </div>
        </footer>
    );
}

export default Footer;
