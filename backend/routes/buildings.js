const express = require('express');
const router = express.Router();
const Building = require('../db/building');

router.get('/', async (req, res) => {
    try {
        const buildings = await Building.find({}, 'name flats houses');

        const buildingDetails = buildings.map(building => ({
            buildingId: building._id,
            name: building.name,
            flats: building.flats.map(flat => ({
                flatId: flat._id,
                name: flat.name
            })),
            houses: building.houses.map(house => ({
                houseId: house._id,
                name: house.name
            }))
        }));

        res.json(buildingDetails);
    } catch (err) {
        console.error('Fehler beim Abrufen der Gebäudeinformationen:', err);
        res.status(500).json({ message: 'Interner Serverfehler' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { name, flats, houses } = req.body;

        const newBuilding = new Building({
            name,
            flats: flats.map(flat => ({
                ...flat
            })),
            houses: houses.map(house => ({
                ...house
            }))
        });

        await newBuilding.save();

        res.status(201).json({
            message: 'Gebäude erfolgreich hinzugefügt',
            buildingId: newBuilding._id
        });
    } catch (err) {
        console.error('Fehler beim Hinzufügen des Gebäudes:', err);
        res.status(500).json({ message: 'Interner Serverfehler', error: err.message });
    }
});

// Route: Details eines spezifischen Gebäudes abrufen
router.get('/:buildingId', async (req, res) => {
    try {
        const building = await Building.findById(req.params.buildingId);

        if (!building) {
            return res.status(404).json({ message: 'Gebäude nicht gefunden' });
        }

        res.json({
            buildingId: building._id,
            name: building.name,
            flats: building.flats,
            houses: building.houses
        });
    } catch (err) {
        console.error('Fehler beim Abrufen des Gebäudes:', err);
        res.status(500).json({ message: 'Interner Serverfehler' });
    }
});

module.exports = router;