// emailConfig.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Prend la valeur de l'environnement
    pass: process.env.EMAIL_PASS  // Prend la valeur de l'environnement
  },
});

module.exports = transporter;
