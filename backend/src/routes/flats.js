const express = require('express');
const router = express.Router();
const { House } = require('../db/house.db'); // Pfad ggf. anpassen

//http://localhost:3000/flats/house/1/flats
//Wohnungen zu dem jeweiligem Haus
router.get('/house/:id/flats', async (req, res) => {
    const houseId = req.params.id;
    try {
        const house = await House.findOne({ id: Number(houseId) });

        if (!house) {
            return res.Qstatus(404).json({ message: 'Haus nicht gefunden' });
        }

        res.json(house.flats);
    } catch (error) {
        console.error('Fehler beim Abrufen der Wohnungen:', error);
        res.status(500).json({ message: 'Interner Serverfehler' });
    }
});


//http://localhost:3000/flats/flats
//alle Wohnungen
router.get('/flats', async (req, res) => {
    try {
        const houses = await House.find();
        const allFlats = houses.flatMap(house => house.flats);

        res.json(allFlats);
    } catch (error) {
        console.error('Fehler beim Abrufen aller Wohnungen:', error);
        res.status(500).json({ message: 'Interner Serverfehler' });
    }
});

// http://localhost:3000/flats/house/:houseId/flats
router.post('/house/:houseId/flats', async (req, res) => {
    const { houseId } = req.params;
    const { name, floor, numberOfRooms, certainRooms, rentable } = req.body;

    try {
        const house = await House.findOne({ id: houseId });
        if (!house) {
            return res.status(404).json({ message: 'Haus nicht gefunden' });
        }

        const maxId = house.flats.reduce((max, flat) => Math.max(max, Number(flat.id)), 0);
        const newId = maxId + 1;

        const newFlat = {
            id: newId.toString(),
            name,
            floor,
            numberOfRooms,
            certainRooms,
            rentable
        };

        house.flats.push(newFlat);
        await house.save();

        res.status(201).json({ message: 'Wohnung erfolgreich hinzugefügt', flat: newFlat });
    } catch (error) {
        console.error('Fehler beim Hinzufügen der Wohnung:', error);
        res.status(500).json({ message: 'Interner Serverfehler' });
    }
});


// PUT: Eine Wohnung in einem Haus bearbeiten
// http://localhost:3000/flats/house/:houseId/flats/flatId
router.put('/house/:houseId/flats/:flatId', async (req, res) => {
    const { houseId, flatId } = req.params;
    const { name, floor, numberOfRooms, certainRooms, rentable } = req.body;

    try {
        const house = await House.findOne({ id: houseId });
        if (!house) {
            return res.status(404).json({ message: 'Haus nicht gefunden' });
        }

        const flat = house.flats.find(flat => flat.id === flatId);
        if (!flat) {
            return res.status(404).json({ message: 'Wohnung nicht gefunden' });
        }

        // Aktualisiere die Flat-Daten
        if (name) flat.name = name;
        if (floor) flat.floor = floor;
        if (numberOfRooms) flat.numberOfRooms = numberOfRooms;
        if (certainRooms) flat.certainRooms = certainRooms;
        if (rentable !== undefined) flat.rentable = rentable;

        await house.save();

        res.status(200).json({ message: 'Wohnung erfolgreich aktualisiert', flat });
    } catch (error) {
        console.error('Fehler beim Aktualisieren der Wohnung:', error);
        res.status(500).json({ message: 'Interner Serverfehler' });
    }
});

// DELETE: Eine Wohnung aus einem Haus löschen
// http://localhost:3000/flats/house/:houseId/flats/flatId
router.delete('/house/:houseId/flats/:flatId', async (req, res) => {
    const { houseId, flatId } = req.params;

    try {
        const house = await House.findOne({ id: houseId });
        if (!house) {
            return res.status(404).json({ message: 'Haus nicht gefunden' });
        }

        const flatIndex = house.flats.findIndex(flat => flat.id === flatId);
        if (flatIndex === -1) {
            return res.status(404).json({ message: 'Wohnung nicht gefunden' });
        }

        // Wohnung löschen
        house.flats.splice(flatIndex, 1);
        await house.save();

        res.status(200).json({ message: 'Wohnung erfolgreich gelöscht' });
    } catch (error) {
        console.error('Fehler beim Löschen der Wohnung:', error);
        res.status(500).json({ message: 'Interner Serverfehler' });
    }
});

module.exports = router;
