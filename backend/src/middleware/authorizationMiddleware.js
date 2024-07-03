const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authorize = async (req, res, next) => {
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

        const user = await User.findOne({ _id: decoded._id });
        if (!user) {
            return res.status(401).json({
                message: 'Unauthorized',
            });
        }

        req.user = user;

        next();
    } catch (error) {
        return res.status(400).json({
            message: 'Token is invalid',
        });
    }
};

module.exports = authorize;
