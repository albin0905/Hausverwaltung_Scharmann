// @ts-ignore
const express = require('express');
const { Flat, BuildingDb, House, Room } = require("../db/Building.db");

const router = express.Router();

router.post('/flats', async (req, res) => {
    try {
        const flat = new Flat(req.body);
        const savedFlat = await flat.save();
        res.status(201).json(savedFlat);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/flats', async (req, res) => {
    try {
        const flats = await Flat.find();
        res.json(flats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/houses', async (req, res) => {
    try {
        const house = new House(req.body);
        const savedHouse = await house.save();
        res.status(201).json(savedHouse);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/houses', async (req, res) => {
    try {
        const houses = await House.find();
        res.json(houses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/properties', async (req, res) => {
    try {
        const flats = await Flat.find({}, 'name'); // Only the 'name' field is returned
        const houses = await House.find({}, 'name');

        // Combine the names of flats and houses
        const propertyNames = {
            flats: flats.map((flat) => flat.name),
            houses: houses.map((house) => house.name),
        };
        res.json(propertyNames);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
