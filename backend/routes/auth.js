var express = require('express');
var router = express.Router();
const User = require('../models/User');

// Login-Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Bitte Email und Passwort angeben.' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'Benutzer nicht gefunden.' });
        }

        if (user.password !== password) {
            return res.status(401).json({ error: 'Ungültiges Passwort.' });
        }
        res.status(200).json({ message: 'Login erfolgreich!', user });
    } catch (error) {
        console.error('Fehler bei der Login-Anfrage:', error);
        res.status(500).json({ error: 'Serverfehler.' });
    }
});

module.exports = router;
