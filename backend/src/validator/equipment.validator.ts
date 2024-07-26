import Joi from "joi";

export const validateInputAddEquipment = Joi.object({
  name: Joi.string().required(),
  qty: Joi.number().required(),
});

export const validateInputUpdateEquipment = Joi.object({
  name: Joi.string().optional(),
  qty: Joi.number().optional(),
});

export const validateInputAddEquipmentLog = Joi.object({
  category: Joi.string().required(),
  description: Joi.string().required(),
});
