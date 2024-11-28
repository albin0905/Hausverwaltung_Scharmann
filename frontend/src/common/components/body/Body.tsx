import React from 'react';
import { Link } from 'react-router-dom';

const Body: React.FC = () => {
    return (
        <main className="body marginBody">
            <Link to="/flats_74" className="img-button img-button-74" style={{height:"450px", width:"724px"}}>
                <div className="overlay" id="houseImgButton">Haus 74</div>
            </Link>
            <Link to="/flats_27" className="img-button img-button-27" style={{height:"450px", width:"724px"}}>
                <div className="overlay" >Haus 27</div>
            </Link>
        </main>
    );
}

export default Body;
