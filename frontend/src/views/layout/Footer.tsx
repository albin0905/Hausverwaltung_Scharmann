import React from 'react';
import { FaInstagram, FaFacebook, FaTiktok } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useLanguage } from "../../common/context/LanguageContext";
import '../../styles/footer.css';

const Footer: React.FC = () => {
    const language = useLanguage();
    return (
        <footer className="footer-container">
            <div className="social-links">
                <div>
                    <a href="https://www.instagram.com/helmutscharmann/" target="_blank" rel="noopener noreferrer">
                        <FaInstagram size={30}/>
                    </a>
                </div>
                <div>
                    <a href="https://www.facebook.com/helmut.scharmann.3" target="_blank" rel="noopener noreferrer">
                        <FaFacebook size={30}/>
                    </a>
                </div>
                <FaTiktok size={30}/>
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
