import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useLanguage} from "../../common/context/LanguageContext";
import axios from "axios";
import {IHouse} from "../../common/models/IHouse.d";
import {IFlat} from "../../common/models/IFlat.d";
import EditHouseForm from "./EditHouseForm";
import "../../styles/hausverwaltung.css"

function Hausverwaltung() {
    const [houses, setHouses] = useState<IHouse[]>([]);
    const [editingHouseId, setEditingHouseId] = useState<number | null>(null);
    const [isAddingHouse, setIsAddingHouse] = useState(false);
    const [newHouse, setNewHouse] = useState<Omit<IHouse, 'id'>>({name: '', flats: []});
    const language = useLanguage();
    const [addingFlatHouseId, setAddingFlatHouseId] = useState<number | null>(null);
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
            const response = await axios.post('http://localhost:3000/houses', newHouse);
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
                                                <strong>{language.texts.floor}:</strong> {flat.floor}
                                            </p>
                                            <p className="card-text">
                                                <strong>{language.texts.numberOfRooms}:</strong> {flat.numberOfRooms}
                                            </p>
                                            <ul>
                                                <li><strong>{language.texts.bathrooms}: {flat.certainRooms.bathroom}</strong></li>
                                                <li><strong>{language.texts.toilets}: {flat.certainRooms.toilets}</strong></li>
                                                <li><strong>{language.texts.kitchen}: {flat.certainRooms.kitchen}</strong></li>
                                                <li><strong>{language.texts.balconies}: {flat.certainRooms.balconies}</strong></li>
                                                <li><strong>{language.texts.bedrooms}: {flat.certainRooms.bedroom}</strong></li>
                                                <li><strong>{language.texts.storageRooms}: {flat.certainRooms.storageRooms}</strong>
                                                </li>
                                            </ul>
                                            <p className="card-text">
                                                <strong>{language.texts.forRent}:</strong> {flat.rentable ? 'Ja' : 'Nein'}
                                            </p>
                                            <button onClick={() => deleteFlat(house.id, flat.id)}>{language.texts.deleteFlat}</button>
                                        </div>
                                    ))}
                                    <button onClick={() => deleteHouse(house.id)}>{language.texts.delete}</button>
                                    <button onClick={() => setEditingHouseId(house.id)}>{language.texts.edit}</button>
                                    {addingFlatHouseId === house.id ? (
                                        <form onSubmit={(e) => handleAddFlatSubmit(e, house.id)}>
                                            <h4>{language.texts.add}</h4>
                                            <div>
                                                <label>{language.texts.name}:</label>
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
                                                <label>{language.texts.numberOfRooms}:</label>
                                                <input type="number" value={newFlat.numberOfRooms}
                                                       onChange={(e) => setNewFlat({
                                                           ...newFlat,
                                                           numberOfRooms: Number(e.target.value)
                                                       })} required/>
                                            </div>
                                            <div>
                                                <label>{language.texts.bathrooms}:</label>
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
                                                <label>{language.texts.toilets}:</label>
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
                                                <label>{language.texts.kitchen}:</label>
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
                                                <label>{language.texts.bedrooms}:</label>
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
                                                <label>{language.texts.balconies}:</label>
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
                                                <label>{language.texts.storageRooms}:</label>
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
                                                <label>{language.texts.forRent}:</label>
                                                <input
                                                    type="checkbox"
                                                    checked={newFlat.rentable}
                                                    onChange={(e) => setNewFlat({
                                                        ...newFlat,
                                                        rentable: e.target.checked
                                                    })}
                                                />
                                            </div>
                                            <button type="submit">{language.texts.add}</button>
                                            <button type="button" onClick={() => setAddingFlatHouseId(null)}>
                                                {language.texts.cancel}
                                            </button>
                                        </form>
                                    ) : (
                                        <button onClick={() => setAddingFlatHouseId(house.id)}>
                                            {language.texts.addNewFlat}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
                {isAddingHouse ? (
                    <form onSubmit={handleAddHouseSubmit} className="add-house-form">
                        <h3>{language.texts.addNewHouse}</h3>
                        <div>
                            <label>{language.texts.name}:</label>
                            <input type="text" value={newHouse.name}
                                   onChange={(e) => setNewHouse({...newHouse, name: e.target.value})} required/>
                        </div>
                        <button type="submit">{language.texts.add}</button>
                        <button type="button" onClick={() => setIsAddingHouse(false)}>{language.texts.cancel}</button>
                    </form>
                ) : (
                    <button onClick={() => setIsAddingHouse(true)}>{language.texts.addNewHouse}</button>
                )}
            </div>
        </div>
    );
}

export default Hausverwaltung;