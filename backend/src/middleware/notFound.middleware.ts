import { Request, Response } from "express";

export default (req: Request, res: Response) => {
  res.status(404).json({
    code: 404,
    status: "Not Found",
    message: `Not found`,
  });
};
