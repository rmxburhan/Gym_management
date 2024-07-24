import { Router } from "express";

import {
  visitValidationRules,
  getAttendances,
  checkInHandler,
  getCheckInCode,
  checkOutHandler,
} from "../controllers/attendanceController";
import validate from "../utils/validationRules";
import authorize from "../middleware/authorizationMiddleware";

const route = Router();

route.get("/", authorize(["admin"]), getAttendances);

route.get("/code", authorize(["admin"]), getCheckInCode);

route.post(
  "/check_in",
  authorize(["member"]),
  visitValidationRules(),
  validate,
  checkInHandler
);
route.post("/check_out", authorize(["member"]), checkOutHandler);

export default route;
