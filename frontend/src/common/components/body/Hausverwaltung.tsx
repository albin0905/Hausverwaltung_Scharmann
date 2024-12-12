import React from 'react';
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const houses = [
    {
        img: "../../../27.png",
        name: "Haus Nr 27",
        flats: [
            {
                name: "Wohnung 1",
                floor: "2 / 3",
                numberOfRooms: 17,
                certainRooms: [
                    "Badezimmer 1",
                    "Badezimmer 2",
                    "Toilette 1",
                    "Toilette 2",
                    "Küche",
                    "Balkon 1",
                    "Balkon 2",
                    "Schlafzimmer 1",
                    "Schlafzimmer 2",
                    "Lagerraum 1",
                    "Lagerraume 2",
                ],
                rent: false,
            },
            {
                name: "Wohnung 2",
                floor: "2",
                numberOfRooms: 4,
                certainRooms: ["Badezimmer", "Toilette", "Küche", "Balkon", "Schlafzimmer"],
                rent: true,
            },
            {
                name: "Wohnung 3",
                floor: "1",
                numberOfRooms: 5,
                certainRooms: ["Badezimmer", "Toilette", "Küche", "Schlafzimmer", "Lagerraum"],
                rent: true,
            },
            {
                name: "Wohnung 4",
                floor: "1 / 2",
                numberOfRooms: 8,
                certainRooms: [
                    "Badezimmer",
                    "Toilette",
                    "Küche",
                    "Schlafzimmer 1",
                    "Schlafzimmer 2",
                    "Schlafzimmer 3",
                    "Lagerraum",
                    "Balkon",
                ],
                rent: true,
            },
            {
                name: "Wohnung 5",
                floor: "1",
                numberOfRooms: 10,
                certainRooms: [
                    "1 Badezimmer",
                    "1 Toilette/n",
                    "1 Küche",
                    "1 Schlafzimmer",
                    "1 Lagerräume",
                ],
                rent: false,
            },
            {
                name: "Wohnung 6",
                floor: "2",
                numberOfRooms: 7,
                certainRooms: [
                    "1 Badezimmer",
                    "1 Toilette",
                    "1 Küche",
                    "1 Schlafzimmer",
                    "1 Lagerräume",
                    "1 Balkon",
                ],
                rent: true,
            },
        ],
    },
    {
        img: "../../../27.png",
        name: "Haus Nr 74",
        flats: [
            {
                name: "Wohnung 1",
                floor: "3",
                numberOfRooms: 6,
                certainRooms: ["Badezimmer", "Toilette", "Küche", "Balkon", "Schlafzimmer"],
                rent: true,
            },
            {
                name: "Wohnung 2",
                floor: "2",
                numberOfRooms: 4,
                certainRooms: ["Toilette", "Arbeitsraum", "Küche", "Lagerraum"],
                rent: false,
            },
            {
                name: "Wohnung 3",
                floor: "1",
                numberOfRooms: 3,
                certainRooms: ["Toilette", "Büro"],
                rent: true,
            },
        ],
    },
];

function Hausverwaltung() {
    return (
        <div className="d-flex justify-space-between marginHausAnzeige">
            <div className="card dashboard">
                <h2>Dashboard</h2>
                <button><Link to="/">Mainpage</Link></button><br/>
                <button><Link to="/Buchhaltung">Buchhaltung</Link></button><br/>
                <button><Link to="/Kalender">Kalender</Link></button><br/>
                <button><Link to="/Rechte">Rechte</Link></button>
            </div>
            <div className="hausAdminAnzeige">
                {houses.map((house) => (
                    <div key={house.name} className="col-md-6 mb-4">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h2 className="card-title">{house.name}</h2>
                                <img src={house.img} alt="Bild vom Haus"/>
                                {house.flats.map((flat, index) => (
                                    <div key={index} className="mt-3">
                                        <h4 className="card-subtitle mb-2">{flat.name}</h4>
                                        <p className="card-text">
                                            <strong>Etage:</strong> {flat.floor}
                                        </p>
                                        <p className="card-text">
                                            <strong>Zimmeranzahl:</strong> {flat.numberOfRooms}
                                        </p>
                                        <p className="card-text">
                                            <strong>Räume:</strong> {flat.certainRooms.join(', ')}
                                        </p>
                                        <p className="card-text">
                                            <strong>Zu vermieten:</strong> {flat.rent ? 'Ja' : 'Nein'}
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