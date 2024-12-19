import React from 'react';
import { Link } from 'react-router-dom';
import {useLanguage} from "../../../context/LanguageContext";

const Body: React.FC = () => {
    const language = useLanguage();

    return (
        <main className="body marginBody">
            <Link to="/flats_74" className="img-button img-button-74" style={{height:"450px", width:"724px"}}>
                <div className="overlay" id="houseImgButton">{language.texts.house} 74</div>
            </Link>
            <Link to="/flats_27" className="img-button img-button-27" style={{height:"450px", width:"724px"}}>
                <div className="overlay" >{language.texts.house} 27</div>
            </Link>
        </main>
    );
}

export default Body;
