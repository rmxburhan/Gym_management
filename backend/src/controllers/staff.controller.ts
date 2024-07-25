// import { NextFunction, Request, Response } from "express";
// import StaffAttendance from "../models/StaffAttendance";
// import Schedule from "../models/StaffSchedule";
// import timeToSeconds from "../utils/timeToSeconds";
// import { RequestAuth } from "../types/request";

// export const staffCheckOutHandler = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const getLocaleTime = new Date().toLocaleTimeString();
//     const user = (req as RequestAuth).user;
//     const checkInData = await StaffAttendance.findOne({
//       staffId: user._id,
//       deletedAt: undefined,
//       checkOutTime: undefined,
//     });

//     if (!checkInData) {
//       return res.status(400).json({
//         success: false,
//         message: "Please checkin first",
//       });
//     }

//     const checkOutTime = timeToSeconds(getLocaleTime);
//     checkInData.checkOutTime = checkOutTime;

//     await checkInData.save();

//     return res.status(200).json({
//       success: true,
//       message: "Check out success",
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       error,
//     });
//   }
// };

// export const staffCheckInHandler = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const getLocaltime = new Date().toLocaleTimeString();
//     const {} = req.body;
//     const user = (req as RequestAuth).user;

//     const alreadyCheckIn = await StaffAttendance.findOne({
//       staffId: user._id,
//       deletedAt: undefined,
//       checkOutTime: undefined,
//     });

//     if (alreadyCheckIn) {
//       return res.status(400).json({
//         success: false,
//         message: "You are already checkin",
//       });
//     }

//     const schedule = await Schedule.findOne({
//       staffId: user._id,
//       deletedAt: undefined,
//     });

//     if (!schedule) {
//       return res.status(404).json({
//         success: false,
//         message: "Failed to checkIn. Staff doesn't have schedule",
//       });
//     }

//     const day = Number.parseInt(new Date().getDay().toLocaleString());

//     if (!schedule.day.includes(day)) {
//       return res.status(400).json({
//         success: false,
//         message: "You does not have schedule today. enjoy your day off",
//       });
//     }

//     const checkInTime = timeToSeconds(getLocaltime);
//     const lateTime = schedule.timeStart - checkInTime;

//     const staffAttendance = new StaffAttendance({
//       staffId: user._id,
//       checkInTime: checkInTime,
//     });

//     if (lateTime < 0) staffAttendance.lateTime = lateTime;

//     await staffAttendance.save();

//     return res.status(200).json({
//       success: false,
//       message: "Staff check in success",
//     });
//   } catch (error) {
//     return res.status(500).json({
//       succes: false,
//       error,
//     });
//   }
// };

// export default {
//   staffCheckInHandler,
//   staffCheckOutHandler,
// };
