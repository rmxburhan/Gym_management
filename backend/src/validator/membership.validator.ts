import Joi from "joi";

export const validateCreateMembershipInput = Joi.object({
  name: Joi.string().min(4).required(),
  description: Joi.string().min(4).max(4096).required(),
  price: Joi.number().required(),
  duration: Joi.number().min(7).required(),
  discountPrice: Joi.number().optional(),
});

export const validateUpdateMembershipInput = Joi.object({
  name: Joi.string().min(4).optional(),
  description: Joi.string().min(4).max(4096).optional(),
  price: Joi.number().optional(),
  duration: Joi.number().min(7).optional(),
  discountPrice: Joi.number().optional(),
  published: Joi.boolean().optional(),
});
