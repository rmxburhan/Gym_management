import { NextFunction, Request, Response, Router } from "express";
import authorize from "../middleware/authorization.middleware";
import { RequestAuth } from "../types/request";
import transactionService from "../services/transaction.service";

const route = Router();

route.get(
  "/",
  authorize(["admin", "member"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = (req as RequestAuth).user;
      const transactions =
        user.role === "member"
          ? await transactionService.getTransactions()
          : await transactionService.getTransactionHistory(user.id);
      return res.status(200).json({
        message: "Transactions data success retrieved",
        data: transactions,
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
      const transaction = await transactionService.getTransaction(id, user);

      if (!transaction) {
        const error = new Error("Transaction not found");
        error.name = "NotFound";
        throw error;
      }
      return res.status(200).json({
        message: "Transaction success retrieved",
        data: transaction,
      });
    } catch (error) {
      next(error);
    }
  }
);

route.post(
  "/:id/activate",
  authorize(["admin"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const transaction = await transactionService.acceptPayment(id);

      return res.status(200).json({
        message: "Payment success saved",
        data: transaction,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default route;
