import React, { useState, useEffect } from "react";
import { IFlat, IHouse } from "./Hausverwaltung";

interface EditHouseFormProps {
    house: IHouse;
    onSave: (id: number, updatedData: { name: string, flats: IFlat[] }) => void;
    onCancel: () => void;
}

function EditHouseForm({ house, onSave, onCancel }: EditHouseFormProps) {
    const [name, setName] = useState(house.name || "");
    const [flats, setFlats] = useState<IFlat[]>(house.flats || []);
    const [newFlat, setNewFlat] = useState<IFlat>({
        id: 0,
        name: "",
        floor: "",
        numberOfRooms: 0,
        certainRooms: {
            bathroom: 0,
            toilets: 0,
            kitchen: 0,
            bedroom: 0,
        },
        rentable: false,
    });

    const handleFlatChange = (index: number, field: string, value: any) => {
        setFlats((prevFlats) => {
            const updatedFlats = [...prevFlats];
            const flatToUpdate = updatedFlats[index];

            if (field.startsWith("certainRooms.")) {
                const roomField = field.split(".")[1]; // Extrahiere den Namen des verschachtelten Feldes
                updatedFlats[index] = {
                    ...flatToUpdate,
                    certainRooms: {
                        ...flatToUpdate.certainRooms,
                        [roomField]: value,
                    },
                };
            } else {
                updatedFlats[index] = { ...flatToUpdate, [field]: value };
            }

            return updatedFlats;
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:3000/houses/${house.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    flats,
                }),
            });

            if (response.ok) {
                onSave(house.id, { name, flats });
            } else {
                const errorData = await response.json();
                alert(`Fehler: ${errorData.message || "Unbekannter Fehler"}`);
            }
        } catch (error) {
            console.error("Fehler beim Aktualisieren des Hauses:", error);

        }
    };

    const addFlat = async () => {
        try {
            const response = await fetch(`http://localhost:3000/flats/house/${house.id}/flats`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newFlat),
            });

            if (response.ok) {
                const data = await response.json();
                const addedFlat = data.flat;
                setFlats((prevFlats) => [...prevFlats, addedFlat]);
                setNewFlat({
                    id: 0,
                    name: "",
                    floor: "",
                    numberOfRooms: 0,
                    certainRooms: {
                        bathroom: 0,
                        toilets: 0,
                        kitchen: 0,
                        bedroom: 0,
                    },
                    rentable: false,
                });
                alert("Wohnung erfolgreich hinzugefügt");
            } else {
                const errorData = await response.json();
                alert(`Fehler: ${errorData.message || "Unbekannter Fehler"}`);
            }
        } catch (error) {
            console.error("Fehler beim Hinzufügen der Wohnung:", error);
        }
    };

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <div>
                <label htmlFor="name">Hausname:</label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div>
                <label>Bestehende Wohnungen:</label>
                {flats.map((flat, index) => (
                    <div key={index} className="flat">
                        <h3>Wohnung {index + 1}</h3>
                        <label>Name:</label>
                        <input
                            type="text"
                            value={flat.name}
                            onChange={(e) =>
                                setFlats((prev) =>
                                    prev.map((f, i) =>
                                        i === index ? { ...f, name: e.target.value } : f
                                    )
                                )
                            }
                        />
                        {/* Weitere Felder für bestehende Wohnungen */}
                    </div>
                ))}
            </div>

            {/* Formular für neue Wohnung */}
            <h3>Neue Wohnung hinzufügen</h3>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    value={newFlat.name}
                    onChange={(e) => setNewFlat({ ...newFlat, name: e.target.value })}
                />
                <label>Etage:</label>
                <input
                    type="text"
                    value={newFlat.floor}
                    onChange={(e) => setNewFlat({ ...newFlat, floor: e.target.value })}
                />
                <label>Zimmeranzahl:</label>
                <input
                    type="number"
                    value={newFlat.numberOfRooms}
                    onChange={(e) =>
                        setNewFlat({ ...newFlat, numberOfRooms: parseInt(e.target.value) })
                    }
                />
                <label>Badezimmer:</label>
                <input
                    type="number"
                    value={newFlat.certainRooms.bathroom}
                    onChange={(e) =>
                        setNewFlat({
                            ...newFlat,
                            certainRooms: {
                                ...newFlat.certainRooms,
                                bathroom: parseInt(e.target.value),
                            },
                        })
                    }
                />
                <label>Toiletten:</label>
                <input
                    type="number"
                    value={newFlat.certainRooms.toilets}
                    onChange={(e) =>
                        setNewFlat({
                            ...newFlat,
                            certainRooms: {
                                ...newFlat.certainRooms,
                                toilets: parseInt(e.target.value),
                            },
                        })
                    }
                />
                <label>Küche:</label>
                <input
                    type="number"
                    value={newFlat.certainRooms.kitchen}
                    onChange={(e) =>
                        setNewFlat({
                            ...newFlat,
                            certainRooms: {
                                ...newFlat.certainRooms,
                                kitchen: parseInt(e.target.value),
                            },
                        })
                    }
                />
                <label>Schlafzimmer:</label>
                <input
                    type="number"
                    value={newFlat.certainRooms.bedroom}
                    onChange={(e) =>
                        setNewFlat({
                            ...newFlat,
                            certainRooms: {
                                ...newFlat.certainRooms,
                                bedroom: parseInt(e.target.value),
                            },
                        })
                    }
                />
                <label>Balkone:</label>
                <input
                    type="number"
                    value={newFlat.certainRooms.balconies}
                    onChange={(e) =>
                        setNewFlat({
                            ...newFlat,
                            certainRooms: {
                                ...newFlat.certainRooms,
                                balconies: parseInt(e.target.value),
                            },
                        })
                    }
                />
                <label>Lagerräume:</label>
                <input
                    type="number"
                    value={newFlat.certainRooms.storageRooms}
                    onChange={(e) =>
                        setNewFlat({
                            ...newFlat,
                            certainRooms: {
                                ...newFlat.certainRooms,
                                storageRooms: parseInt(e.target.value),
                            },
                        })
                    }
                />
                <label>Zu vermieten:</label>
                <input
                    type="checkbox"
                    checked={newFlat.rentable}
                    onChange={(e) => setNewFlat({ ...newFlat, rentable: e.target.checked })}
                />
                <button type="button" onClick={addFlat}>
                    Wohnung hinzufügen
                </button>
            </div>

            <button type="submit" onClick={() => onSave(house.id, { name, flats })}>
                Speichern
            </button>
            <button type="button" onClick={onCancel}>
                Abbrechen
            </button>
        </form>
    );
}

export default EditHouseForm;