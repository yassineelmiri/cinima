const express = require('express');
const router = express.Router();
const SeanceController = require('../controllers/SeanceController');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, SeanceController.addSeance);
router.get('/', SeanceController.getSeances);
router.put('/:id', authMiddleware, SeanceController.updateSeance);
router.delete('/:id', authMiddleware, SeanceController.deleteSeance);

module.exports = router;
