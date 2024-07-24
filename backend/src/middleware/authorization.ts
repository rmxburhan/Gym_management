// import { NextFunction, Request, Response } from "express";
// import { RequestAuth } from "../types/request";

// const adminAuthorize = (req: Request, res: Response, next: NextFunction) => {
//   if ((req as RequestAuth).user.role != "admin") {
//     return res.status(403).json({
//       success: false,
//       message: "Forbidden",
//     });
//   }
//   next();
// };

// const memberAuthorize = (req: Request, res: Response, next: NextFunction) => {
//   if ((req as RequestAuth).user.role != "member") {
//     return res.status(403).json({
//       success: false,
//       message: "Forbidden",
//     });
//   }

//   next();
// };

// const trainerAuthorize = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   if ((req as RequestAuth).user.role == "employee") {
//     (req as RequestAuth).user = await User.populate("employeeDetail");
//     console.log((req as RequestAuth).user);
//     if ((req as RequestAuth).user.employeeDetail == "trainer") {
//       return next();
//     }
//   }
//   return res.status(403).json({
//     success: false,
//     message: "Forbidden",
//   });
// };

// const staffAuthorize = (req, res, next) => {
//   if (req.user.role == "employee") {
//     user.populate("employeeDetail");
//     console.log(req.user);
//     if (req.user.employeeDetail == "staff") {
//       return next();
//     }
//   }
//   return res.status(403).json({
//     success: false,
//     message: "Forbidden",
//   });
// };

// module.exports = {
//   adminAuthorize,
//   staffAuthorize,
//   memberAuthorize,
//   trainerAuthorize,
// };
