const Salle = require('../models/Salle');

// Ajouter une salle
exports.addSalle = async (req, res) => {
    const { nom, capacite, typeSalle } = req.body;
    const salle = new Salle({ nom, capacite, typeSalle });
    await salle.save();
    res.status(201).json(salle);
};

// Lister les salles
exports.getSalles = async (req, res) => {
    const salles = await Salle.find();
    res.json(salles);
};

// Modifier une salle
exports.updateSalle = async (req, res) => {
    const { id } = req.params;
    const updatedSalle = await Salle.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedSalle);
};

// Supprimer une salle
exports.deleteSalle = async (req, res) => {
    const { id } = req.params;
    await Salle.findByIdAndDelete(id);
    res.status(204).send();
};
