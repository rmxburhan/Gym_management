import { Express } from "express";
import authRoute from "./auth.routes";
import userRoute from "./user.routes";
import trainerRoute from "./trainer.routes";
import membershipRoute from "./membership.routes";
import attendanceRoute from "./attendance.routes";
import classRoute from "./class.routes";
import memberRoute from "./member.routes";
import equipmentRoute from "./equipment.routes";
import transactionRoute from "./transactions.routes";
import settingRoute from "./setting.routes";
import notFoundHandler from "../middleware/notFound.middleware";
import errorhandlersMiddleware from "../middleware/errorhandlers.middleware";

export default (app: Express) => {
  app.use("/api/auth", authRoute);
  app.use("/api/user", userRoute);
  app.use("/api/trainers", trainerRoute);
  app.use("/api/memberships", membershipRoute);
  app.use("/api/attendances", attendanceRoute);
  app.use("/api/classes", classRoute);
  app.use("/api/members", memberRoute);
  app.use("/api/equipments", equipmentRoute);
  app.use("/api/transactions", transactionRoute);
  app.use("/api/settings", settingRoute);
  app.use(errorhandlersMiddleware);
  app.use(notFoundHandler);
};
