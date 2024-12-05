import React from 'react';
import GoogleMapsImage from "../../../assets/GoogleMapsBild.png";

const GoogleMapPopup: React.FC = () => {
    return (
        <div className="marginGoogleMaps background">
            <div>
                <img src={GoogleMapsImage} alt="GoogleMapsImage" style={{width:"100%"}}/>
            </div>
            <div className="marginAdressdaten">
                <p>Postleitzahl: 8552</p>
                <p>Ort: Eibiswald</p>
                <p>Straße: Ortsdurchfahrtsstraße</p>
                <p>Hausnummer: 27</p>
            </div>
        </div>
    );
}

export default GoogleMapPopup;
