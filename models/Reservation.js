const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    seance: { type: mongoose.Schema.Types.ObjectId, ref: 'Seance', required: true },
    places: { type: Number, required: true },
    dateReservation: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reservation', ReservationSchema);
