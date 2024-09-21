const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
require('dotenv').config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connecté...'))
    .catch(err => console.error('Erreur de connexion MongoDB', err));

app.get('/', (req, res) => {
    res.send('Bienvenue dans le projet de gestion de cinéma');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur en cours d'exécution sur le port ${PORT}`));

app.use('/api/auth', authRoutes);
