const Film = require('../models/Film');

// Ajouter un film
exports.addFilm = async (req, res) => {
    const { titre, description, duree, genre, dateSortie } = req.body;
    const film = new Film({ titre, description, duree, genre, dateSortie });
    await film.save();
    res.status(201).json(film);
};

// Lister les films
exports.getFilms = async (req, res) => {
    const films = await Film.find();
    res.json(films);
};

// Modifier un film
exports.updateFilm = async (req, res) => {
    const { id } = req.params;
    const updatedFilm = await Film.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedFilm);
};

// Supprimer un film
exports.deleteFilm = async (req, res) => {
    const { id } = req.params;
    await Film.findByIdAndDelete(id);
    res.status(204).send();
};
