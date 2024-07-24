import { Router } from "express";
import {
  getClassHandler,
  getClassesHandler,
  updateClassHandler,
  updateClassValidationRules,
  addClassHandler,
  addClassValidationRules,
  deleteClassHandler,
} from "../controllers/classController";
import validate from "../utils/validationRules";
import authorize from "../middleware/authorizationMiddleware";
const route = Router();

route.get("/", authorize(["admin", "employee", "member"]), getClassesHandler);

route.get("/:id", authorize(["admin", "staff", "member"]), getClassHandler);

route.post(
  "/",
  authorize(["admin"]),
  addClassValidationRules(),
  validate,
  addClassHandler
);

route.put(
  "/:id",
  authorize(["admin"]),
  updateClassValidationRules(),
  validate,
  updateClassHandler
);

route.delete("/:id", authorize(["admin"]), deleteClassHandler);

export default route;
