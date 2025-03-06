const mongoose = require('mongoose');
const mockUsers = require('../mock/mock_users');
const mockFlats = require('../mock/mock_flats');
const mockHouses = require('../mock/mock_house');
const mockAppointments = require('../mock/mock_appointments');
const {User} = require("./user.db");
const {Flat} = require("./flat.db");
const {House} = require("./house.db");
const {Appointment} = require("./appointment.db");

const DB_URL = 'mongodb://localhost:27017/hausverwaltung_scharmann';

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, "Verbindungsfehler Mongoose"));
db.once('open', () => console.log("DB Mongoose Connection Established"));


async function initializeDB() {
    try {

        if (!User || !Flat || !House || !Appointment) {
            throw new Error("Mongoose models are not properly initialized");
        }

        await User.deleteMany();
        await Flat.deleteMany();
        await House.deleteMany();
        await Appointment.deleteMany();


        const users = await User.insertMany(mockUsers);
        const flats = await Flat.insertMany(mockFlats);
        const houses = await House.insertMany(mockHouses);
        const appointments = await Appointment.insertMany(mockAppointments);

        console.log("DB is successfully initialized. Inserted:",
            users.length, "users,",
            flats.length, "flats,",
            houses.length, "houses,",
            appointments.length, "appointments.");

    } catch (err) {
        console.log("Error initializing: " + err.message);
    }
}

module.exports = {initializeDB };