const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    count: { type: Number, required: true },
});

const FlatSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    buildingId: { type: mongoose.Schema.Types.ObjectId, ref: 'BuildingDb', required: true },
    name: { type: String, required: true },
    floor: { type: String, required: true },
    numberOfRooms: { type: Number, required: true },
    certainRooms: [RoomSchema],
    rent: { type: Boolean, required: true },
});

const HouseSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    buildingId: { type: mongoose.Schema.Types.ObjectId, ref: 'BuildingDb', required: true },
    name: { type: String, required: true },
    floor: { type: Number, required: true },
    numberOfRooms: { type: Number, required: true },
    certainRooms: [RoomSchema],
    garden: { type: Boolean, required: true },
    garage: { type: Boolean, required: true },
});

const BuildingSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    flats: [FlatSchema],
    houses: [HouseSchema],
});

const Room = mongoose.model('Room', RoomSchema);
const Flat = mongoose.model('Flat', FlatSchema);
const House = mongoose.model('House', HouseSchema);
const BuildingDb = mongoose.model('BuildingDb', BuildingSchema);

module.exports = { Room, Flat, House, BuildingDb };
