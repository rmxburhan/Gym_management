import { NextFunction, Request, Response } from "express";
import Equipment from "../models/Equipment";
import EquipmentLog from "../models/EquipmentLog";
import { body } from "express-validator";
import fs from "fs";
import { RequestAuth } from "../types/request";
import path from "path";
export const addEquipmentValidationRules = () => {
  return [
    body("name")
      .exists()
      .withMessage("name cannot be empty")
      .isString()
      .withMessage("name must be a string"),
    body("qty")
      .exists()
      .withMessage("qty cannot be empty")
      .isInt()
      .withMessage("qty must be an integer"),
  ];
};

export const updateEquipmentValidationRules = () => {
  return [
    body("name").optional().isString().withMessage("name must be a string"),
    body("qty").optional().isInt().withMessage("qty must be an integer"),
  ];
};

export const getEquipments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.query;
    const filter: { name?: any; deletedAt: undefined } = {
      deletedAt: undefined,
    };
    if (name != undefined) {
      filter.name = { $regex: "^" + name };
    }
    const datas = await Equipment.find(filter);
    return res.status(200).json({
      success: true,
      data: {
        equipments: datas,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const getEquipment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { log } = req.query;
    const { id } = req.params;

    let equipment = await Equipment.findOne({
      _id: id,
      deletedAt: undefined,
    });
    if (!equipment) {
      return res.status(404).json({
        success: false,
        message: "Get equipment failed, Id not found",
      });
    }

    if (log == "true" || log == "1") {
      equipment = await Equipment.populate(equipment, {
        path: "equipmentLogs",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        equipment,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const addEquipment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, qty } = req.body;
    console.log(req.body);
    const data = new Equipment({
      name,
      qty,
    });
    console.log(req.file);
    if (req.file != undefined) {
      data.image = req.file.path.split("public")[1];
    }
    await data.save();

    return res.status(200).json({
      success: true,
      message: "Add equipment success",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const updateEquipment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, qty } = req.body;
    const { id } = req.params;

    const data = await Equipment.findOne({ _id: id, deletedAt: undefined });

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Update equipment failed, Id not found",
      });
    }
    if (name) data.name = name;
    if (qty) data.qty = qty;
    if (req.file != undefined && data.image) {
      if (fs.existsSync(path.join(process.cwd(), "public", data.image))) {
        fs.unlinkSync(path.join(process.cwd(), "public", data.image));
      }
      data.image = req.file.path;
    }

    await data.save();

    return res.status(200).json({
      success: true,
      message: "Update equipment successs",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const deleteEquipment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const equipment = await Equipment.findOne({
      _id: id,
      deletedAt: undefined,
    });

    if (!equipment) {
      return res.status(404).json({
        success: false,
        message: "Delete equipment failed. Id not found",
      });
    }
    equipment.deletedAt = new Date();
    await equipment.save();
    return res.status(204).end();
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const addLogEquipmentValidationRules = () => {
  return [
    body("description").exists().withMessage("description cannot be empty"),
    body("category")
      .exists()
      .withMessage("category cannot be empty")
      .isIn(["maintenance", "return", "sell", "buy"])
      .withMessage(
        "category can only contain maintenance, retur, sell and buy"
      ),
    body("qty").optional().isInt().withMessage("qty must be an integer"),
  ];
};

export const addLogEquipment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { description, category, qty } = req.body;
    const { id } = req.params;
    const newLog = new EquipmentLog({
      equipmentId: id,
      adminId: (req as RequestAuth).user._id,
      description: description,
      category,
      qty,
    });
    console.log(newLog);

    await newLog.save();

    return res.status(200).json({
      success: true,
      message: "Add log success",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const getEquipmentLogs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const logs = await EquipmentLog.find({ equipmentId: id }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      data: {
        equipmentLogs: logs,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const getLogs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { startDate, endDate } = req.query;
    const filterDate: { $gte?: any; $lte?: any } = {};
    const filter: { createdAt?: any } = {};
    if (startDate != undefined) {
      try {
        filterDate.$gte = new Date(startDate.toString()).setHours(0, 0, 0, 0);
        filter.createdAt = filterDate;
      } catch (error) {}
    }
    if (endDate != undefined) {
      try {
        filterDate["$lte"] = new Date(endDate.toString()).setHours(
          23,
          59,
          59,
          599
        );
        filter.createdAt = filterDate;
      } catch (error) {}
    }
    console.log(filter);
    const logs = await EquipmentLog.find(filter).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      data: {
        equipmentLogs: logs,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export default {
  getEquipment,
  getEquipments,
  getEquipmentLogs,
  addEquipment,
  addEquipmentValidationRules,
  addLogEquipment,
  addLogEquipmentValidationRules,
  updateEquipment,
  updateEquipmentValidationRules,
  deleteEquipment,
  getLogs,
};
