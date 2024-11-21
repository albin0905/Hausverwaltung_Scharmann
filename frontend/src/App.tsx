import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./common/components/header/Header";
import Footer from "./common/components/Footer/Footer";
import Body from "./common/components/body/Body";
import Settings from "./common/components/header/Settings";
import Login from "./common/components/header/Login";
import Flats74 from "./common/components/body/Flats74";
import Flats27 from "./common/components/body/Flats27";
import Impressum from "./common/components/Footer/Impressum";

const App: React.FC = () => {
  return (
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/login" element={<Login />} />
          <Route path="/flats_74" element={<Flats74 />} />
          <Route path="/flats_27" element={<Flats27 />} />
          <Route path="/impressum" element={<Impressum />} />
        </Routes>
        <Footer />
      </BrowserRouter>
  );
}

export default App;
