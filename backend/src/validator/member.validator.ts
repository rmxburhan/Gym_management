import Joi from "joi";
import { addressValidationSchema } from "./user.validator";

export const validateInputAddMember = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  birthDate: Joi.date().required(),
  gender: Joi.string(),
  addresses: Joi.array().items(addressValidationSchema).required(),
  phoneNumber: Joi.string().required(),
});

export const validateInputUpdateMember = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().optional(),
  password: Joi.string().optional(),
  birthDate: Joi.date().optional(),
  gender: Joi.string(),
  addresses: Joi.array().items(addressValidationSchema).optional(),
  phoneNumber: Joi.string().optional(),
});
