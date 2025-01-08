const express = require('express');
const router = express.Router();
const { House } = require('../db/House.db');

// http://localhost:3000/houses
router.post('/', async (req, res) => {
    try {
        const { name, flats } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Name ist erforderlich' });
        }

        // Maximal existierende ID ermitteln
        const maxHouse = await House.findOne().sort({ id: -1 }).exec();
        const nextId = maxHouse ? maxHouse.id + 1 : 1; // Falls keine Häuser existieren, beginne mit ID 1

        const newHouse = new House({
            id: nextId,
            name,
            flats: flats || [],
        });

        await newHouse.save();

        res.status(201).json({ message: 'Haus erfolgreich erstellt', house: newHouse });
    } catch (error) {
        console.error('Fehler beim Hinzufügen des Hauses:', error);
        res.status(500).json({ message: 'Interner Serverfehler' });
    }
});


// http://localhost:3000/houses/:id
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Konvertiere id zu einer Zahl
        const numericId = parseInt(id, 10);

        const house = await House.findOne({ id: numericId }); // Suche nach der numerischen ID

        if (!house) {
            return res.status(404).json({ message: 'Haus nicht gefunden' });
        }

        res.status(200).json(house);
    } catch (error) {
        console.error('Fehler beim Abrufen des Hauses:', error);
        res.status(500).json({ message: 'Interner Serverfehler' });
    }
});


// http://localhost:3000/houses/:houseId
router.put('/:houseId', async (req, res) => {
    const { houseId } = req.params;
    const { name, flats } = req.body;

    try {
        const house = await House.findOne({ id: houseId });

        if (!house) {
            return res.status(404).json({ message: 'Haus nicht gefunden' });
        }

        if (name) house.name = name;
        if (flats) house.flats = flats;

        await house.save();

        res.status(200).json({ message: 'Haus erfolgreich aktualisiert', house });
    } catch (error) {
        console.error('Fehler beim Aktualisieren des Hauses:', error);
        res.status(500).json({ message: 'Interner Serverfehler' });
    }
});
//http://localhost:3000/houses/:houseId
router.delete('/:houseId', async (req, res) => {
    const { houseId } = req.params;

    try {
        const house = await House.findOne({ id: houseId });

        if (!house) {
            return res.status(404).json({ message: 'Haus nicht gefunden' });
        }

        await House.deleteOne({ id: houseId });

        res.status(200).json({ message: 'Haus erfolgreich gelöscht' });
    } catch (error) {
        console.error('Fehler beim Löschen des Hauses:', error);
        res.status(500).json({ message: 'Interner Serverfehler' });
    }
});
// http://localhost:3000/houses
router.get('/', async (req, res) => {
    try {
        const houses = await House.find();

        if (!houses) {
            return res.status(404).json({message: 'Keine Häuser gefunden'});
        }

        res.status(200).json(houses);
    } catch (error) {
        console.error('Fehler beim Abrufen der Häuser:', error);
        res.status(500).json({message: 'Interner Serverfehler'});
    }
})

module.exports = router;
