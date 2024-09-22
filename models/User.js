const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    motDePasse: { type: String, required: true },
    role: { type: String, enum: ['client', 'administrateur'], default: 'client' }
});

// Hashage du mot de passe avant de sauvegarder l'utilisateur
userSchema.pre('save', async function(next) {
    if (!this.isModified('motDePasse')) return next();
    const salt = await bcrypt.genSalt(10);
    this.motDePasse = await bcrypt.hash(this.motDePasse, salt);
    console.log('Mot de passe hashé avant sauvegarde:', this.motDePasse);
    next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
