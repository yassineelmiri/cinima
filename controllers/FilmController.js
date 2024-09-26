const Film = require("../models/Film");


exports.addFilm = async (req, res) => {
  const { titre, description, duree, genre, dateSortie } = req.body;
  try {
    const film = new Film({ titre, description, duree, genre, dateSortie });
    await film.save();
    res.status(201).json(film);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de l'ajout du film",
      error: error.message,
    });
  }
};


exports.getFilms = async (req, res) => {
  try {
    const films = await Film.find();
    res.json(films);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des films",
      error: error.message,
    });
  }
};

exports.updateFilm = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedFilm = await Film.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedFilm)
      return res.status(404).json({ message: "Film non trouvé" });
    res.json(updatedFilm);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la mise à jour du film",
      error: error.message,
    });
  }
};

exports.deleteFilm = async (req, res) => {
  const { id } = req.params;
  try {
    const film = await Film.findByIdAndDelete(id);
    if (!film) return res.status(404).json({ message: "Film non trouvé" });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la suppression du film",
      error: error.message,
    });
  }
};
