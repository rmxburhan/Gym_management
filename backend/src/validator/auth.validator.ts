import { body } from "express-validator";

export const loginValidationRules = [
  body("email")
    .exists()
    .withMessage("email cannot be empty")
    .isString()
    .withMessage("email must be a string")
    .isEmail()
    .withMessage("email is invalid")
    .normalizeEmail(),
  body("password")
    .exists()
    .withMessage("password cannot be empty")
    .isString()
    .withMessage("password must be a string")
    .isLength({ min: 6, max: 50 })
    .withMessage("password minimal must contain 6 characters")
    .trim(),
];
