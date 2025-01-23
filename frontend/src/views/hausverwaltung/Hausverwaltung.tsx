import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useLanguage} from "../../common/context/LanguageContext";
import axios from "axios";
import {IHouse} from "../../common/models/IHouse.d";
import {IFlat} from "../../common/models/IFlat.d";
import EditHouseForm from "./EditHouseForm";

function Hausverwaltung() {
    const [houses, setHouses] = useState<IHouse[]>([]);
    const [editingHouseId, setEditingHouseId] = useState<number | null>(null);
    const [isAddingHouse, setIsAddingHouse] = useState(false);
    const [newHouse, setNewHouse] = useState<Omit<IHouse, 'id'>>({name: '', flats: []}); // Keine ID
    const language = useLanguage();
    const [addingFlatHouseId, setAddingFlatHouseId] = useState<number | null>(null); // State für Formular
    const [newFlat, setNewFlat] = useState<Omit<IFlat, 'id'>>({
        name: '',
        floor: '',
        numberOfRooms: 0,
        certainRooms: {bathroom: 0, toilets: 0, kitchen: 0, bedroom: 0},
        rentable: false,
    });
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

    async function deleteHouse(houseId: number) {
        if (!window.confirm("Möchten Sie dieses Haus wirklich löschen?")) {
            return;
        }
        try {
            const response = await fetch(`http://localhost:3000/houses/${houseId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                alert("Haus erfolgreich gelöscht.");
                setHouses((prevHouses) =>
                    prevHouses.filter((house) => house.id !== houseId)
                );
            } else {
                const errorData = await response.json();
                alert(`Fehler: ${errorData.message || "Unbekannter Fehler"}`);
            }
        } catch (error) {
            console.error("Fehler beim Löschen des Hauses:", error);
        }
    }

    async function updateHouse(houseId: number, updatedData: IHouse) {
        try {
            const response = await fetch(`http://localhost:3000/houses/${houseId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData),
            });
            if (response.ok) {
                const data = await response.json();
                alert("Haus erfolgreich aktualisiert.");
                setHouses((prevHouses) =>
                    prevHouses.map((house) => (house.id === houseId ? {...house, ...updatedData} : house))
                );
                return data.house;
            } else {
                const errorData = await response.json();
                alert(`Fehler: ${errorData.message}`);
            }
        } catch (error) {
            console.error("Fehler beim Aktualisieren des Hauses:", error);
            alert("Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.");
        }
    }

    const handleSave = (houseId: number, updatedData: { name: string; flats: IFlat[] }) => {
        updateHouse(houseId, {...updatedData, id: houseId});
        setEditingHouseId(null);
    };

    async function addHouse() {
        try {
            const response = await axios.post('http://localhost:3000/houses', newHouse); // Ohne ID senden
            const addedHouse = response.data.house;
            setHouses((prevHouses) => [...prevHouses, addedHouse]);
            alert('Haus erfolgreich hinzugefügt');
            setIsAddingHouse(false);
            setNewHouse({name: '', flats: []});
        } catch (err: any) {
            console.error('Fehler beim Hinzufügen des Hauses:', err);
            alert(err.response?.data?.message || 'Ein Fehler ist aufgetreten');
        }
    }

    const handleAddHouseSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addHouse();
    }

    async function addFlat(houseId: number) {
        try {
            const response = await axios.post(`http://localhost:3000/flats/house/${houseId}/flats`, newFlat);
            const addedFlat = response.data.flat;
            setHouses((prevHouses) =>
                prevHouses.map((house) =>
                    house.id === houseId ? {...house, flats: [...house.flats, addedFlat]} : house
                )
            );
            alert('Wohnung erfolgreich hinzugefügt');
            setAddingFlatHouseId(null);
            setNewFlat({
                name: '',
                floor: '',
                numberOfRooms: 0,
                certainRooms: {bathroom: 0, toilets: 0, kitchen: 0, bedroom: 0},
                rentable: false,
            });
        } catch (err: any) {
            console.error('Fehler beim Hinzufügen der Wohnung:', err);
            alert(err.response?.data?.message || 'Ein Fehler ist aufgetreten');
        }
    }

    const handleAddFlatSubmit = (e: React.FormEvent, houseId: number) => {
        e.preventDefault();
        addFlat(houseId);
    }

    async function deleteFlat(houseId: number, flatId: number) {
        if (!window.confirm("Möchten Sie diese Wohnung wirklich löschen?")) {
            return;
        }
        try {
            const response = await axios.delete(`http://localhost:3000/flats/house/${houseId}/flats/${flatId}`);
            if (response.status === 200) {
                alert("Wohnung erfolgreich gelöscht");
                setHouses(prevHouses =>
                    prevHouses.map(house =>
                        house.id === houseId
                            ? {...house, flats: house.flats.filter(flat => flat.id !== flatId)}
                            : house
                    )
                );
            } else {
                alert("Fehler beim Löschen der Wohnung");
            }
        } catch (error) {
            console.error("Fehler beim Löschen der Wohnung:", error);
            alert("Es ist ein Fehler aufgetreten.");
        }
    }

    return (
        <div className="d-flex justify-space-between marginHausverwaltungAnzeige">
            <div className="card dashboard">
                <h2>{language.texts.dashboard}</h2>
                <button><Link to="/">{language.texts.mainpage}</Link></button>
                <br/>
                <button><Link to="/Buchhaltung">{language.texts.accounting}</Link></button>
                <br/>
                <button><Link to="/Kalender">{language.texts.calendar}</Link></button>
                <br/>
                <button><Link to="/Rechte">{language.texts.rights}</Link></button>
                <br/>
                <button><Link to="/User">{language.texts.user}</Link></button>
            </div>
            <div className="hausAdminAnzeige">
                {editingHouseId ? (
                    <EditHouseForm
                        house={houses.find((house) => house.id === editingHouseId)!}
                        onSave={handleSave}
                        onCancel={() => setEditingHouseId(null)}
                    />
                ) : (
                    houses.map((house) => (
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
                                                <li><strong>Lagerräume: {flat.certainRooms.storageRooms}</strong>
                                                </li>
                                            </ul>
                                            <p className="card-text">
                                                <strong>Zu vermieten:</strong> {flat.rentable ? 'Ja' : 'Nein'}
                                            </p>
                                            <button onClick={() => deleteFlat(house.id, flat.id)}>Wohnung löschen
                                            </button>
                                        </div>
                                    ))}
                                    <button onClick={() => deleteHouse(house.id)}>Löschen</button>
                                    <button onClick={() => setEditingHouseId(house.id)}>Bearbeiten</button>
                                    {addingFlatHouseId === house.id ? (
                                        <form onSubmit={(e) => handleAddFlatSubmit(e, house.id)}>
                                            <h4>Neue Wohnung hinzufügen</h4>
                                            <div>
                                                <label>Name:</label>
                                                <input type="text" value={newFlat.name}
                                                       onChange={(e) => setNewFlat({
                                                           ...newFlat,
                                                           name: e.target.value
                                                       })} required/>
                                            </div>
                                            <div>
                                                <label>Etage:</label>
                                                <input type="text" value={newFlat.floor}
                                                       onChange={(e) => setNewFlat({
                                                           ...newFlat,
                                                           floor: e.target.value
                                                       })} required/>
                                            </div>
                                            <div>
                                                <label>Zimmeranzahl:</label>
                                                <input type="number" value={newFlat.numberOfRooms}
                                                       onChange={(e) => setNewFlat({
                                                           ...newFlat,
                                                           numberOfRooms: Number(e.target.value)
                                                       })} required/>
                                            </div>
                                            <div>
                                                <label>Badezimmer:</label>
                                                <input type="number" value={newFlat.certainRooms.bathroom}
                                                       onChange={(e) =>
                                                           setNewFlat({
                                                               ...newFlat,
                                                               certainRooms: {
                                                                   ...newFlat.certainRooms,
                                                                   bathroom: Number(e.target.value),
                                                               },
                                                           })
                                                       }
                                                       required
                                                />
                                                <br/>
                                                <label>Toiletten:</label>
                                                <input type="number" value={newFlat.certainRooms.toilets}
                                                       onChange={(e) => setNewFlat({
                                                           ...newFlat,
                                                           certainRooms: {
                                                               ...newFlat.certainRooms,
                                                               toilets: parseInt(e.target.value),
                                                           },
                                                       })
                                                       }
                                                />
                                                <br/>
                                                <label>Küche:</label>
                                                <input type="number" value={newFlat.certainRooms.kitchen}
                                                       onChange={(e) => setNewFlat({
                                                           ...newFlat,
                                                           certainRooms: {
                                                               ...newFlat.certainRooms,
                                                               kitchen: parseInt(e.target.value),
                                                           },
                                                       })
                                                       }
                                                />
                                                <br/>
                                                <label>Schlafzimmer:</label>
                                                <input type="number" value={newFlat.certainRooms.bedroom}
                                                       onChange={(e) => setNewFlat({
                                                           ...newFlat,
                                                           certainRooms: {
                                                               ...newFlat.certainRooms,
                                                               bedroom: parseInt(e.target.value),
                                                           },
                                                       })
                                                       }
                                                />
                                                <br/>
                                                <label>Balkone:</label>
                                                <input type="number" value={newFlat.certainRooms.balconies}
                                                       onChange={(e) => setNewFlat({
                                                           ...newFlat,
                                                           certainRooms: {
                                                               ...newFlat.certainRooms,
                                                               balconies: parseInt(e.target.value),
                                                           },
                                                       })
                                                       }
                                                />
                                                <br/>
                                                <label>Lagerräume:</label>
                                                <input type="number" value={newFlat.certainRooms.storageRooms}
                                                       onChange={(e) => setNewFlat({
                                                           ...newFlat,
                                                           certainRooms: {
                                                               ...newFlat.certainRooms,
                                                               storageRooms: parseInt(e.target.value),
                                                           },
                                                       })
                                                       }
                                                />
                                                <br/>
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
                    ))
                )}
                {isAddingHouse ? (
                    <form onSubmit={handleAddHouseSubmit} className="add-house-form">
                        <h3>Neues Haus hinzufügen</h3>
                        <div>
                            <label>Name:</label>
                            <input type="text" value={newHouse.name}
                                   onChange={(e) => setNewHouse({...newHouse, name: e.target.value})} required/>
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
}

export default Hausverwaltung;