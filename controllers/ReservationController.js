const nodemailer = require('nodemailer');
const Reservation = require("../models/Reservation");

exports.makeReservation = async (req, res) => {
    const { seance, places } = req.body;

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
  await Reservation.findByIdAndDelete(id);
  res.status(204).send();
};

exports.getReservations = async (req, res) => {
  const reservations = await Reservation.find({ client: req.user }).populate("seance");
  res.json(reservations);
};
