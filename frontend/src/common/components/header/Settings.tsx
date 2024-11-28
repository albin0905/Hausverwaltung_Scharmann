import React, { useState } from 'react';
import { Container, Typography, Card, CardContent, Button, Divider, List, ListItem, ListItemText } from '@mui/material';

function Settings() {
    const customerInfo = {
        name: "David Fink",
        email: "findaa21@htl-kaindorf.com",
        nummer: "+43 3075989",
        address: "Höhenstraße 37"
    };

    const propertyInfo = {
        wochungsNummer: 27,
        wohnungsAdresse: "Eibiswald",
        mietkosten: "850€",
        zahltag: "1. des Monats"
    };

    return (
        <Container className={"marginSettings"}>
            <Typography variant="h4">Willkommen, {customerInfo.name}!</Typography>

            <Card style={{ marginBottom: '20px' }}>
                <CardContent>
                    <Typography variant="h6">Persönliche Daten</Typography>
                    <Divider style={{ margin: '10px 0' }} />
                    <List>
                        <ListItem>
                            <ListItemText primary="Name" secondary={customerInfo.name} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="E-Mail" secondary={customerInfo.email} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Telefon" secondary={customerInfo.nummer} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Adresse" secondary={customerInfo.address} />
                        </ListItem>
                    </List>
                    <Button variant="outlined" color="primary" style={{ marginTop: '10px' }}>Daten bearbeiten</Button>
                </CardContent>
            </Card>

            <Card style={{ marginBottom: '20px' }}>
                <CardContent>
                    <Typography variant="h6">Immobilieninformationen</Typography>
                    <Divider style={{ margin: '10px 0' }} />
                    <List>
                        <ListItem>
                            <ListItemText primary="Wochungsnummer" secondary={propertyInfo.wochungsNummer} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Adresse" secondary={propertyInfo.wohnungsAdresse} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Miete" secondary={propertyInfo.mietkosten} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Fälligkeitsdatum" secondary={propertyInfo.zahltag} />
                        </ListItem>
                    </List>
                </CardContent>
            </Card>

        </Container>
    );
}

export default Settings;
