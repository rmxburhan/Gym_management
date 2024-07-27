import { NextFunction, Request, Response, Router } from "express";

import authorize from "../middleware/authorization.middleware";
import attendanceService from "../services/attendance.service";
import { RequestAuth } from "../types/request";
import { validatePostCheckIn } from "../validator/attendance.validator";
import authorizememberactive from "../middleware/memberactive.middleware";
const route = Router();

route.get(
  "/",
  authorize(["admin"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const filterQuery: {
        userId?: string;
        dateStart?: string;
        endDate?: string;
        today?: string;
        checkout?: string;
      } = req.query;

      console.log(filterQuery);
      const attendances = await attendanceService.getAttendances(filterQuery);

      return res.status(200).json({
        message: "Attendances Data has been retrieved",
        data: attendances,
      });
    } catch (error) {
      next(error);
    }
  }
);

route.get(
  "/code",
  authorize(["admin"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const code = await attendanceService.getCode();
      if (!code) {
        const error = new Error("Code not found. you can create manually");
        error.name = "NotFound";
        throw error;
      }
      return res.status(200).json({
        message: "Attendance Code succes retirieved",
        code: code.code,
      });
    } catch (error) {
      next(error);
    }
  }
);

route.post(
  "/checkin",
  authorize(["member"]),
  authorizememberactive,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = (req as RequestAuth).user;

      const input = validatePostCheckIn.validate(req.body);
      if (input.error) {
        throw input.error;
      }

      const { code } = input.value;

      const attendance = await attendanceService.postCheckIn(user.id, code);

      if (!attendance) {
        throw new Error("Check in failed");
      }

      return res.status(200).json({
        message: "Checkin success",
      });
    } catch (error) {
      next(error);
    }
  }
);

route.post(
  "/checkout",
  authorize(["member"]),
  authorizememberactive,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = (req as RequestAuth).user;
      const attendance = await attendanceService.postCheckOut(user.id);
      if (!attendance) {
        throw new Error("Checkout failed.");
      }
      return res.status(200).json({
        message: "Checkout success",
      });
    } catch (error) {
      next(error);
    }
  }
);

export default route;
