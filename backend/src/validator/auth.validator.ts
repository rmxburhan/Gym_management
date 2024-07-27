import Joi from "joi";

export const validateLoginInput = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(50).trim().required(),
});
