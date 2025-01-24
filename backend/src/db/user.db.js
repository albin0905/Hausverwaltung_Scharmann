const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: Number, required: true },
    address: { type: String, required: true },
    administrator: { type: Number, required: true }
}, { collection: 'users' });

const UserModel = mongoose.model('User', UserSchema);

module.exports = {User: UserModel};