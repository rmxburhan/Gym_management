import { Express } from "express";
import authRoute from "./authIndex";
import profileRoute from "./profileRoute";
import attendanceRoute from "./attendanceIndex";
import classRoute from "./classRouteIndex";
import employeeRoute from "./employeeIndex";
import authorize from "../middleware/authorizationMiddleware";
import membershipRoute from "./membershipIndex";
import membersRoute from "./membersIndex";
import equipmentRoute from "./equipmentIndex";
import notFoundHandler from "../middleware/notFoundHandler";

export default (app: Express) => {
  app.use("/api/auth", authRoute);
  app.use("/api/attendances", attendanceRoute);
  app.use("/api/classes", classRoute);
  app.use("/api/memberships", membershipRoute);
  app.use("/api/members", membersRoute);
  app.use("/api/employees", authorize(["admin"]), employeeRoute);
  app.use("/api/profile", profileRoute);
  app.use("/api/equipments", equipmentRoute);
  app.use(notFoundHandler);
};
