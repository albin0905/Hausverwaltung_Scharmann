const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    name: { type: String, required: true }
});

const FlatSchema = new mongoose.Schema({
    buildingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Building', required: true },
    name: { type: String, required: true },
    floor: { type: String, required: true },
    numberOfRooms: { type: Number, required: true },
    certainRooms: [RoomSchema],
    rent: { type: Boolean, required: true }
});

const HouseSchema = new mongoose.Schema({
    buildingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Building', required: true },
    name: { type: String, required: true },
    floor: { type: Number, required: true },
    numberOfRooms: { type: Number, required: true },
    certainRooms: [RoomSchema],
    garden: { type: Boolean, required: true },
    garage: { type: Boolean, required: true }
});

const BuildingSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Hinzugefügter Name für das Gebäude
    flats: [FlatSchema],
    houses: [HouseSchema]
}, {
    timestamps: true // Fügt createdAt und updatedAt Felder hinzu
});

const BuildingModel = mongoose.model('Building', BuildingSchema);

module.exports = BuildingModel;