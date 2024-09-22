const express = require('express');
const router = express.Router();
const ReservationController = require('../controllers/ReservationController');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, ReservationController.makeReservation);
router.delete('/:id', authMiddleware, ReservationController.cancelReservation);
router.get('/', authMiddleware, ReservationController.getReservations);

module.exports = router;
