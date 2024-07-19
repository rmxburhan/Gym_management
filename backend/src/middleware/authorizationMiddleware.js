const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authorize = (roles) => {
    return async (req, res, next) => {
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

            const user = await User.findOne({
                _id: decoded._id,
                deletedAt: undefined,
            });
            if (!user) {
                return res.status(401).json({
                    message: 'Unauthorized',
                });
            }

            req.user = user;

            let allowed = false;
            roles.forEach((element) => {
                console.log(element);
                if (element == user.role) {
                    allowed = true;
                }
            });
            if (!allowed) {
                return res.status(403).json({
                    message: 'Forbidden',
                });
            }
            next();
        } catch (error) {
            return res.status(401).json({
                message: 'Token is invalid',
            });
        }
    };
};

module.exports = authorize;
