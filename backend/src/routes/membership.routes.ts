import { NextFunction, Request, Response, Router } from "express";
import authorize from "../middleware/authorization.middleware";
import membershipService from "../services/membership.service";
import {
  validateCreateMembershipInput,
  validateUpdateMembershipInput,
} from "../validator/membership.validator";
import { error } from "console";
const route = Router();

route.get(
  "/",
  authorize(["admin"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const datas = await membershipService.getMemberships();
      return res.status(200).json({
        message: "Membership data success retrieved",
        data: datas,
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
      const input = validateCreateMembershipInput.validate(req.body);
      if (input.error) {
        throw input.error;
      }
      const { name, description, duration, price, discountPrice } = input.value;
      const membership = await membershipService.addMembership(
        name,
        description,
        duration,
        price,
        discountPrice
      );
      if (!membership) {
        throw new Error("Add membership failed");
      }
      return res.status(201).json({
        message: "Add membership success",
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
      const membership = await membershipService.getMembershipById(id);

      if (!membership) {
        const error = new Error("Get membership failed. Id not found");
        error.name = "NotFound";
        throw error;
      }
      return res.status(200).json({
        message: "Membership data success retrieved",
        data: membership,
      });
    } catch (error) {
      next(error);
    }
  }
);

route.patch(
  "/:id/publish",
  authorize(["admin"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const membership = await membershipService.patchPublishStatus(id);
      return res.status(200).json({
        message: "Membership status has been updated.",
        data: membership,
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
      const input = validateUpdateMembershipInput.validate(req.body);
      if (input.error) {
        throw error;
      }
      const { name, description, duration, price, discountPrice } = input.value;

      const membership = await membershipService.updateMembership(
        id,
        name,
        description,
        duration,
        price,
        discountPrice
      );

      return res.status(200).json({
        message: "Update membership success",
        data: membership,
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
      await membershipService.deleteMembership(id);
      return res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
);

// route.post(
//   "/register",
//   authorize(["member"]),
//   registerMembershipValidationRules(),
//   validate,
//   registerMembership
// );

export default route;
