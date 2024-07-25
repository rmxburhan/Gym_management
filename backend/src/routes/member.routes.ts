import { NextFunction, Request, Response, Router } from "express";
import authorize from "../middleware/authorization.middleware";
import memberService from "../services/member.service";
import {
  validateInputAddMember,
  validateInputUpdateMember,
} from "../validator/member.validator";
import path from "path";
import { existsSync, unlinkSync } from "fs";

const route = Router();

route.get(
  "/",
  authorize(["admin"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        name,
        active,
        gender,
      }: { name?: string; active?: string; gender?: string } = req.query;

      const members = await memberService.getMembers({ name, gender, active });

      return res.status(200).json({
        message: "Members data success retrieved.",
        data: members,
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
      var input = validateInputAddMember.validate(req.body);
      if (input.error) {
        throw input.error;
      }

      const {
        name,
        email,
        password,
        addresses,
        birthDate,
        phoneNumber,
        gender,
      } = input.value;

      const member = await memberService.addMember(
        name,
        password,
        email,
        addresses,
        birthDate,
        gender,
        phoneNumber,
        req.file
      );
      if (!member) {
        throw new Error("Add member failed");
      }

      return res.status(201).json({
        message: "Member has been added",
        data: member,
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
  "/:id",
  authorize(["admin"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const member = await memberService.getMember(id);
      if (!member) {
        const error = new Error("Get member failed. Id not found");
        error.name = "NotFound";
        throw error;
      }

      return res.status(200).json({
        message: "Member data success retrieved",
        data: member,
      });
    } catch (error) {
      next(error);
    }
  }
);

route.post(
  "/:id",
  authorize(["admin"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const input = validateInputUpdateMember.validate(req.body);
      if (input.error) {
        throw input.error;
      }
      const {
        name,
        email,
        password,
        addresses,
        birthDate,
        gender,
        phoneNumber,
      } = input.value;

      const member = await memberService.updateMember(
        id,
        name,
        password,
        email,
        addresses,
        birthDate,
        gender,
        phoneNumber,
        req.file
      );

      if (!member) {
        throw new Error("Update member failed");
      }

      return res.status(200).json({
        message: "Update member success",
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
      await memberService.deleteMember(id);
      return res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
);

export default route;
