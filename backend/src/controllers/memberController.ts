import User from "../models/User";
import { body } from "express-validator";
import MemberDetail from "../models/MemberDetail";
import { NextFunction, Request, Response } from "express";
import { RequestAuth } from "../types/request";
export const getMembers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, active, gender } = req.query;

    const filter: {
      deletedAt: undefined;
      name?: any;
      gender?: string;
      role: string;
    } = {
      deletedAt: undefined,
      role: "member",
    };

    if (name) filter.name = { $regex: "^" + name };

    if (gender == "male") filter.gender = "male";
    else if (gender == "female") filter.gender = "female";

    const members = await User.find(filter)
      .populate({
        path: "membershipDetail",
        match: { expiresDate: { $gte: new Date() } },
      })
      .lean();
    let dataResponse = members;
    if (active != undefined) {
      if (active == "false" || active == "0") {
        dataResponse = dataResponse.filter(
          (x) => x.membershipDetail?.length == 0
        );
      } else if (active == "true" || active == "1") {
        dataResponse = dataResponse.filter(
          (x) => x.membershipDetail?.length != 0
        );
      }
    }
    return res.status(200).json({
      success: true,
      data: {
        members: dataResponse,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const getMember = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const member = await User.findOne({ _id: id, deletedAt: undefined })
      .populate("memberDetail")
      .populate("membershipDetail")
      .lean();

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Get member failed, Id not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        member,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const addMemberValidationRules = () => {
  return [
    body("name").exists().withMessage("name cannot be empty"),
    body("email")
      .exists()
      .withMessage("email cannot be empty")
      .isEmail()
      .withMessage("email is invalid")
      .normalizeEmail(),
    body("password")
      .exists()
      .withMessage("password cannot be empty")
      .isLength({ min: 6 })
      .trim(),
    body("dateOfBirth")
      .exists()
      .withMessage("Date of birth cannot be empty")
      .isDate()
      .withMessage("date is invalid"),
    body("gender")
      .exists()
      .withMessage("gender cannot be empty")
      .isIn(["male", "female"])
      .withMessage("gender must be betweeen male or female")
      .trim(),
    body("address").exists().withMessage("address cannot be empty"),
  ];
};

export const updateMemberValidationRules = () => {
  return [
    body("name").optional().trim(),
    body("email")
      .optional()
      .isEmail()
      .withMessage("email is invalid")
      .normalizeEmail(),
    body("password").optional().isLength({ min: 6 }).trim(),
    body("dateOfBirth").optional().isDate().withMessage("date is invalid"),
    body("gender")
      .optional()
      .isIn(["male", "female"])
      .withMessage("gender must be betweeen male or female")
      .trim(),
    body("address").optional(),
  ];
};

export const addMember = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password, dateOfBirth, gender, address } = req.body;

    const newMember = new User({
      name,
      email,
      password,
      dateOfBirth,
      gender,
      address,
      role: "member",
    });
    if (req.file != undefined) {
      newMember.image = req.file.path;
    }
    await newMember.save();
    return res.status(200).json({
      success: true,
      message: "Member has been saved",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const updateMember = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { name, email, password, dateOfBirth, gender, address } = req.body;

    const member = await User.findOne({
      _id: id,
      deletedAt: undefined,
      role: "member",
    });

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Update member failed, Id not found",
      });
    }
    if (name != undefined) {
      member.name = name;
    }
    if (email != undefined) member.email = email;
    if (password != undefined) member.password = password;
    if (dateOfBirth != undefined) member.dateOfBirth = dateOfBirth;
    if (gender != undefined) member.gender = gender;
    if (address != undefined) member.address = address;
    await member.save();
    return res.status(200).json({
      success: true,
      message: "Member has been updated",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const deleteMember = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const member = await User.findOne({
      _id: id,
      deletedAt: undefined,
      role: "member",
    });
    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Delete member failed, Id not found",
      });
    }

    member.deletedAt = new Date();
    await member.save();
    return res.status(204).end();
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const updateMyDetail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { weight, height, fat } = req.body;
    const user = (req as RequestAuth).user;
    let memberDetail = await MemberDetail.findOne({
      memberId: user._id,
      deletedAt: undefined,
    }).sort({ createdAt: -1 });

    if (!memberDetail) {
      const newData = new MemberDetail({ height, weight, fat });
      await newData.save();
    } else {
      if (weight) memberDetail.weight = weight;
      if (height) memberDetail.height = height;
      if (fat) memberDetail.fat = fat;
      const newData = new MemberDetail({
        weight: memberDetail.weight,
        height: memberDetail.height,
        fat: memberDetail.fat,
      });
      await newData.save();
    }

    return res.status(200).json({
      success: false,
      message: "update my detail success",
    });
  } catch (error: any) {
    return res.status(200).json({
      success: false,
      error: error.message,
    });
  }
};

export const deleteMyDetail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (req as RequestAuth).user;
    const { id } = req.params;
    const membershipDetail = await MemberDetail.findOne({
      _id: id,
      deletedAt: undefined,
    });

    if (!membershipDetail) {
      return res.status(404).json({
        success: false,
        message: "delete member detail failed, Id not found",
      });
    }

    if (membershipDetail.memberId != user._id) {
      return res.status(403).json({
        success: false,
        message: "You cannot delete other member data",
      });
    }

    membershipDetail.deletedAt = new Date();
    await membershipDetail.save();
    return res.status(204).end();
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default {
  getMembers,
  getMember,
  addMember,
  addMemberValidationRules,
  updateMember,
  updateMemberValidationRules,
  deleteMember,
  deleteMyDetail,
  updateMyDetail,
};
