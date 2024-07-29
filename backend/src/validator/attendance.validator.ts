import Joi from 'joi';

export const validatePostCheckIn = Joi.object({
    code: Joi.string().required(),
});

export const validateFilterAttendancesStats = Joi.object({
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
});
