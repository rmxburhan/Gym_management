import { body } from "express-validator";
import Joi from "joi";

export const registerValidationRules = [
  body("name")
    .exists()
    .withMessage("name doesn't exist")
    .isString()
    .withMessage("name must be a string")
    .trim()
    .escape(),

  body("email")
    .exists()
    .withMessage("email doesn't exist")
    .isEmail()
    .withMessage("please input valid email")
    .normalizeEmail(),

  body("password")
    .exists()
    .withMessage("password doesn't exist")
    .isString()
    .withMessage("password must be a string")
    .isLength({ min: 6, max: 50 })
    .withMessage("password must be minimum contain 6 characters")
    .trim(),
];

export const addressValidationSchema = Joi.object({
  street: Joi.string().min(5).max(250).required(),
  city: Joi.string().max(250).required(),
  state: Joi.string().max(250).required(),
  zip: Joi.string().min(4).required(),
});
