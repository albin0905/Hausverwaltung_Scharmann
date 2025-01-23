const express = require('express');
const { User } = require('../db/login'); // User-Model importieren

const router = express.Router();

// GET: Alle Benutzer abrufen
// http://localhost:3000/user
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error('Fehler beim Abrufen der Benutzer:', err);
        res.status(500).json({ message: 'Interner Serverfehler' });
    }
});

// POST: Benutzer erstellen
// http://localhost:3000/user
router.post('/', async (req, res) => {
    try {
        const { firstname, lastname, email, password, phone, address, administrator } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email und Passwort sind erforderlich' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Benutzer mit dieser Email existiert bereits' });
        }

        const lastUser = await User.findOne().sort({ id: -1 }).limit(1);
        const newId = lastUser ? lastUser.id + 1 : 1;

        const newUser = new User({
            id: newId,
            firstname,
            lastname,
            email,
            password,
            phone,
            address,
            administrator
        });

        await newUser.save();
        res.status(201).json({ message: 'Benutzer erfolgreich erstellt' });
    } catch (err) {
        console.error('Fehler beim Erstellen des Benutzers:', err);
        res.status(500).json({ message: 'Interner Serverfehler' });
    }
});


// PUT: Benutzer aktualisieren
// http://localhost:3000/user/4
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params; // ID aus der Route
        const updateData = req.body;

        // Suche Benutzer mit "id"-Feld statt "_id"
        const updatedUser = await User.findOneAndUpdate({ id }, updateData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'Benutzer nicht gefunden' });
        }

        res.json(updatedUser);
    } catch (err) {
        console.error('Fehler beim Aktualisieren des Benutzers:', err);
        res.status(500).json({ message: 'Interner Serverfehler' });
    }
});

//http://localhost:3000/user/1
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Suche Benutzer mit "id"-Feld statt "_id"
        const deletedUser = await User.findOneAndDelete({ id });

        if (!deletedUser) {
            return res.status(404).json({ message: 'Benutzer nicht gefunden' });
        }

        res.json({ message: 'Benutzer erfolgreich gelöscht' });
    } catch (err) {
        console.error('Fehler beim Löschen des Benutzers:', err);
        res.status(500).json({ message: 'Interner Serverfehler' });
    }
});

module.exports = router;