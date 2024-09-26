const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Définition du schéma pour l'utilisateur
const userSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  motDePasse: { type: String, required: true },
  image: { type: String, default: null },
  numeroTelephone: { type: String, required: true },
  adresse: { type: String, required: true },
  role: { type: String, enum: ["client", "administrateur"], default: "client" },
  resetPasswordToken: { type: String },
  resetPasswordExpiry: { type: Date },
});

// Middleware pour hacher le mot de passe avant de sauvegarder l'utilisateur
userSchema.pre("save", async function (next) {
  if (!this.isModified("motDePasse")) return next();
  const salt = await bcrypt.genSalt(10);
  this.motDePasse = await bcrypt.hash(this.motDePasse, salt);
  console.log("Mot de passe hashé avant sauvegarde:", this.motDePasse);
  next();
});

// Méthode pour comparer le mot de passe saisi avec celui stocké
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.motDePasse);
};

// Création du modèle User
const User = mongoose.model("User", userSchema);
module.exports = User;
