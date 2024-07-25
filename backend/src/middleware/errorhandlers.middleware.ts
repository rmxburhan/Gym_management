import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export default (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error) {
    if (Joi.isError(error)) {
      return res.status(400).json({
        errors: error.details,
      });
    } else {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
};
