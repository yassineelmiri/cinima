const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema({
    titre: { type: String, required: true },
    description: { type: String, required: true },
    duree: { type: Number, required: true },
    genre: { type: String, required: true },
    dateSortie: { type: Date, required: true }
});

module.exports = mongoose.model('Film', filmSchema);
