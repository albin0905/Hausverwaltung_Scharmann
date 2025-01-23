import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./views/layout/Header";
import Footer from "./views/layout/Footer";
import Dashboard from "./views/dashboard/Dashboard";
import Settings from "./views/layout/Settings";
import Login from "./views/login/Login";
import Impressum from "./views/layout/Impressum";
import 'bootstrap/dist/css/bootstrap.min.css';
import GoogleMapPopup from "./views/layout/GoogleMapPopup";
import Hausverwaltung from "./views/hausverwaltung/Hausverwaltung";
import Buchhaltung from "./views/buchhaltung/Buchhaltung";
import Kalender from "./views/kalender/Kalender";
import Rechte from "./views/layout/Rechte";
import { LanguageProvider } from "./common/context/LanguageContext";
import { AuthProvider } from "./common/context/AuthContext";

const App: React.FC = () => {
    // Beispiel-Daten, die du an Hausverwaltung übergeben kannst
    const houses = [
        // Beispielhafte Hausdaten
        { id: 1, name: "Haus 1", flats: [] },
        { id: 2, name: "Haus 2", flats: [] },
    ];

    const language = {
        texts: {
            dashboard: "Dashboard",
            mainpage: "Hauptseite",
            accounting: "Buchhaltung",
            calendar: "Kalender",
            rights: "Rechte",
        },
    };

    const deleteHouse = (houseId: number) => {
        // Deine Löschlogik
        console.log(`Haus ${houseId} gelöscht`);
    };

    const deleteFlat = (houseId: number, flatId: number) => {
        // Deine Löschlogik für Wohnungen
        console.log(`Wohnung ${flatId} im Haus ${houseId} gelöscht`);
    };

    const setEditingHouseId = (houseId: number) => {
        // Deine Bearbeitungslogik
        console.log(`Bearbeite Haus mit ID: ${houseId}`);
    };

    const handleAddFlatSubmit = (e: React.FormEvent, houseId: number) => {
        // Deine Formularlogik zum Hinzufügen einer Wohnung
        e.preventDefault();
        console.log(`Füge eine Wohnung im Haus ${houseId} hinzu`);
    };

    const handleSave = () => {
        // Deine Speichermethode
        console.log('Daten gespeichert');
    };

    return (
        <LanguageProvider>
            <AuthProvider>
                <BrowserRouter>
                    <Header />
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/impressum" element={<Impressum />} />
                        <Route path="/GoogleMaps" element={<GoogleMapPopup />} />
                        <Route
                            path="/Hausverwaltung"
                            element={
                                <Hausverwaltung
                                    houses={houses}
                                    language={language}
                                    deleteHouse={deleteHouse}
                                    deleteFlat={deleteFlat}
                                    setEditingHouseId={setEditingHouseId}
                                    handleAddFlatSubmit={handleAddFlatSubmit}
                                    handleSave={handleSave}
                                    isAddingHouse={false}
                                    setIsAddingHouse={() => {}}
                                    setNewHouse={() => {}}
                                    newHouse={{ id: 0, name: '', flats: [] }}
                                    addingFlatHouseId={null}
                                    setAddingFlatHouseId={() => {}}
                                    newFlat={{ id: 0, name: '', floor: '', numberOfRooms: 0, certainRooms: { bathroom: 0, toilets: 0, kitchen: 0, balconies: 0, bedroom: 0, storageRooms: 0 }, rentable: false }}
                                    setNewFlat={() => {}}
                                />
                            }
                        />
                        <Route path="/Buchhaltung" element={<Buchhaltung />} />
                        <Route path="/Kalender" element={<Kalender />} />
                        <Route path="/Rechte" element={<Rechte />} />
                    </Routes>
                    <Footer />
                </BrowserRouter>
            </AuthProvider>
        </LanguageProvider>
    );
}

export default App;
