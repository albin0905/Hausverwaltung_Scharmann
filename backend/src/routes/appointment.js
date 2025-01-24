const express = require('express');
const { Appointment } = require('../db/appointment.db'); // Pfad anpassen
const { User } = require('../db/user.db'); // User-Modell importieren
const router = express.Router();

// GET: Alle Termine abrufen (nur Admin)
// http://localhost:3000/appointments
router.get('/', async (req, res) => {
    try {
        const appointments = await Appointment.find();
        const detailedAppointments = await Promise.all(
            appointments.map(async (appointment) => {
                const user = await User.findOne({ id: appointment.userId });

                // Falls der Benutzer nicht existiert, einen Platzhalter verwenden
                if (!user) {
                    return {
                        id: appointment.id,
                        date: appointment.date,
                        time: appointment.time,
                        description: appointment.description,
                        user: {
                            firstname: "Unbekannt",
                            lastname: "Unbekannt",
                            phone: "Unbekannt",
                        },
                    };
                }

                return {
                    id: appointment.id,
                    date: appointment.date,
                    time: appointment.time,
                    description: appointment.description,
                    user: {
                        firstname: user.firstname,
                        lastname: user.lastname,
                        phone: user.phone,
                    },
                };
            })
        );

        res.json(detailedAppointments);
    } catch (err) {
        console.error('Fehler beim Abrufen der Termine:', err);
        res.status(500).json({ message: 'Interner Serverfehler' });
    }
});


// GET: Termine eines bestimmten Benutzers abrufen
// http://localhost:3000/appointments/user/:userId
router.get('/user/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const appointments = await Appointment.find({ userId: Number(userId) });
        res.json(appointments);
    } catch (err) {
        console.error('Fehler beim Abrufen der Termine des Benutzers:', err);
        res.status(500).json({ message: 'Interner Serverfehler' });
    }
});

// POST: Termin erstellen
// http://localhost:3000/appointments
router.post('/', async (req, res) => {
    try {
        const { userId, date, time, description } = req.body;

        if (!userId || !date || !time) {
            return res.status(400).json({ message: 'Benutzer-ID, Datum und Uhrzeit sind erforderlich' });
        }

        const lastAppointment = await Appointment.findOne().sort({ id: -1 }).limit(1);
        const newId = lastAppointment ? lastAppointment.id + 1 : 1;

        const newAppointment = new Appointment({
            id: newId,
            userId,
            date,
            time,
            description,
        });

        await newAppointment.save();
        res.status(201).json({ message: 'Termin erfolgreich erstellt', appointment: newAppointment });
    } catch (err) {
        console.error('Fehler beim Erstellen des Termins:', err);
        res.status(500).json({ message: 'Interner Serverfehler' });
    }
});

// PUT: Termin aktualisieren
// http://localhost:3000/appointments/:id
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { date, time, description } = req.body;

    try {
        const updatedAppointment = await Appointment.findOneAndUpdate(
            { id: Number(id) },
            { date, time, description },
            { new: true }
        );

        if (!updatedAppointment) {
            return res.status(404).json({ message: 'Termin nicht gefunden' });
        }

        res.json({ message: 'Termin erfolgreich aktualisiert', appointment: updatedAppointment });
    } catch (err) {
        console.error('Fehler beim Aktualisieren des Termins:', err);
        res.status(500).json({ message: 'Interner Serverfehler' });
    }
});

// DELETE: Termin löschen
// http://localhost:3000/appointments/:id
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedAppointment = await Appointment.findOneAndDelete({ id: Number(id) });

        if (!deletedAppointment) {
            return res.status(404).json({ message: 'Termin nicht gefunden' });
        }

        res.json({ message: 'Termin erfolgreich gelöscht' });
    } catch (err) {
        console.error('Fehler beim Löschen des Termins:', err);
        res.status(500).json({ message: 'Interner Serverfehler' });
    }
});

module.exports = router;
