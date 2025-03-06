import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { IHouse } from "../../common/models/IHouse.d";
import axios from "axios";
import { IFlat } from "../../common/models/IFlat.d";
import { useLanguage } from "../../common/context/LanguageContext";
import Haus_27 from "../../assets/27.png";

const Dashboard: React.FC = () => {
    const [houses, setHouses] = useState<IHouse[]>([]);
    const [flats, setFlats] = useState<IFlat[]>([]);
    const [filteredFlats, setFilteredFlats] = useState<IFlat[]>([]);
    const [selectedHouse, setSelectedHouse] = useState<number | null>(null);
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        bedroom: 0,
        bathroom: 0,
        toilets: 0,
        storageRooms: 0,
        kitchen: 0,
        balconies: 0,
        numberOfRooms: 0,
    });
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
            setFilteredFlats(rentableFlats);
            setSelectedHouse(houseId);
        } catch (error) {
            console.error('Fehler beim Abrufen der Wohnungen:', error);
        }
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>, key: keyof typeof filters) => {
        setFilters({ ...filters, [key]: Number(e.target.value) });
    };

    const applyFilters = () => {
        const filtered = flats.filter(flat =>
            flat.certainRooms &&
            (flat.certainRooms.bedroom ?? 0) >= filters.bedroom &&
            (flat.certainRooms.bathroom ?? 0) >= filters.bathroom &&
            (flat.certainRooms.toilets ?? 0) >= filters.toilets &&
            (flat.certainRooms.storageRooms ?? 0) >= (filters.storageRooms || 0) &&
            (flat.certainRooms.kitchen ?? 0) >= (filters.kitchen || 0) &&
            (flat.certainRooms.balconies ?? 0) >= (filters.balconies || 0) &&
            flat.numberOfRooms >= (filters.numberOfRooms || 0)
        );
        setFilteredFlats(filtered);
    };

    const resetFilters = () => {
        setFilters({
            bedroom: 0,
            bathroom: 0,
            toilets: 0,
            storageRooms: 0,
            kitchen: 0,
            balconies: 0,
            numberOfRooms: 0,
        });
        setFilteredFlats(flats); // Zeige wieder alle Flats an
    };

    const handleBackClick = () => {
        setSelectedHouse(null);
        setFlats([]);
        setFilteredFlats([]);
    };

    return (
        <div className="container mt-5 marginHausDashboardAnzeige">
            <h1 style={{ textAlign: 'center' }}>{language.texts.dashboard}</h1>
            {!selectedHouse && (
                <div className="row">
                    {houses.map((house) => (
                        <div key={house.id} className="col-md-6 mb-4 haus" onClick={() => handleHouseClick(house.id)}>
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <img className="image" src={Haus_27} alt={house.name} />
                                    <h2 className="card-title">{house.name}</h2>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {selectedHouse && (
                <div>
                    <button className="btn btn-primary mb-3" onClick={() => setShowFilters(!showFilters)}>
                        {showFilters ? 'Filter ausblenden' : 'Filter anzeigen'}
                    </button>

                    {showFilters && (
                        <div className="mb-3">
                            <div className="row">
                                {Object.keys(filters).map((key, index) => (
                                    <div key={key} className="col-md-4 mb-2">
                                        <label>{language.texts[key as keyof typeof language.texts]}</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            min="0"
                                            value={filters[key as keyof typeof filters]}
                                            onChange={(e) => handleFilterChange(e, key as keyof typeof filters)}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="mt-2">
                                <button className="btn btn-success" onClick={applyFilters}>Anwenden</button>
                                <button className="btn btn-warning ms-2" onClick={resetFilters}>Zurücksetzen</button>
                            </div>
                        </div>
                    )}

                    <button className="btn btn-secondary mb-3" onClick={handleBackClick}>
                        {language.texts.backToHouses}
                    </button>
                    <h3>{language.texts.flatsInHouse} {houses.find((h) => h.id === selectedHouse)?.name}:</h3>

                    <div className="flats-section">
                        <ul>
                            {filteredFlats.length > 0 ? (
                                filteredFlats.map((flat) => (
                                    <div className="mt-3" key={flat.id}>
                                        <h4 className="card-subtitle mb-2">{flat.name}</h4>
                                        <p className="card-text">
                                            <strong>{language.texts.floor}:</strong> {flat.floor}
                                        </p>
                                        <p className="card-text">
                                            <strong>{language.texts.numberOfRooms}:</strong> {flat.numberOfRooms}
                                        </p>
                                        <ul>
                                            <li><strong>{language.texts.bathroom}:</strong> {flat.certainRooms.bathroom}</li>
                                            <li><strong>{language.texts.toilets}:</strong> {flat.certainRooms.toilets}</li>
                                            <li><strong>{language.texts.kitchen}:</strong> {flat.certainRooms.kitchen}</li>
                                            <li><strong>{language.texts.balconies}:</strong> {flat.certainRooms.balconies}</li>
                                            <li><strong>{language.texts.bedroom}:</strong> {flat.certainRooms.bedroom}</li>
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