const express = require('express');
const router = express.Router();
const SalleController = require('../controllers/SalleController');
const authMiddleware = require('../middleware/auth');

router.post('/', SalleController.addSalle);
router.get('/', SalleController.getSalles);
router.put('/:id', SalleController.updateSalle);
router.delete('/:id', SalleController.deleteSalle);

module.exports = router;
