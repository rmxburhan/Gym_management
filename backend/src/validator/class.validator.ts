import Joi from "joi";

export const validateInputCreateClass = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  trainer: Joi.string().required(),
  date: Joi.date().required(),
});

export const validateInputUpdateClass = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  trainer: Joi.string().optional(),
  date: Joi.date().optional(),
});
