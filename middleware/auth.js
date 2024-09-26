const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
        return res.status(401).json({ message: 'Accès refusé. Pas de token.' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Assure-toi que la structure de `verified` contient `_id`
        next();
    } catch (error) {
        res.status(400).json({ message: 'Token invalide.' });
    }
};
