// import profileRoute from "./profileRoute";
// import attendanceRoute from "./attendanceIndex";
// import classRoute from "./classRouteIndex";
// import employeeRoute from "./employeeIndex";
// import authorize from "../middleware/authorizationMiddleware";
// import membershipRoute from "./membershipIndex";
// import membersRoute from "./membersIndex";
// import equipmentRoute from "./equipmentIndex";
import { Express } from "express";
import authRoute from "./auth.routes";
import userRoute from "./user.routes";
import trainerRoute from "./trainer.routes";
import notFoundHandler from "../middleware/notFoundHandler";
import seed from "../seed/seed";
import errorhandlersMiddleware from "../middleware/errorhandlers.middleware";

export default (app: Express) => {
  app.use("/api/auth", authRoute);
  app.use("/api/user", userRoute);
  app.use("/api/trainers", trainerRoute);
  app.get("/seed", seed);
  app.use(errorhandlersMiddleware);
  app.use(notFoundHandler);
  // app.use("/api/attendances", attendanceRoute);
  // app.use("/api/classes", classRoute);
  // app.use("/api/memberships", membershipRoute);
  // app.use("/api/members", membersRoute);
  // app.use("/api/employees", authorize(["admin"]), employeeRoute);
  // app.use("/api/profile", profileRoute);
  // app.use("/api/equipments", equipmentRoute);
};
