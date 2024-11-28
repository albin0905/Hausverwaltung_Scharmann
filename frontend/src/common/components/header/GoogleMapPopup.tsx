import React from 'react';
import { Map, GoogleApiWrapper, GoogleAPI, IProvidedProps } from 'google-maps-react';

interface GoogleMapPopupProps extends IProvidedProps {
    onClose: () => void;
}

const GoogleMapPopup: React.FC<GoogleMapPopupProps> = ({ onClose, google }) => {
    return (
        <div className="map-popup">
            <button onClick={onClose}>Schließen</button>
            <Map
                google={google}
                /*zoom={14}*/
                initialCenter={{ lat: 48.2082, lng: 16.3738 }}  // Beispielkoordinaten für Wien
            />
        </div>
    );
}

export default GoogleApiWrapper({
    apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
})(GoogleMapPopup);
