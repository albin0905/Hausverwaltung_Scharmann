const express = require('express');
const router = express.Router();
const { Login } = require('../db/login');

router.post('/', async (req, res) => {
    try {
        let email = req.body.email;
        let password = req.body.password;
        console.log(JSON.parse(email));
        console.log(JSON.parse(password));

        if (!email || !password) {
            return res.status(400).json({ message: 'Email und Passwort sind erforderlich' });
        }
        const newUser = new Login({
            email,
            password
        });

        await newUser.save();
        res.status(201).json({ message: 'Benutzer erfolgreich erstellt' });
    } catch (err) {
        console.error('Fehler beim Hinzufügen des Nutzers:', err);
        res.status(500).json({ message: 'Interner Serverfehler' });
    }
});

router.get('/', async (req, res) => {
    try {
        const users = await Login.find(); // Alle Benutzer abrufen
        res.json(users);
    } catch (err) {
        console.error('Fehler beim Abrufen der Benutzer:', err);
        res.status(500).json({ message: 'Interner Serverfehler' });
    }
});


module.exports = router;
