import { NextFunction, Request, Response, Router } from "express";
import authorize from "../middleware/authorization.middleware";
import membershipService from "../services/membership.service";
import {
  validateCreateMembershipInput,
  validateInputRegisterMembership,
  validateUpdateMembershipInput,
} from "../validator/membership.validator";
import { error } from "console";
import { RequestAuth } from "../types/request";
const route = Router();

route.get(
  "/",
  authorize(["admin", "member"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = (req as RequestAuth).user;
      const datas = await membershipService.getMemberships(
        user.role === "member"
      );
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

route.post(
  "/register",
  authorize(["member"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = (req as RequestAuth).user;
      const { error, value } = validateInputRegisterMembership.validate(
        req.body
      );
      if (error) {
        throw error;
      }
      const { membershipId, paymentType } = value;
      if (!user.memberDetail) {
        const error = new Error("Please fill your detail information first.");
        error.name = "Unprocessable";
        throw error;
      }

      if (
        user.memberDetail.membership &&
        user.memberDetail.membership.status == true
      ) {
        const error = new Error("You have membership active");
        error.name = "BadRequest";
        throw error;
      }

      const transaction = await membershipService.registerMembership(
        user,
        membershipId,
        paymentType
      );

      if (!transaction) {
        const error = new Error("Create transaction failed");
        error.name = "BadRequest";
        throw error;
      }

      return res.status(200).json({
        message: "Please pay your bill within 1 days",
        data: transaction,
      });
    } catch (error) {
      next(error);
    }
  }
);

route.get(
  "/:id",
  authorize(["admin", "member"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = (req as RequestAuth).user;
      const { id } = req.params;
      const membership = await membershipService.getMembershipById(
        id,
        user.role === "member"
      );

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

export default route;
