const mongoose = require('mongoose');

const FlatSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    floor: { type: String, required: true },
    numberOfRooms: { type: Number, required: true },
    certainRooms: {
        bathroom: { type: Number, required: true },
        toilets: { type: Number, required: true },
        kitchen: { type: Number, required: true },
        bedroom: { type: Number, required: true },
        balconies: { type: Number, default: 0 },
        storageRooms: { type: Number, default: 0 },
        other: { type: Map, of: Number }, // Stores custom rooms like "Büro"
    },
    rentable: { type: Boolean, required: true },
});

const HouseSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    flats: [FlatSchema],
});

const Flat = mongoose.model('Flat', FlatSchema);
const House = mongoose.model('House', HouseSchema);
module.exports = { Flat,House};
