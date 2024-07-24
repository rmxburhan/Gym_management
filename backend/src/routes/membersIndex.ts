import { Router } from "express";
import {
  addMember,
  addMemberValidationRules,
  getMember,
  deleteMember,
  updateMember,
  updateMemberValidationRules,
  getMembers,
} from "../controllers/memberController";
import authorize from "../middleware/authorizationMiddleware";
import validate from "../utils/validationRules";

const route = Router();

route.get("/", authorize(["admin"]), getMembers);
route.post(
  "/",
  authorize(["admin"]),
  addMemberValidationRules(),
  validate,
  addMember
);
route.get("/:id", authorize(["admin"]), getMember);
route.put(
  "/:id",
  authorize(["admin"]),
  updateMemberValidationRules(),
  validate,
  updateMember
);
route.delete("/:id", authorize(["admin"]), deleteMember);

export default route;
