import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {IHouse} from "../../common/models/IHouse.d";
import axios from "axios";
import {IFlat} from "../../common/models/IFlat.d";
import {useLanguage} from "../../common/context/LanguageContext";
import Haus_27 from "../../assets/27.png"
import Haus_74 from "../../assets/74.png"

const Dashboard: React.FC = () => {
    const [houses, setHouses] = useState<IHouse[]>([]);
    const [flats, setFlats] = useState<IFlat[]>([]);
    const [selectedHouse, setSelectedHouse] = useState<number | null>(null);
    const language = useLanguage();

    useEffect(() => {
        const fetchHouses = async () => {
            try {
                const response = await axios.get('http://localhost:3000/houses');
                setHouses(response.data);
            } catch (err) {
                console.error('Fehler beim Abrufen der Häuser:', err);
            }
        };
        fetchHouses();
    }, []);

    const handleHouseClick = async (houseId: number) => {
        try {
            const response = await axios.get(`http://localhost:3000/flats/house/${houseId}/flats`);
            const rentableFlats = response.data.filter((flat: IFlat) => flat.rentable);
            setFlats(rentableFlats);
            setSelectedHouse(houseId);
        } catch (error) {
            console.error('Fehler beim Abrufen der Wohnungen:', error);
        }
    };

    const handleBackClick = () => {
        setSelectedHouse(null);
        setFlats([]);
    };

    return (
        <div className="container mt-5 marginHausDashboardAnzeige">
            <h1 style={{ textAlign: 'center' }}>Dashboard</h1>
            {!selectedHouse && (
                <div className="row">
                    {houses.map((house) => (
                        <div
                            key={house.id}
                            className="col-md-6 mb-4 haus"
                            onClick={() => handleHouseClick(house.id)}
                        >
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <img className={"image"} src={Haus_27} alt={house.name} />
                                    <h2 className="card-title">{house.name}</h2>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {selectedHouse && (
                <div>
                    <button className="btn btn-secondary mb-3" onClick={handleBackClick}>
                        {language.texts.backToHouses}
                    </button>
                    <h3>{language.texts.flatsInHouse} {houses.find((h) => h.id === selectedHouse)?.name}:</h3>
                    <div className="flats-section">
                        <ul>
                            {flats.length > 0 ? (
                                flats.map((flat) => (
                                    <div className="mt-3" key={flat.id}>
                                        <h4 className="card-subtitle mb-2">{flat.name}</h4>
                                        <p className="card-text">
                                            <strong>{language.texts.floor}:</strong> {flat.floor}
                                        </p>
                                        <p className="card-text">
                                            <strong>{language.texts.numberOfRooms}:</strong> {flat.numberOfRooms}
                                        </p>
                                        <ul>
                                            <li><strong>{language.texts.bathrooms}:</strong> {flat.certainRooms.bathroom}</li>
                                            <li><strong>{language.texts.toilets}:</strong> {flat.certainRooms.toilets}</li>
                                            <li><strong>{language.texts.kitchen}:</strong> {flat.certainRooms.kitchen}</li>
                                            <li><strong>{language.texts.balconies}:</strong> {flat.certainRooms.balconies}</li>
                                            <li><strong>{language.texts.bedrooms}:</strong> {flat.certainRooms.bedroom}</li>
                                            <li><strong>{language.texts.storageRooms}:</strong> {flat.certainRooms.storageRooms}</li>
                                        </ul>
                                        <p className="card-text">
                                            <strong>{language.texts.forRent}:</strong> {flat.rentable ? language.texts.yes : language.texts.no}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p>Keine Wohnung vorhanden</p>
                            )}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;