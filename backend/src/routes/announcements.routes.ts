import { NextFunction, Request, Response, Router } from "express";
import authorize from "../middleware/authorization.middleware";
import announcementService from "../services/announcement.service";
import { uploadMultiple } from "../utils/upload";
import {
  validateInputPostAnnouncement,
  validateInputUpdateAnnouncement,
} from "../validator/announcement.validator";
import { existsSync, unlinkSync } from "fs";
import path from "path";

const router = Router();

router.get(
  "/",
  authorize(["admin", "member", "trainer"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const datas = await announcementService.getAnnouncements();
      return res.status(200).json({
        message: "Announcements success retrieved",
        data: datas,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  uploadMultiple("images"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error, value } = validateInputPostAnnouncement.validate(req.body);
      if (error) throw error;
      const { title } = value;

      var files: Express.Multer.File[] | undefined = undefined;
      if (req.files) {
        if (Array.isArray(files)) {
          files = req.files as any;
        } else {
          files = (req.files as any)["images"];
        }
      }

      const data = await announcementService.postAnnouncement(title, files);

      return res.status(201).json({
        message: "Announcement created.",
        data,
      });
    } catch (error) {
      if (req.files) {
        if (Array.isArray(files)) {
          for (const file of files as Express.Multer.File[]) {
            const filePath = path.join(
              process.cwd(),
              file.path.split("/public")[1]
            );
            existsSync(filePath) ? unlinkSync(filePath) : undefined;
          }
        } else {
          const files: Express.Multer.File[] = (req.files as any)["images"];
          for (const file of files) {
            const filePath = path.join(
              process.cwd(),
              file.path.split("/public")[1]
            );
            existsSync(filePath) ? unlinkSync(filePath) : undefined;
          }
        }
      }
      next(error);
    }
  }
);

router.get(
  "/:id",
  authorize(["admin", "member", "trainer"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const data = await announcementService.getAnnouncement(id);
      return res.status(200).json({
        message: "Announcement retrieved",
        data,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/:id",
  authorize(["admin"]),
  uploadMultiple("images"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { error, value } = validateInputUpdateAnnouncement.validate(
        req.body
      );
      if (error) throw error;
      const { title } = value;

      var files: Express.Multer.File[] | undefined = undefined;
      if (req.files) {
        if (Array.isArray(files)) {
          files = req.files as any;
        } else {
          files = (req.files as any)["images"];
        }
      }

      const data = await announcementService.updateAnnouncement(
        id,
        title,
        files
      );
    } catch (error) {
      if (req.files) {
        if (Array.isArray(files)) {
          for (const file of files as Express.Multer.File[]) {
            const filePath = path.join(
              process.cwd(),
              file.path.split("/public")[1]
            );
            existsSync(filePath) ? unlinkSync(filePath) : undefined;
          }
        } else {
          const files: Express.Multer.File[] = (req.files as any)["images"];
          for (const file of files) {
            const filePath = path.join(
              process.cwd(),
              file.path.split("/public")[1]
            );
            existsSync(filePath) ? unlinkSync(filePath) : undefined;
          }
        }
      }
      next(error);
    }
  }
);

router.delete(
  "/:id",
  authorize(["admin"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const deleted = await announcementService.deleteAnnouncement(id);

      if (!deleted) {
        throw new Error("Delete announcement failed.");
      }

      return res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
);

export default router;
