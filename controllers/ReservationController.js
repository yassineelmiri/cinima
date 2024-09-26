const nodemailer = require('nodemailer');
const Reservation = require("../models/Reservation");

exports.makeReservation = async (req, res) => {
    const { seance, places } = req.body;

    // Vérifie si l'utilisateur est authentifié
    if (!req.user || !req.user._id) {
        return res.status(401).json({ message: 'Utilisateur non authentifié' });
    }

    try {
        const reservation = new Reservation({ client: req.user._id, seance, places });
        await reservation.save();

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: req.user.email, 
            subject: 'Confirmation de votre réservation',
            html: `<p>Votre réservation a été confirmée !</p>
                   <p>Détails de la réservation :</p>
                   <p>Seance: ${seance}</p>
                   <p>Nombre de places: ${places}</p>`
        };

        await transporter.sendMail(mailOptions);

        res.status(201).json(reservation);
    } catch (error) {
        console.error('Erreur lors de la réservation:', error);
        res.status(500).json({ message: 'Erreur du serveur', error: error.message });
    }
};

exports.cancelReservation = async (req, res) => {
    const { id } = req.params;

    try {
        await Reservation.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de l\'annulation de la réservation', error: error.message });
    }
};

exports.getReservations = async (req, res) => {
    if (!req.user || !req.user._id) {
        return res.status(401).json({ message: 'Utilisateur non authentifié' });
    }

    try {
        const reservations = await Reservation.find({ client: req.user._id }).populate("seance");
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des réservations', error: error.message });
    }
};
