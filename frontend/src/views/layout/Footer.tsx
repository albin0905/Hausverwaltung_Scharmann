import React from 'react';
import { FaInstagram, FaFacebook, FaTiktok } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useLanguage } from "../../common/context/LanguageContext";
import '../../styles/footer.css'; // Import für die CSS-Datei

const Footer: React.FC = () => {
    const language = useLanguage();
    return (
        <footer className="footer-container">
            <div className="social-links">
                <FaInstagram size={30} />
                <FaFacebook size={30} />
                <FaTiktok size={30} />
            </div>
            <div className="impressum">
                <Link to="/impressum" className="highlighted-link">
                    {language.texts.impressum}
                </Link>
            </div>
            <div className="contact-info">
                <p>Tel. Nr.: +43 664 8201490</p>
                <p>E-Mail: helmut.scharmann@aon.at</p>
            </div>
        </footer>
    );
}

export default Footer;
