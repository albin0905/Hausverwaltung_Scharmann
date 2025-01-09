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

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <div>
                <label htmlFor="name">Hausname:</label>
                <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)}/>
            </div>

            <div>
                <label>Bestehende Wohnungen:</label>
                {flats.map((flat, index) => (
                    <div key={index} className="flat">
                        <h3>Wohnung {index + 1}</h3>
                        <label htmlFor={`flat-name-${index}`}>Name:</label>
                        <input id={`flat-name-${index}`} type="text" value={flat.name}
                               onChange={(e) => handleFlatChange(index, "name", e.target.value)}/>
                        <br/>
                        <label htmlFor={`flat-floor-${index}`}>Etage:</label>
                        <input id={`flat-floor-${index}`} type="text" value={flat.floor}
                               onChange={(e) => handleFlatChange(index, "floor", e.target.value)}/>
                        <br/>
                        <label htmlFor={`flat-rooms-${index}`}>Zimmeranzahl:</label>
                        <input id={`flat-rooms-${index}`} type="number" value={flat.numberOfRooms}
                               onChange={(e) => handleFlatChange(index, "numberOfRooms", parseInt(e.target.value))}/>
                        <br/>
                        <label htmlFor={`flat-bathroom-${index}`}>Badezimmer:</label>
                        <input id={`flat-bathroom-${index}`} type="number" value={flat.certainRooms.bathroom}
                               onChange={(e) => handleFlatChange(index, "certainRooms.bathroom", parseInt(e.target.value))}/>
                        <br/>
                        <label htmlFor={`flat-toilets-${index}`}>Toiletten:</label>
                        <input id={`flat-toilets-${index}`} type="number" value={flat.certainRooms.toilets}
                               onChange={(e) => handleFlatChange(index, "certainRooms.toilets", parseInt(e.target.value))}/>
                        <br/>
                        <label htmlFor={`flat-kitchen-${index}`}>Küche:</label>
                        <input id={`flat-kitchen-${index}`} type="number" value={flat.certainRooms.kitchen}
                               onChange={(e) => handleFlatChange(index, "certainRooms.kitchen", parseInt(e.target.value))}/>
                        <br/>
                        <label htmlFor={`flat-balconies-${index}`}>Balkone:</label>
                        <input id={`flat-balconies-${index}`} type="number" value={flat.certainRooms.balconies}
                               onChange={(e) => handleFlatChange(index, "certainRooms.balconies", parseInt(e.target.value))}/>
                        <br/>
                        <label htmlFor={`flat-bedroom-${index}`}>Schlafzimmer:</label>
                        <input id={`flat-bedroom-${index}`} type="number" value={flat.certainRooms.bedroom}
                               onChange={(e) => handleFlatChange(index, "certainRooms.bedroom", parseInt(e.target.value))}/>
                        <br/>
                        <label htmlFor={`flat-storageRooms-${index}`}>Lagerräume:</label>
                        <input id={`flat-storageRooms-${index}`} type="number" value={flat.certainRooms.storageRooms}
                               onChange={(e) => handleFlatChange(index, "certainRooms.storageRooms", parseInt(e.target.value))}/>
                    </div>
                ))}
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