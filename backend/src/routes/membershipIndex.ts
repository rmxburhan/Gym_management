import { Router } from "express";
import {
  addMembershipHandler,
  getMembershipById,
  getAllMemberships,
  addMembershipValidationRules,
  publishMembership,
  deleteMembership,
  updateMembershipValidationRules,
  updateMembershipHandler,
  registerMembership,
  registerMembershipValidationRules,
} from "../controllers/membershipController";
import validate from "../utils/validationRules";
import authorize from "../middleware/authorizationMiddleware";
const route = Router();

route.get("/", authorize(["admin"]), getAllMemberships);

route.post(
  "/",
  authorize(["admin"]),
  addMembershipValidationRules(),
  validate,
  addMembershipHandler
);

route.post("/publish/:id", authorize(["admin"]), publishMembership);

route.get("/:id", authorize(["admin"]), getMembershipById);

route.put(
  "/:id",
  authorize(["admin"]),
  updateMembershipValidationRules(),
  validate,
  updateMembershipHandler
);

route.delete("/:id", authorize(["admin"]), deleteMembership);

// for member

route.post(
  "/register",
  authorize(["member"]),
  registerMembershipValidationRules(),
  validate,
  registerMembership
);

export default route;
