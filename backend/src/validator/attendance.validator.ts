import Joi from "joi";

export const validatePostCheckIn = Joi.object({
  code: Joi.string().required(),
});
