// import Membership from "../models/Membership";
// import UserMembership from "../models/UserMembership";
// import { body } from "express-validator";
// import { addDays } from "date-fns";
// import { NextFunction, Request, Response } from "express";
// import { RequestAuth } from "../types/request";

// export const addMembershipValidationRules = () => {
//   return [
//     body("name")
//       .exists()
//       .withMessage("name cannot be empty")
//       .isString()
//       .withMessage("name must be a string")
//       .trim()
//       .escape(),

//     body("description")
//       .exists()
//       .withMessage("description cannot be empty")
//       .isString()
//       .withMessage("description must be a string"),

//     body("duration")
//       .exists()
//       .withMessage("duration cannot be empty")
//       .isInt()
//       .withMessage("duration must be an int, day format"),

//     body("price")
//       .exists()
//       .withMessage("price cannot be empty")
//       .isFloat()
//       .withMessage("price must be a number"),

//     body("discountPrice")
//       .optional()
//       .isFloat()
//       .withMessage("discount price cannot be empty"),
//   ];
// };

// export const updateMembershipValidationRules = () => {
//   return [
//     body("name")
//       .optional()
//       .isString()
//       .withMessage("name must be a string")
//       .trim()
//       .escape(),

//     body("description")
//       .optional()
//       .isString()
//       .withMessage("description must be a string"),

//     body("duration")
//       .optional()
//       .isInt()
//       .withMessage("duration must be an int, day format"),

//     body("price").optional().isFloat().withMessage("price must be a number"),

//     body("discountPrice")
//       .optional()
//       .isFloat()
//       .withMessage("discount price cannot be empty"),
//   ];
// };

// // const publishMemberValidationRules = () => {
// //     return [
// //         body('publish')
// //             .exists()
// //             .withMessage('publish cannot be empty')
// //             .isBoolean()
// //             .withMessage('publish must be a boolean'),
// //     ];
// // };

// export const addMembershipHandler = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { name, description, duration, price, discountPrice } = req.body;

//     const membership = new Membership({
//       name,
//       description,
//       duration,
//       price,
//       discountPrice,
//     });

//     await membership.save();

//     return res.status(200).json({
//       success: true,
//       data: {
//         membership,
//       },
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       error,
//     });
//   }
// };

// export const getAllMemberships = async (req: Request, res: Response) => {
//   try {
//     const datas = await Membership.find({ deletedAt: undefined });

//     return res.status(200).json({
//       success: true,
//       data: {
//         memberships: datas,
//       },
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       error,
//     });
//   }
// };

// export const getMembershipById = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { id } = req.params;

//     const membership = await Membership.findOne({
//       _id: id,
//       deletedAt: undefined,
//     });

//     if (!membership) {
//       return res.status(404).json({
//         success: false,
//         message: "Get membership failed, Id not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       data: {
//         membership,
//       },
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       error,
//     });
//   }
// };

// export const publishMembership = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;

//     const data = await Membership.findOne({
//       _id: id,
//       deletedAt: undefined,
//     });

//     if (!data) {
//       return res.status(404).json({
//         success: false,
//         message: "Set publish membership failed, Id not found",
//       });
//     }

//     data.published = !data.published;

//     await data.save();

//     return res.status(200).json({
//       success: true,
//       message: "Chnage published data success",
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       error,
//     });
//   }
// };

// export const deleteMembership = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { id } = req.params;
//     const membership = await Membership.findOne({
//       _id: id,
//       deletedAt: undefined,
//     });

//     if (!membership) {
//       return res.status(404).json({
//         success: false,
//         message: "Delete membership failed, membership not fund",
//       });
//     }

//     membership.deletedAt = new Date();
//     await membership.save();
//     return res.status(204).end();
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       error,
//     });
//   }
// };

// export const updateMembershipHandler = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { id } = req.params;

//     const { name, description, duration, price, discountPrice } = req.body;

//     const membership = await Membership.findOne({
//       _id: id,
//       deletedAt: undefined,
//     });

//     if (!membership) {
//       return res.status(404).json({
//         success: false,
//         message: "Update membership failed, Id not found",
//       });
//     }

//     if (name) membership.name = name;
//     if (description) membership.description = description;
//     if (duration) membership.duration = duration;
//     if (price) membership.price = price;
//     if (discountPrice) membership.discountPrice = discountPrice;

//     await membership.save();

//     return res.status(200).json({
//       success: true,
//       message: "Update membership success",
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       error,
//     });
//   }
// };

// export const registerMembershipValidationRules = () => {
//   return [
//     body("membershipId")
//       .exists()
//       .withMessage("membershipId cannot be empty")
//       .trim(),
//   ];
// };

// export const registerMembership = async (req: Request, res: Response) => {
//   try {
//     const { membershipId } = req.body;
//     const user = (req as RequestAuth).user;
//     const membershipExist = await Membership.findOne({
//       deletedAt: undefined,
//       _id: membershipId,
//       published: true,
//     });

//     if (!membershipExist) {
//       return res.status(400).json({
//         success: false,
//         message: "Register membership failed, membership not found",
//       });
//     }
//     const membershipAlreadyRegistered = await UserMembership.findOne({
//       memberId: user._id,
//       deletedAt: undefined,
//       expiresDate: { $gt: new Date() },
//     }).sort({ registerDate: -1 });

//     console.log(membershipAlreadyRegistered);

//     if (membershipAlreadyRegistered) {
//       return res.status(400).json({
//         success: false,
//         message: "Member already registered in membership",
//       });
//     }

//     const registerDate = new Date();
//     const membershipData = new UserMembership({
//       membershipId,
//       memberId: user._id,
//       registerDate,
//       expiresDate: addDays(registerDate, membershipExist.duration),
//     });
//     await membershipData.save();
//     return res.status(200).json({
//       success: true,
//       message: "Membership has been registered",
//     });
//   } catch (error: any) {
//     if (error)
//       return res.status(500).json({
//         success: false,
//         error: error.message,
//       });
//   }
// };

// export default {
//   addMembershipValidationRules,
//   addMembershipHandler,
//   getAllMemberships,
//   getMembershipById,
//   publishMembership,
//   deleteMembership,
//   updateMembershipHandler,
//   updateMembershipValidationRules,
//   registerMembership,
//   registerMembershipValidationRules,
// };
