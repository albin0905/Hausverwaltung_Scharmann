const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    userId: { type: Number, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    description: { type: String, default: '' },
    confirmed: { type: Boolean, default: false }
});

const AppointmentDb = mongoose.model('Appointment', AppointmentSchema);

module.exports = { Appointment: AppointmentDb };
