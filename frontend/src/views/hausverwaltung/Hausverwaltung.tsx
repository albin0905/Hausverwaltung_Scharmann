import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/footer.css';
import '../../styles/hausverwaltung.css'

interface Flat {
    id: number;
    name: string;
    floor: string;
    numberOfRooms: number;
    certainRooms: {
        bathroom: number;
        toilets: number;
        kitchen: number;
        balconies: number;
        bedroom: number;
        storageRooms: number;
    };
    rentable: boolean;
}

interface House {
    id: number;
    name: string;
    flats: Flat[];
}

interface Language {
    texts: {
        dashboard: string;
        mainpage: string;
        accounting: string;
        calendar: string;
        rights: string;
    };
}

interface HausverwaltungProps {
    houses: House[];
    language: Language;
    deleteHouse: (houseId: number) => void;
    deleteFlat: (houseId: number, flatId: number) => void;
    setEditingHouseId: (houseId: number) => void;
    handleAddFlatSubmit: (e: React.FormEvent, houseId: number) => void;
    handleSave: () => void;
    isAddingHouse: boolean;
    setIsAddingHouse: (isAdding: boolean) => void;
    setNewHouse: (house: House) => void;
    newHouse: House;
    addingFlatHouseId: number | null;
    setAddingFlatHouseId: (houseId: number | null) => void;
    newFlat: Flat;
    setNewFlat: (flat: Flat) => void;
}

