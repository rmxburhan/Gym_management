// import { NextFunction, Request, Response } from "express";
// import Class from "../models/Class";
// import User from "../models/user.model";
// import { ExpressValidator, body } from "express-validator";

// export const addClassValidationRules = () => {
//   return [
//     body("name")
//       .exists()
//       .withMessage("name cannot be empty")
//       .isString()
//       .withMessage("name must be a string"),

//     body("description")
//       .exists()
//       .withMessage("description cannot be empty")
//       .isString()
//       .withMessage("description must be a string"),

//     body("trainerId").exists().withMessage("trainer id cannot be empty"),
//     body("maxParticipant")
//       .exists()
//       .withMessage("max participant cannot be empty")
//       .isInt()
//       .withMessage("max participant must be an int"),

//     body("date")
//       .exists()
//       .withMessage("date cannot be empty")
//       .isDate()
//       .withMessage("input date with a correct format"),
//   ];
// };
// export const updateClassValidationRules = () => {
//   return [
//     body("name").optional().isString().withMessage("name must be a string"),

//     body("description")
//       .optional()
//       .isString()
//       .withMessage("description must be a string"),

//     body("trainerId").optional(),
//     body("maxParticipant")
//       .optional()
//       .isInt()
//       .withMessage("max participant must be an int"),

//     body("date")
//       .optional()
//       .isDate()
//       .withMessage("input date with a correct format"),
//   ];
// };

// export const addClassHandler = async (req: Request, res: Response) => {
//   try {
//     const { name, description, trainerId, maxParticipant, date } = req.body;

//     // TODO : verified if it is treal trainer
//     const trainer = await User.findOne({
//       _id: trainerId,
//       deletedAt: undefined,
//     });

//     if (!trainer) {
//       return res.status(404).json({
//         success: false,
//         message: "Add class failed, Id trainer not found",
//       });
//     }

//     const classData = new Class({
//       name,
//       description,
//       trainerId,
//       maxParticipant,
//       date,
//     });

//     await classData.save();

//     return res.status(200).json({
//       success: true,
//       message: "Class has been added",
//     });
//   } catch (error: any) {
//     return res.status(500).json({
//       succes: false,
//       error: error.message,
//     });
//   }
// };

// export const updateClassHandler = async (req: Request, res: Response) => {
//   try {
//     const { name, description, trainerId, maxParticipant, date } = req.body;
//     const { id } = req.params;
//     const classData = await Class.findOne({
//       _id: id,
//       deletedAt: undefined,
//     });
//     if (!classData) {
//       return res.status(404).json({
//         success: false,
//         message: "Update class failed, Id not found",
//       });
//     }

//     if (name) classData.name = name;
//     if (description) classData.description = description;
//     if (trainerId) {
//       const trainer = await User.findOne({
//         _id: trainerId,
//         deletedAt: undefined,
//       });
//       if (!trainer) {
//         return res.status(404).json({
//           success: false,
//           message: "Update class failed. Trainer id not found",
//         });
//       }

//       classData.trainerId = trainerId;
//     }

//     if (maxParticipant) classData.maxParticipant = maxParticipant;
//     if (date) classData.date = date;

//     await classData.save();

//     return res.status(200).json({
//       success: true,
//       message: "Update class success",
//     });
//   } catch (error: any) {
//     return res.status(500).json({
//       success: false,
//       error: error.message,
//     });
//   }
// };

// export const deleteClassHandler = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;

//     const classData = await Class.findOne({
//       _id: id,
//       deletedAt: undefined,
//     });

//     if (!classData) {
//       return res.status(404).json({
//         success: false,
//         message: "Delete class failed, Id not found",
//       });
//     }

//     classData.deletedAt = new Date();
//     await classData.save();

//     return res.status(204).end();
//   } catch (error: any) {
//     return res.status(500).json({
//       success: false,
//       error: error.message,
//     });
//   }
// };

// export const getClassesHandler = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const datas = await Class.find({ deletedAt: undefined })
//       .populate("trainerDetails")
//       .sort({ createdAt: -1 })
//       .lean();
//     return res.status(200).json({
//       success: true,
//       message: "Get class success",
//       data: {
//         classes: datas,
//       },
//     });
//   } catch (error: any) {
//     return res.status(500).json({
//       success: false,
//       error: error.message,
//     });
//   }
// };

// export const getClassHandler = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { id } = req.params;

//     const classData = await Class.findOne({
//       _id: id,
//       deletedAt: undefined,
//     });

//     if (!classData) {
//       return res.status(404).json({
//         success: false,
//         message: "Get class failed, Id not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Get class success",
//       data: {
//         class: classData,
//       },
//     });
//   } catch (error: any) {
//     return res.status(500).json({
//       success: false,
//       error,
//     });
//   }
// };

// export default {
//   addClassHandler,
//   addClassValidationRules,
//   updateClassValidationRules,
//   updateClassHandler,
//   deleteClassHandler,
//   getClassesHandler,
//   getClassHandler,
// };
