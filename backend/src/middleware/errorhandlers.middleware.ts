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
    let code = 0;
    let message = error.message;

    if (Joi.isError(error)) {
      code = 400;
    } else if (error.name === "NotFound") {
      code = 404;
    } else if (error.name === "BadRequest") {
      code = 402;
    } else if (error.name === "Unauthorize") {
      code = 401;
    } else if (error.name === "Forbidden") {
      code = 403;
    } else {
      code = 500;
    }

    return res.status(code).json({
      errors: message,
    });
  }
};
