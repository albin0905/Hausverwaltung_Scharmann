const mongoose = require('mongoose');

const initMongoConnect = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/hausverwaltung_scharmann", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB erfolgreich verbunden');
    } catch (err) {
        console.error('Fehler beim Verbinden mit MongoDB:', err);
    }
};

module.exports = {initMongoConnect};