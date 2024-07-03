const jwt = require('jsonwebtoken');

const authorize = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ');
     
        if (token[0] !== 'Bearer') {
            return res.status().json({
                message: 'Token invalid',
            });
        }

        const decoded = jwt.verify(token[1], process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({
                message: 'Token invalid',
            });
        }

        req.user = decoded;

        next();
    } catch (error) {
        return res.status(400).json({
            message: 'Token is invalid',
        });
    }
};

module.exports = authorize;