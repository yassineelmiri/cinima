const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const filmRoutes = require('./routes/film');
const salleRoutes = require('./routes/salle');
const seanceRoutes = require('./routes/seance');
const reservationRoutes = require('./routes/reservation');

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connecté...'))
    .catch(err => console.error('Erreur de connexion MongoDB:', err.message));

app.use('/api/auth', authRoutes);
app.use('/api/films', filmRoutes);
app.use('/api/salles', salleRoutes);
app.use('/api/seances', seanceRoutes);
app.use('/api/reservations', reservationRoutes);

app.get('/', (req, res) => {
    res.send('Bienvenue dans le projet de gestion de cinéma');
});

module.exports = app;

if (require.main === module) {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
    });
}
