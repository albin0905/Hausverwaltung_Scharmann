import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useLanguage} from "../../../context/LanguageContext";
import axios from "axios";

export interface IHouse {
    id: number
    name: string;
    flats: IFlat[];
}

export interface IFlat {
    id: number;
    name: string;
    floor: number | string;
    numberOfRooms: number;
    certainRooms: {
        bathroom: number;
        toilets: number;
        kitchen: number;
        bedroom: number;
        balconies?: number;
        storageRooms?: number;
        other?: { [key: string]: number };
    };
    rentable: boolean;
}

function Hausverwaltung() {
    const [houses, setHouses] = useState<IHouse[]>([]);
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

        console.log(houses)

        fetchHouses();
    }, []);

    return (
        <div className="d-flex justify-space-between marginHausAnzeige">
            <div className="card dashboard">
                <h2>{language.texts.dashboard}</h2>
                <button><Link to="/">{language.texts.mainpage}</Link></button>
                <br/>
                <button><Link to="/Buchhaltung">{language.texts.accounting}</Link></button>
                <br/>
                <button><Link to="/Kalender">{language.texts.calendar}</Link></button>
                <br/>
                <button><Link to="/Rechte">{language.texts.rights}</Link></button>
            </div>
            <div className="hausAdminAnzeige">
                {houses.map((house) => (
                    <div key={house.name} className="col-md-6 mb-4 haus">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h2 className="card-title">{house.name}</h2>
                                <img src="" alt="Bild vom Haus"/>
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
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Hausverwaltung;

/*<p className="card-text">
    <strong>Räume:</strong> {flat.certainRooms}
</p>*/