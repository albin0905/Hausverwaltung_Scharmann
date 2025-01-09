import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {IHouse} from "../../common/models/IHouse.d";
import axios from "axios";
import {IFlat} from "../../common/models/IFlat.d";

const Dashboard: React.FC = () => {
    const [houses, setHouses] = useState<IHouse[]>([]);
    const [flats, setFlats] = useState<IFlat[]>([]);
    const [selectedHouse, setSelectedHouse] = useState<number | null>(null);

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
            setFlats(response.data);
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
                                    <h2 className="card-title">{house.name}</h2>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {selectedHouse && (
                <div>
                    <button
                        className="btn btn-secondary mb-3"
                        onClick={handleBackClick}
                    >
                        Zurück zu den Häusern
                    </button>
                    <h3>Wohnungen im {houses.find((h) => h.id === selectedHouse)?.name}:</h3>
                    <div className="flats-section">
                        <ul>
                            {flats.map((flat) => (
                                <div className="mt-3" key={flat.id}>
                                    <h4 className="card-subtitle mb-2">{flat.name}</h4>
                                    <p className="card-text">
                                        <strong>Etage:</strong> {flat.floor}
                                    </p>
                                    <p className="card-text">
                                        <strong>Zimmeranzahl:</strong> {flat.numberOfRooms}
                                    </p>
                                    <ul>
                                        <li><strong>Badezimmer:</strong> {flat.certainRooms.bathroom}</li>
                                        <li><strong>Toiletten:</strong> {flat.certainRooms.toilets}</li>
                                        <li><strong>Küche:</strong> {flat.certainRooms.kitchen}</li>
                                        <li><strong>Balkone:</strong> {flat.certainRooms.balconies}</li>
                                        <li><strong>Schlafzimmer:</strong> {flat.certainRooms.bedroom}</li>
                                        <li><strong>Lagerräume:</strong> {flat.certainRooms.storageRooms}</li>
                                    </ul>
                                    <p className="card-text">
                                        <strong>Zu vermieten:</strong> {flat.rentable ? 'Ja' : 'Nein'}
                                    </p>
                                </div>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
