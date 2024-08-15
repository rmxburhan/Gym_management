import { NextFunction, Request, Response, Router } from "express";
import authorize from "../middleware/authorization.middleware";
import settingsService from "../services/settings.service";
import { validateInputPatchSettings } from "../validator/setting.validator";
import { uploadSingle } from "../utils/upload";
import { existsSync, unlink, unlinkSync } from "fs";
import path from "path";

const router = Router();

router.get(
  "/",
  authorize(["admin"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const datas = await settingsService.getSettings();
      return res.status(200).json({
        message: "Get setting success",
        data: datas,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/",
  authorize(["admin"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error, value } = validateInputPatchSettings.validate(req.body);
      if (error) throw error;
      const { app_name, lat, lng, timezone } = value.update;
      const data = await settingsService.updateSettings(
        app_name,
        lat,
        lng,
        timezone
      );
      return res.status(200).json({
        message: "Setting updated",
        data,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/image",
  authorize(["admin"]),
  uploadSingle("image"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.file) {
        const error = new Error("Image is required");
        error.name = "BadRequest";
        throw error;
      }

      const data = await settingsService.updateLogo(req.file);

      return res.status(200).json({
        message: "Update logo success",
        data,
      });
    } catch (error) {
      if (req.file) {
        const filepath = path.join(
          process.cwd(),
          req.file.path.split("/public")[0]
        );
        existsSync(filepath) ? unlinkSync(filepath) : undefined;
      }
      next(error);
    }
  }
);

export default router;
