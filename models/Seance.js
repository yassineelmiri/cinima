const mongoose = require("mongoose");

const SeanceSchema = new mongoose.Schema({
  film: { type: mongoose.Schema.Types.ObjectId, ref: "Film", required: true },
  salle: { type: mongoose.Schema.Types.ObjectId, ref: "Salle", required: true },
  horaire: { type: Date, required: true },
  tarif: { type: Number, required: true },
});

module.exports = mongoose.model("Seance", SeanceSchema);
