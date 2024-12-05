const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send('Token is required');

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res .status(403).send('Invalid token');
        req.user = user;
        next();
    });
};