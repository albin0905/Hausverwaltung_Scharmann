const mongoose = require('mongoose');
const { FlatSchema } = require('./flat.db');

const HouseSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    flats: [FlatSchema],
});

const House = mongoose.model('House', HouseSchema);

module.exports = { House };
