const jwt = require('jsonwebtoken');
const { db } = require('../config/db');

const authenticateJWT = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access token is missing' });

    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid or expired token' });

        const [users] = await db.query('SELECT * FROM students WHERE id = ?', [user.id]);
        req.user = users[0];
        next();
    });
};

const authorizeAdmin = (req, res, next) => {
    if (req.user.role !== 'teacher') return res.status(403).json({ message: 'Access denied' });
    next();
};

module.exports = { authenticateJWT, authorizeAdmin };
