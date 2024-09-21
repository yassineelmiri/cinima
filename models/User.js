const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    motDePasse: { type: String, required: true },
    rôle: { type: String, default: 'client' }
});

module.exports = mongoose.model('User', UserSchema);
