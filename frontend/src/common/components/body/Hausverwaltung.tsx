import React from 'react';
import {Link} from "react-router-dom";

function Hausverwaltung() {
    return (
        <div className="d-flex justify-space-between align-items-center marginHausAnzeige">
            <div className="dashboard">
                <h2>Dashboard</h2>
                <button><Link to="/">Mainpage</Link></button><br/>
                <button><Link to="/Buchhaltung">Buchhaltung</Link></button><br/>
                <button><Link to="/Kalender">Kalender</Link></button><br/>
                <button><Link to="/Rechte">Rechte</Link></button>
            </div>
            <div className="hausAdminAnzeige">
                Häuser
            </div>
        </div>
    );
}

export default Hausverwaltung;