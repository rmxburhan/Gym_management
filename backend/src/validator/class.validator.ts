import Joi from "joi";

export const validateInputCreateClass = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  trainer: Joi.string().required(),
  date: Joi.date().required(),
  maxParticipant: Joi.number().min(1).required(),
});

export const validateInputUpdateClass = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  trainer: Joi.string().optional(),
  maxParticipant: Joi.number().min(1).optional(),
  date: Joi.date().optional(),
});
