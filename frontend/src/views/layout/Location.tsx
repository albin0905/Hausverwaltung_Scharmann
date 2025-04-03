import React from 'react';
import {useLanguage} from "../../common/context/LanguageContext";
import Haus_27 from "../../assets/27.png";
import Haus_74 from "../../assets/74.png";
import '../../styles/location.css';

const Location = () => {
    const { language, texts, setLanguage } = useLanguage();

    return (
        <div>
            <div>
                <h1>{texts.location}</h1>
                <p>Postleitzahl: 8552</p>
                <p>Ort: Eibiswald</p>
                <p>Straße: Ortsdurchfahrtsstraße</p>
                <p>Hausnamer: 27 und 74</p>
            </div>

            <div className="div-haeuser">
                <div>
                    <p style={{fontSize:30}}>Haus Nr 27</p>
                    <img className="image" src={Haus_27} alt="27" />
                </div>
                <div>
                    <p style={{fontSize:30}}>Haus Nr 74</p>
                    <img className="image" src={Haus_74} alt="74" />
                </div>
            </div>
        </div>
    );
};

export default Location;