import React from 'react';
import {Container, Typography} from "@mui/material";
import profilbild from '../../assets/Helmut.png';

function Impressum() {
    return (
        <Container className={"marginSettings impressum"}>
            <p>Helmut Scharmann</p>
            <img src={profilbild} alt="" style={{width:"30%"}}/>
            <p>Hier kommt der Text von Scharmann</p>
        </Container>
    );
}

export default Impressum;
