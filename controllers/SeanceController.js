const Seance = require('../models/Seance');

// Ajouter une séance
exports.addSeance = async (req, res) => {
    const { film, salle, horaire, tarif } = req.body;
    const seance = new Seance({ film, salle, horaire, tarif });
    await seance.save();
    res.status(201).json(seance);
};

// Lister les séances
exports.getSeances = async (req, res) => {
    const seances = await Seance.find().populate('film salle');
    res.json(seances);
};

// Modifier une séance
exports.updateSeance = async (req, res) => {
    const { id } = req.params;
    const updatedSeance = await Seance.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedSeance);
};

// Supprimer une séance
exports.deleteSeance = async (req, res) => {
    const { id } = req.params;
    await Seance.findByIdAndDelete(id);
    res.status(204).send();
};
