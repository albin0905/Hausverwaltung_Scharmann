const express = require('express');
const router = express.Router();
const { House } = require('../db/House.db'); // Pfad ggf. anpassen

router.get('/house/:id/flats', async (req, res) => {
    const houseId = req.params.id; // houseId direkt übernehmen

    try {
        const house = await House.findOne({ id: houseId }).populate('flats');
        if (!house) {
            return res.status(404).json({ message: 'Haus nicht gefunden' });
        }

        res.json(house.flats);
    } catch (error) {
        console.error('Fehler beim Abrufen der Wohnungen:', error);
        res.status(500).json({ message: 'Interner Serverfehler' });
    }
});

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

router.post('/house', async (req, res) => {
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

module.exports = router;
