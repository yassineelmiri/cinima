const express = require('express');
const router = express.Router();
const SeanceController = require('../controllers/SeanceController');
const authMiddleware = require('../middleware/auth');

router.post('/', SeanceController.addSeance);
router.get('/', SeanceController.getSeances);
router.put('/:id', SeanceController.updateSeance);
router.delete('/:id', SeanceController.deleteSeance);

module.exports = router;
