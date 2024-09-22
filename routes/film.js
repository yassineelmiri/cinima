const express = require('express');
const router = express.Router();
const FilmController = require('../controllers/FilmController');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, FilmController.addFilm);
router.get('/', FilmController.getFilms);
router.put('/:id', authMiddleware, FilmController.updateFilm);
router.delete('/:id', authMiddleware, FilmController.deleteFilm);

module.exports = router;
