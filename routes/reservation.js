const express = require("express");
const router = express.Router();
const ReservationController = require("../controllers/ReservationController");
const authMiddleware = require("../middleware/auth");

// Utilisation du middleware d'authentification pour protéger les routes
router.post("/", authMiddleware, ReservationController.makeReservation);
router.delete("/:id", authMiddleware, ReservationController.cancelReservation);
router.get("/", authMiddleware, ReservationController.getReservations);

module.exports = router;
