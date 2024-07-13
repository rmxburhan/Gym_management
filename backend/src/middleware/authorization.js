const adminAuthorize = (req, res, next) => {
    if (req.user.role != 'admin') {
        return res.status(403).json({
            success: false,
            message: 'Forbidden',
        });
    }
    next();
};

const memberAuthorize = (req, res, next) => {
    if (req.user.role != 'member') {
        return res.status(403).json({
            success: false,
            message: 'Forbidden',
        });
    }

    next();
};

const trainerAuthorize = (req, res, next) => {
    if (req.user.role == 'employee') {
        user.populate('employeeDetail');
        console.log(req.user);
        if (req.user.employeeDetail == 'trainer') {
            return next();
        }
    }
    return res.status(403).json({
        success: false,
        message: 'Forbidden',
    });
};

const staffAuthorize = (req, res, next) => {
    if (req.user.role == 'employee') {
        user.populate('employeeDetail');
        console.log(req.user);
        if (req.user.employeeDetail == 'staff') {
            return next();
        }
    }
    return res.status(403).json({
        success: false,
        message: 'Forbidden',
    });
};

module.exports = {
    adminAuthorize,
    staffAuthorize,
    memberAuthorize,
    trainerAuthorize,
};
