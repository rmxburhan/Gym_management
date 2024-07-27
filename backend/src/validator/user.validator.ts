import Joi from "joi";

export const validateRegisterInput = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(50).required(),
});

export const addressValidationSchema = Joi.object({
  street: Joi.string().min(5).max(250).required(),
  city: Joi.string().max(250).required(),
  state: Joi.string().max(250).required(),
  zip: Joi.string().min(4).required(),
});

export const validateInputFillData = Joi.object({
  birthDate: Joi.date().required(),
  gender: Joi.string().required(),
  addresses: Joi.array().min(1).items(addressValidationSchema).required(),
  phoneNumber: Joi.string().required(),
});
