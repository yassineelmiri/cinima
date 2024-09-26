const mongoose = require("mongoose");

const SalleSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  capacite: { type: Number, required: true },
  typeSalle: { type: String, required: true },
});

module.exports = mongoose.model("Salle", SalleSchema);
