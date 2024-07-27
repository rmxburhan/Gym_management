import { NextFunction, Request, Response, Router } from "express";
import authorize from "../middleware/authorization.middleware";
import { uploadSingle } from "../utils/upload";
import equipmentService from "../services/equipment.service";
import {
  validateInputAddEquipment,
  validateInputAddEquipmentLog,
  validateInputUpdateEquipment,
} from "../validator/equipment.validator";
import path from "path";
import { existsSync, unlinkSync } from "fs";
import { RequestAuth } from "../types/request";
const route = Router();

route.get(
  "/",
  authorize(["admin"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const equipments = await equipmentService.getEquipments();

      return res.status(200).json({
        message: "Equipment success retrieved",
        data: equipments,
      });
    } catch (error) {
      next(error);
    }
  }
);

route.post(
  "/",
  authorize(["admin"]),
  uploadSingle("image"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const input = validateInputAddEquipment.validate(req.body);
      if (input.error) throw input.error;
      const { name, qty } = input.value;

      const equipment = await equipmentService.addEquipment(
        name,
        qty,
        req.file
      );

      if (!equipment) {
        throw new Error("Create equipment failed.");
      }

      return res.status(201).json({
        message: "Add equipment success.",
      });
    } catch (error) {
      if (req.file) {
        const pathToFile = path.join(process.cwd(), req.file.path);
        existsSync(pathToFile) ? unlinkSync(pathToFile) : undefined;
      }
      next(error);
    }
  }
);

route.get(
  "/logs",
  authorize(["admin"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { equipmentId }: { equipmentId?: string; name?: string } =
        req.query;

      const logs = await equipmentService.getLogs({ equipmentId });

      return res.status(200).json({
        message: "Logs data success retrieved",
        data: logs,
      });
    } catch (error) {
      next(error);
    }
  }
);
route.get(
  "/:id",
  authorize(["admin"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const equipment = await equipmentService.getEquipment(id);

      if (!equipment) {
        const error = new Error("Get equipment failed. Id not found");
        error.name = "NotFound";
        throw error;
      }

      return res.status(200).json({
        message: "Equipment success retrieved",
        data: equipment,
      });
    } catch (error) {
      next(error);
    }
  }
);

route.post(
  "/:id",
  authorize(["admin"]),
  uploadSingle("image"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const input = validateInputUpdateEquipment.validate(req.body);
      if (input.error) {
        throw input.error;
      }
      const { name, qty } = input.value;

      const equipment = await equipmentService.updateEquipment(
        id,
        name,
        qty,
        req.file
      );

      if (!equipment) {
        throw new Error("Update equipment failed");
      }

      return res.status(200).json({
        message: "Update equipment success",
      });
    } catch (error) {
      if (req.file) {
        const pathToFile = path.join(process.cwd(), req.file.path);
        existsSync(pathToFile) ? unlinkSync(pathToFile) : undefined;
      }
      next(error);
    }
  }
);

route.delete(
  "/:id",
  authorize(["admin"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const trainer = await equipmentService.deleteEquipment(id);

      if (!trainer) {
        throw new Error("Failed to remove equipment data");
      }

      return res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
);

route.post(
  "/:id/logs",
  authorize(["admin"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const user = (req as RequestAuth).user;
      const input = validateInputAddEquipmentLog.validate(req.body);
      if (input.error) {
        throw input.error;
      }
      const { description, category } = input.value;

      const log = await equipmentService.addLog(
        id,
        user.id,
        category,
        description
      );

      if (!log) {
        throw new Error("Failed to add log");
      }

      return res.status(201).json({
        message: "log has been added",
        data: log,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default route;
