import { NextFunction, Request, Response, Router, response } from "express";
import authorize from "../middleware/authorization.middleware";
import classService from "../services/class.service";
import {
  validateInputCreateClass,
  validateInputUpdateClass,
} from "../validator/class.validator";
const route = Router();

route.get(
  "/",
  authorize(["admin", "member"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const classes = await classService.getClasses();
      return res.status(200).json({
        message: "Class success retrieved.",
        data: classes,
      });
    } catch (error) {
      next(error);
    }
  }
);

route.get(
  "/:id",
  authorize(["admin", "trainer", "member"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const classdata = await classService.getClass(id);

      if (!classdata) {
        const error = new Error("Get class failed. Id not found");
        error.name = "NotFound";
        throw error;
      }

      return res.status(200).json({
        message: "Get class success",
        data: classdata,
      });
    } catch (error) {
      next(error);
    }
  }
);

route.post(
  "/",
  authorize(["admin"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const input = validateInputCreateClass.validate(req.body);
      if (input.error) {
        throw input.error;
      }
      const { name, description, trainer, date } = req.body;

      const classData = await classService.addClass(
        name,
        description,
        trainer,
        new Date(date)
      );

      if (!classData) {
        throw new Error("Add class failed.");
      }

      return res.status(201).json({
        message: "Add class success.",
      });
    } catch (error) {
      next(error);
    }
  }
);

route.put(
  "/:id",
  authorize(["admin"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const input = validateInputUpdateClass.validate(req.body);
      if (input.error) {
        throw input.error;
      }
      const { name, description, trainer, date } = input.value;

      await classService.updateClass(id, name, description, trainer, date);

      return res.status(200).json({
        message: "Class has been updated",
      });
    } catch (error) {
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

      await classService.deleteClass(id);

      return res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
);

export default route;
