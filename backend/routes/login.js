const express = require('express');
const { User } = require('../db/login'); // User-Model importieren

const router = express.Router();

// http://localhost:3000/login
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error('Fehler beim Abrufen der Benutzer:', err);
        res.status(500).json({ message: 'Interner Serverfehler' });
    }
});


// LOGIN: Benutzer authentifizieren
// http://localhost:3000/login
router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email und Passwort sind erforderlich' });
        }

        const user = await User.findOne({ email });

        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Ungültige Anmeldedaten' });
        }

        res.json({ message: 'Erfolgreich eingeloggt', user });
    } catch (err) {
        console.error('Fehler beim Login:', err);
        res.status(500).json({ message: 'Interner Serverfehler' });
    }
});


module.exports = router;
