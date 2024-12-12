const mongoose = require('mongoose');

const FlatSchema = new mongoose.Schema({
    flatName: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
});

const Flat = mongoose.model('Flat', FlatSchema);

module.exports = Flat;
