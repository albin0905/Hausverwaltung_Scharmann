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
import GoogleMapPopup from "./components/GoogleMapPopup";
import Hausverwaltung from "./views/hausverwaltung/Hausverwaltung";
import Buchhaltung from "./views/buchhaltung/Buchhaltung";
import Kalender from "./views/kalender/Kalender";
import { LanguageProvider } from "./common/context/LanguageContext";
import { AuthProvider } from "./common/context/AuthContext";
import UserAnzeige from "./views/hausverwaltung/UserAnzeige";
import Register from "./views/login/Register";
import Termin from "./views/layout/Termin";

const App: React.FC = () => {
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
                        <Route path="/Hausverwaltung" element={<Hausverwaltung/>}/>
                        <Route path="/Buchhaltung" element={<Buchhaltung />} />
                        <Route path="/Kalender" element={<Kalender />} />
                        <Route path="/User" element={<UserAnzeige />} />
                        <Route path="/Register" element={<Register/>}></Route>
                        <Route path="/Termin" element={<Termin/>}></Route>
                    </Routes>
                    <Footer />
                </BrowserRouter>
            </AuthProvider>
        </LanguageProvider>
    );
}

export default App;
