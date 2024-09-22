const Reservation = require('../models/Reservation');

// Réserver des places
exports.makeReservation = async (req, res) => {
    const { seance, places } = req.body;
    const reservation = new Reservation({ client: req.user, seance, places });
    await reservation.save();
    res.status(201).json(reservation);
};

// Annuler une réservation
exports.cancelReservation = async (req, res) => {
    const { id } = req.params;
    await Reservation.findByIdAndDelete(id);
    res.status(204).send();
};

// Historique des réservations
exports.getReservations = async (req, res) => {
    const reservations = await Reservation.find({ client: req.user }).populate('seance');
    res.json(reservations);
};
