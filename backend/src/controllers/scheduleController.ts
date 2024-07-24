// import Schedule from "../models/StaffSchedule";
// import User from "../models/User";
// import { body } from "express-validator";
// import timeToSeconds from "../utils/timeToSeconds";
// import timeToSecond from "../utils/timeToSeconds";
// import { NextFunction, Request, Response } from "express";

// export const addScheduleValidationRules = () => {
//   return [
//     body("staffId").exists().withMessage("staffId cannot be empty"),

//     body("timeStart")
//       .exists()
//       .withMessage("timeStart cannot be empty")
//       .isTime({ mode: "default", hourFormat: "hour24" })
//       .withMessage("timeStart is not valid time format"),

//     body("timeEnd")
//       .exists()
//       .withMessage("timeEnd cannot be empty")
//       .isTime({ mode: "default", hourFormat: "hour24" })
//       .withMessage("timeEnd is not valid time format"),

//     body("day")
//       .exists()
//       .withMessage("day must be a string")
//       .isArray()
//       .withMessage("day must be an integer string"),
//   ];
// };

// export const updateScheduleValidationRules = () => {
//   return [
//     body("staffId").exists().withMessage("staffId cannot be empty"),

//     body("timeStart")
//       .exists()
//       .withMessage("timeStart cannot be empty")
//       .isTime({ mode: "default", hourFormat: "hour24" })
//       .withMessage("timeStart is not valid time format"),

//     body("timeEnd")
//       .exists()
//       .withMessage("timeEnd cannot be empty")
//       .isTime({ mode: "default", hourFormat: "hour24" })
//       .withMessage("timeEnd is not valid time format"),

//     body("day")
//       .exists()
//       .withMessage("day must be a string")
//       .isArray()
//       .withMessage("day must be an integer string"),
//   ];
// };

// export const addSchedule = async (req: Request, res: Response) => {
//   try {
//     const {
//       staffId,
//       timeStart,
//       timeEnd,
//       day,
//     }: { staffId: string; timeStart: string; timeEnd: string; day: number } =
//       req.body;

//     const staff = await User.findOne({
//       _id: staffId,
//       deletedAt: undefined,
//     });

//     if (!staff) {
//       return res.status(404).json({
//         success: false,
//         message: "Add schedule failed, Id not found",
//       });
//     }

//     const schedule = new Schedule({
//       staffId,
//       timeStart: timeToSeconds(timeStart),
//       timeEnd: timeToSeconds(timeEnd),
//       day,
//     });

//     await schedule.save();

//     return res.status(200).json({
//       success: true,
//       message: "Add schedule success",
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       error,
//     });
//   }
// };

// export const updateSchedule = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { timeStart, timeEnd, day } = req.body;
//     const { id } = req.params;
//     const staff = await Schedule.findOne({ _id: id, deletedAt: undefined });

//     if (!staff) {
//       return res.status(404).json({
//         success: false,
//         message: "Update schedule failed. Id not found",
//       });
//     }

//     if (timeStart) staff.timeStart = timeToSeconds(timeStart);
//     if (timeEnd) staff.timeEnd = timeToSeconds(timeEnd);
//     if (day) staff.day = day;

//     await staff.save();

//     if (timeStart)
//       return res.status(200).json({
//         success: true,
//         message: "Update schedule success",
//       });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       error,
//     });
//   }
// };

// export default {
//   addScheduleValidationRules,
//   addSchedule,
//   updateScheduleValidationRules,
//   updateSchedule,
// };
