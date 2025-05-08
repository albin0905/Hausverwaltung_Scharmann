import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
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
import { AnimatePresence } from 'framer-motion';
import PageTransition from './components/PageTransition';

const AppRoutes: React.FC = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageTransition><Dashboard /></PageTransition>} />
                <Route path="/settings" element={<PageTransition><Settings /></PageTransition>} />
                <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
                <Route path="/impressum" element={<PageTransition><Impressum /></PageTransition>} />
                <Route path="/GoogleMaps" element={<PageTransition><GoogleMapPopup /></PageTransition>} />
                <Route path="/Hausverwaltung" element={<PageTransition><Hausverwaltung /></PageTransition>} />
                <Route path="/Buchhaltung" element={<PageTransition><Buchhaltung /></PageTransition>} />
                <Route path="/Kalender" element={<PageTransition><Kalender /></PageTransition>} />
                <Route path="/User" element={<PageTransition><UserAnzeige /></PageTransition>} />
                <Route path="/Register" element={<PageTransition><Register /></PageTransition>} />
                <Route path="/Termin" element={<PageTransition><Termin /></PageTransition>} />
            </Routes>
        </AnimatePresence>
    );
};

const App: React.FC = () => {
    return (
        <LanguageProvider>
            <AuthProvider>
                <BrowserRouter>
                    <Header />
                    <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                        <AppRoutes />
                    </main>
                    <Footer />
                </BrowserRouter>
            </AuthProvider>
        </LanguageProvider>
    );
};

export default App;