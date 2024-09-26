const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


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


userSchema.pre("save", async function (next) {
  if (!this.isModified("motDePasse")) return next();
  const salt = await bcrypt.genSalt(10);
  this.motDePasse = await bcrypt.hash(this.motDePasse, salt);
  console.log("Mot de passe hashé avant sauvegarde:", this.motDePasse);
  next();
});


userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.motDePasse);
};


const User = mongoose.model("User", userSchema);
module.exports = User;
