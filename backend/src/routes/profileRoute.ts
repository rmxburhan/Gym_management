import { Router } from "express";
import {
  getMyProfile,
  updateProfileImage,
  updateProfileRules,
  getProfileImage,
  updateMyProfile,
} from "../controllers/profileController";
import { getMyAttendencesHistory } from "../controllers/attendanceController";
import validate from "../utils/validationRules";
import { uploadSingle } from "../utils/upload";
import authorize from "../middleware/authorizationMiddleware";

const route = Router();

route.get("/", authorize(["admin", "member", "employee"]), getMyProfile);
route.put(
  "/",
  authorize(["admin", "member", "employee"]),
  updateProfileRules(),
  validate,
  updateMyProfile
);
// route.post('/detail', updateMyDetail);
route.get(
  "/image",
  authorize(["admin", "member", "employee"]),
  getProfileImage
);
route.post(
  "/image",
  authorize(["admin", "member", "employee"]),
  uploadSingle("profilePicture"),
  updateProfileImage
);
route.get("/attendances", authorize(["member"]), getMyAttendencesHistory);

export default route;
