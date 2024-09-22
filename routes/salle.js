const express = require('express');
const router = express.Router();
const SalleController = require('../controllers/SalleController');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, SalleController.addSalle);
router.get('/', SalleController.getSalles);
router.put('/:id', authMiddleware, SalleController.updateSalle);
router.delete('/:id', authMiddleware, SalleController.deleteSalle);

module.exports = router;
