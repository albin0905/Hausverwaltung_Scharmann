const express = require('express');
const router = express.Router();
const { House } = require('../db/House.db');

// http://localhost:3000/houses
router.post('/', async (req, res) => {
    try {
        const { id, name, flats } = req.body;

        if (!id || !name) {
            return res.status(400).json({ message: 'ID und Name sind erforderlich' });
        }

        const existingHouse = await House.findOne({ id });
        if (existingHouse) {
            return res.status(400).json({ message: 'Ein Haus mit dieser ID existiert bereits' });
        }

        const newHouse = new House({
            id,
            name,
            flats: flats || []
        });

        await newHouse.save();

        res.status(201).json({ message: 'Haus erfolgreich erstellt', house: newHouse });
    } catch (error) {
        console.error('Fehler beim Hinzufügen des Hauses:', error);
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
