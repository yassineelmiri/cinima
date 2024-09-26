const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Inscription
exports.register = async (req, res) => {
    const { nom, email, motDePasse, image, numeroTelephone, adresse, role } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'Utilisateur déjà existant' });

        user = new User({ 
            nom, 
            email, 
            motDePasse, 
            image, 
            numeroTelephone, 
            adresse, 
            role 
        });

        await user.save();
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error('Erreur lors de l\'inscription:', error);
        res.status(500).json({ message: 'Erreur du serveur', error: error.message });
    }
};

// Connexion
exports.login = async (req, res) => {
    const { email, motDePasse } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Utilisateur non trouvé' });

        const isMatch = await user.comparePassword(motDePasse);
        if (!isMatch) return res.status(400).json({ message: 'Mot de passe incorrect' });

        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        res.status(500).json({ message: 'Erreur du serveur', error: error.message });
    }
};

// Déconnexion
exports.logout = (req, res) => {
    res.status(200).json({ message: 'Déconnexion réussie' });
};

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Utilisateur non trouvé' });

        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiry = Date.now() + 3600000;

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiry = resetTokenExpiry;
        await user.save();

        const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Réinitialisation de votre mot de passe',
            html: `<p>Vous avez demandé une réinitialisation de mot de passe. Cliquez sur le lien ci-dessous pour en choisir un nouveau :</p><a href="${resetLink}">${resetLink}</a>`
        });

        res.json({ message: 'Email de réinitialisation envoyé' });
    } catch (error) {
        console.error('Erreur lors de la demande de réinitialisation de mot de passe:', error);
        res.status(500).json({ message: 'Erreur du serveur', error: error.message });
    }
};

// Réinitialiser le mot de passe
exports.resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiry: { $gt: Date.now() }
        });
        if (!user) return res.status(400).json({ message: 'Jeton invalide ou expiré' });

        // Mettre à jour le mot de passe
        user.motDePasse = newPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiry = undefined;

        // Hasher le nouveau mot de passe
        user.markModified('motDePasse');
        await user.save();

        res.json({ message: 'Mot de passe réinitialisé avec succès' });
    } catch (error) {
        console.error('Erreur lors de la réinitialisation du mot de passe:', error);
        res.status(500).json({ message: 'Erreur du serveur', error: error.message });
    }
};
