import type { NextFunction, Request, Response } from "express";
import errorhandlersMiddleware from "./errorhandlers.middleware";
import type { RequestAuth } from "../types/request";

const authorizememberactive = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const user = (req as RequestAuth).user;
		if (user.role === "member") {
			if (!user.memberDetail) {
				return res.status(422).json({
					message: "Please fill your personal information first",
					type: "memberdetail",
				});
			} else if (!user.memberDetail.membership) {
				return res.status(422).json({
					message: "You are not have membership registered",
					type: "membership_not_found",
				});
			} else if (user.memberDetail.membership.status == false) {
				return res.status(200).json({
					message: "Your membership has expired",
					type: "membership_expired",
				});
			}
		}
		next();
	} catch (error: any) {
		errorhandlersMiddleware(error, req, res, next);
	}
};

export default authorizememberactive;
