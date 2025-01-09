import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../common/context/LanguageContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard: React.FC = () => {
    const language = useLanguage();

    return (
        <main className="container mt-5">
            <div className="row">
                <div className="col-md-6 mb-4">
                    <Link to="/flats_74" className="btn btn-outline-primary d-block position-relative" style={{ height: "450px", width: "100%" }}>
                        <div className="position-absolute top-50 start-50 translate-middle text-white bg-dark bg-opacity-75 p-3 rounded">
                            {language.texts.house} 74
                        </div>
                    </Link>
                </div>
                <div className="col-md-6 mb-4">
                    <Link to="/flats_27" className="btn btn-outline-primary d-block position-relative" style={{ height: "450px", width: "100%" }}>
                        <div className="position-absolute top-50 start-50 translate-middle text-white bg-dark bg-opacity-75 p-3 rounded">
                            {language.texts.house} 27
                        </div>
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default Dashboard;
