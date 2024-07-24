import { Router } from "express";
import validate from "../utils/validationRules";
import authorize from "../middleware/authorizationMiddleware";
import {
  getEquipments,
  getEquipment,
  getEquipmentLogs,
  addEquipment,
  addLogEquipment,
  addLogEquipmentValidationRules,
  deleteEquipment,
  updateEquipmentValidationRules,
  updateEquipment,
  getLogs,
} from "../controllers/equipmentController";
import { uploadSingle } from "../utils/upload";
const route = Router();

route.get("/", authorize(["admin"]), getEquipments);
route.post(
  "/",
  authorize(["admin"]),
  uploadSingle("image", true),
  addEquipment
);
route.get("/logs", authorize(["admin"]), getLogs);
route.get("/:id", authorize(["admin"]), getEquipment);
route.put(
  "/:id",
  authorize(["admin"]),
  updateEquipmentValidationRules(),
  validate,
  updateEquipment
);
route.delete("/:id", authorize(["admin"]), deleteEquipment);
route.post(
  "/:id/logs",
  authorize(["admin"]),
  addLogEquipmentValidationRules(),
  validate,
  addLogEquipment
);

route.get("/:id/logs", authorize(["admin"]), getEquipmentLogs);
export default route;