const Hausverwaltung: React.FC<HausverwaltungProps> = ({
                                                           houses,
                                                           language,
                                                           deleteHouse,
                                                           deleteFlat,
                                                           setEditingHouseId,
                                                           handleAddFlatSubmit,
                                                           handleSave,
                                                           isAddingHouse,
                                                           setIsAddingHouse,
                                                           setNewHouse,
                                                           newHouse,
                                                           addingFlatHouseId,
                                                           setAddingFlatHouseId,
                                                           newFlat,
                                                           setNewFlat
                                                       }) => {
    // Funktion zum Hinzufügen eines neuen Hauses
    const handleAddHouseSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Logik zum Hinzufügen eines Hauses
        console.log('Neues Haus wurde hinzugefügt:', newHouse);
        setNewHouse(newHouse); // Setze das neue Haus in den globalen Zustand
    };

    return (
        <div className="d-flex flex-column align-items-center marginHausverwaltungAnzeige">
            {/* Dashboard */}
            <div className="card dashboard">
                <h2>{language.texts.dashboard}</h2>
                <button><Link to="/">{language.texts.mainpage}</Link></button>
                <br />
                <button><Link to="/Buchhaltung">{language.texts.accounting}</Link></button>
                <br />
                <button><Link to="/Kalender">{language.texts.calendar}</Link></button>
                <br />
                <button><Link to="/Rechte">{language.texts.rights}</Link></button>
            </div>

            {/* Hausverwaltung */}
            <div className="hausAdminAnzeige">
                {houses.map((house) => (
                    <div key={house.id} className="col-md-6 mb-4 haus">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h2 className="card-title">{house.name}</h2>
                                {house.flats.map((flat, index) => (
                                    <div key={index} className="mt-3">
                                        <h4 className="card-subtitle mb-2">{flat.name}</h4>
                                        <p className="card-text">
                                            <strong>Etage:</strong> {flat.floor}
                                        </p>
                                        <p className="card-text">
                                            <strong>Zimmeranzahl:</strong> {flat.numberOfRooms}
                                        </p>
                                        <ul>
                                            <li><strong>Badezimmer: {flat.certainRooms.bathroom}</strong></li>
                                            <li><strong>Toiletten: {flat.certainRooms.toilets}</strong></li>
                                            <li><strong>Küche: {flat.certainRooms.kitchen}</strong></li>
                                            <li><strong>Balkone: {flat.certainRooms.balconies}</strong></li>
                                            <li><strong>Schlafzimmer: {flat.certainRooms.bedroom}</strong></li>
                                            <li><strong>Lagerräume: {flat.certainRooms.storageRooms}</strong></li>
                                        </ul>
                                        <p className="card-text">
                                            <strong>Zu vermieten:</strong> {flat.rentable ? 'Ja' : 'Nein'}
                                        </p>
                                        <button onClick={() => deleteFlat(house.id, flat.id)}>Wohnung löschen</button>
                                    </div>
                                ))}
                                <button onClick={() => deleteHouse(house.id)}>Löschen</button>
                                <button onClick={() => setEditingHouseId(house.id)}>Bearbeiten</button>

                                {/* Neue Wohnung hinzufügen */}
                                {addingFlatHouseId === house.id ? (
                                    <form onSubmit={(e) => handleAddFlatSubmit(e, house.id)}>
                                        <h4>Neue Wohnung hinzufügen</h4>
                                        <div>
                                            <label>Name:</label>
                                            <input type="text" value={newFlat.name} onChange={(e) => setNewFlat({ ...newFlat, name: e.target.value })} required />
                                        </div>
                                        <div>
                                            <label>Etage:</label>
                                            <input type="text" value={newFlat.floor} onChange={(e) => setNewFlat({ ...newFlat, floor: e.target.value })} required />
                                        </div>
                                        <div>
                                            <label>Zimmeranzahl:</label>
                                            <input type="number" value={newFlat.numberOfRooms} onChange={(e) => setNewFlat({ ...newFlat, numberOfRooms: Number(e.target.value) })} required />
                                        </div>
                                        <div>
                                            <label>Badezimmer:</label>
                                            <input type="number" value={newFlat.certainRooms.bathroom} onChange={(e) =>
                                                setNewFlat({
                                                    ...newFlat,
                                                    certainRooms: {
                                                        ...newFlat.certainRooms,
                                                        bathroom: Number(e.target.value),
                                                    },
                                                })
                                            } required />
                                            <br />
                                            <label>Toiletten:</label>
                                            <input type="number" value={newFlat.certainRooms.toilets} onChange={(e) => setNewFlat({
                                                ...newFlat,
                                                certainRooms: {
                                                    ...newFlat.certainRooms,
                                                    toilets: parseInt(e.target.value),
                                                },
                                            })} />
                                            <br />
                                            <label>Küche:</label>
                                            <input type="number" value={newFlat.certainRooms.kitchen} onChange={(e) => setNewFlat({
                                                ...newFlat,
                                                certainRooms: {
                                                    ...newFlat.certainRooms,
                                                    kitchen: parseInt(e.target.value),
                                                },
                                            })} />
                                            <br />
                                            <label>Schlafzimmer:</label>
                                            <input type="number" value={newFlat.certainRooms.bedroom} onChange={(e) => setNewFlat({
                                                ...newFlat,
                                                certainRooms: {
                                                    ...newFlat.certainRooms,
                                                    bedroom: parseInt(e.target.value),
                                                },
                                            })} />
                                            <br />
                                            <label>Balkone:</label>
                                            <input type="number" value={newFlat.certainRooms.balconies} onChange={(e) => setNewFlat({
                                                ...newFlat,
                                                certainRooms: {
                                                    ...newFlat.certainRooms,
                                                    balconies: parseInt(e.target.value),
                                                },
                                            })} />
                                            <br />
                                            <label>Lagerräume:</label>
                                            <input type="number" value={newFlat.certainRooms.storageRooms} onChange={(e) => setNewFlat({
                                                ...newFlat,
                                                certainRooms: {
                                                    ...newFlat.certainRooms,
                                                    storageRooms: parseInt(e.target.value),
                                                },
                                            })} />
                                            <br />
                                            <label>Zu vermieten:</label>
                                            <input
                                                type="checkbox"
                                                checked={newFlat.rentable}
                                                onChange={(e) => setNewFlat({
                                                    ...newFlat,
                                                    rentable: e.target.checked
                                                })}
                                            />
                                        </div>
                                        <button type="submit">Hinzufügen</button>
                                        <button type="button" onClick={() => setAddingFlatHouseId(null)}>
                                            Abbrechen
                                        </button>
                                    </form>
                                ) : (
                                    <button onClick={() => setAddingFlatHouseId(house.id)}>
                                        Neue Wohnung hinzufügen
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                {/* Neues Haus hinzufügen */}
                {isAddingHouse ? (
                    <form onSubmit={handleAddHouseSubmit} className="add-house-form">
                        <h3>Neues Haus hinzufügen</h3>
                        <div>
                            <label>Name:</label>
                            <input type="text" value={newHouse.name} onChange={(e) => setNewHouse({ ...newHouse, name: e.target.value })} required />
                        </div>
                        <button type="submit">Hinzufügen</button>
                        <button type="button" onClick={() => setIsAddingHouse(false)}>Abbrechen</button>
                    </form>
                ) : (
                    <button onClick={() => setIsAddingHouse(true)}>Neues Haus hinzufügen</button>
                )}
            </div>
        </div>
    );
};

export default Hausverwaltung;
