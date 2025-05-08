import React from 'react';
import mapImage from '../assets/GoogleMapsBild.png';

const GoogleMapPopup: React.FC = () => {
    return (
        <div style={{
            position: 'fixed',
            top: '10%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80%',
            height: '60%',
            backgroundColor: '#fff',
            border: '2px solid #ccc',
            borderRadius: '12px',
            boxShadow: '0 0 20px rgba(0,0,0,0.2)',
            zIndex: 9999,
            padding: '10px'
        }}>
            <img
                src={mapImage}
                alt="Google Maps Standort"
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
            />
        </div>
    );
};

export default GoogleMapPopup;