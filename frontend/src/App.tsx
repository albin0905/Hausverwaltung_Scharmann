import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
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
import {LanguageProvider} from "./common/context/LanguageContext";
import {AuthProvider} from "./common/context/AuthContext";

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
                      <Route path="/GoogleMaps" element={<GoogleMapPopup />}/>
                      <Route path="/Hausverwaltung" element={<Hausverwaltung/>}/>
                      <Route path="/Buchhaltung" element={<Buchhaltung/>}/>
                      <Route path="/Kalender" element={<Kalender/>}/>
                      <Route path="/Rechte" element={<Rechte/>}/>
                  </Routes>
                  <Footer />
              </BrowserRouter>
          </AuthProvider>
      </LanguageProvider>
  );
}

export default App;
