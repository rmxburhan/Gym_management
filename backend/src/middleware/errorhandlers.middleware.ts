import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { getSystemErrorMap } from "util";

export default (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error) {
    if (Joi.isError(error)) {
      return res.status(400).json({
        errors: error.details[0].message,
      });
    } else if (error.name === "NotFound") {
      return res.status(404).json({
        errors: error.message,
      });
    } else if (error.name === "BadRequest") {
      return res.status(400).json({
        errors: error.message,
      });
    } else if (error.name === "Unauthorize") {
      return res.status(401).json({
        errors: error.message,
      });
    } else if (error.name === "Forbidden") {
      return res.status(403).json({
        errors: error.message,
      });
    } else {
      return res.status(500).json({
        errors: error.message,
      });
    }
  }
};
