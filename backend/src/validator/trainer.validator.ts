import Joi from "joi";
import { addressValidationSchema } from "./user.validator";

export const validaAddTrainerInput = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required().trim(),
  password: Joi.string().min(6).max(50).required().trim(),
  addresses: Joi.array()
    .items(addressValidationSchema)
    .min(1)
    .max(2)
    .required(),
  gender: Joi.string().allow(["male", "female"]).required(),
  bank: Joi.string().required(),
  bankNumber: Joi.number().required(),
  identificationNumber: Joi.string().required(),
  phoneNumber: Joi.string().min(6).required(),
});

export const validateUpdateTrainerInput = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional().trim(),
  password: Joi.string().min(6).max(50).optional().trim(),
  addresses: Joi.array()
    .items(addressValidationSchema)
    .min(1)
    .max(2)
    .optional(),
  gender: Joi.string().allow(["male", "female"]).optional(),
  bank: Joi.string().optional(),
  bankNumber: Joi.number().optional(),
  identificationNumber: Joi.string().optional(),
  phoneNumber: Joi.string().min(6).optional(),
});
