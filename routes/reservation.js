const express = require("express");
const router = express.Router();
const ReservationController = require("../controllers/ReservationController");
const authMiddleware = require("../middleware/auth");

router.post("/", ReservationController.makeReservation);
router.delete("/:id", ReservationController.cancelReservation);
router.get("/", ReservationController.getReservations);

module.exports = router;
