import { NextFunction, Request, Response } from "express";
import authorize from "../middleware/authorization.middleware";
import attendanceService from "../services/attendance.service";
import { RequestAuth } from "../types/request";
import { route } from "./attendance.routes";

route.post(
  "/check_in",
  authorize(["member"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = (req as RequestAuth).user;
      await attendanceService.checkIn(user.id);
    } catch (error) {
      next(error);
    }
  }
);
