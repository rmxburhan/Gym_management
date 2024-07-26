import { existsSync, unlinkSync } from "fs";
import Equipment from "../models/equipment.model";
import path from "path";
import EquipmentLog from "../models/equipment.log.model";
import { NextFunction } from "express";

export const getEquipments = async () =>
  await Equipment.find().sort({ createdAt: -1 });

export const getEquipment = async (id: string) =>
  await Equipment.findById(id)
    .sort({ createdAt: -1 })
    .populate({
      path: "log",
      populate: [{ path: "adminDetail", select: "name profile" }],
    });

export const addEquipment = async (
  name: string,
  qty: number,
  image?: Express.Multer.File
) => {
  const equipment = new Equipment({
    name,
    qty,
    image: image?.path.split("public/")[1],
  });

  return await equipment.save();
};

export const updateEquipment = async (
  id: string,
  name?: string,
  qty?: number,
  image?: Express.Multer.File
) => {
  const equipment = await Equipment.findById(id);
  if (!equipment) {
    const error = new Error("Equipment not found");
    error.name = "NotFound";
    throw error;
  }

  if (name) equipment.name = name;
  if (qty) equipment.qty = qty;
  if (image) equipment.image = image.path.split("public/")[1];

  return equipment.save();
};

export const deleteEquipment = async (id: string) => {
  const equipment = await Equipment.findById(id);
  if (!equipment) {
    const error = new Error("Equipment not found");
    error.name = "NotFound";
    throw error;
  }

  if (equipment.image) {
    existsSync(path.join(process.cwd(), equipment.image || ""))
      ? unlinkSync(path.join(process.cwd(), equipment.image))
      : undefined;
  }
  await EquipmentLog.deleteMany({ equipment: equipment.id });
  return await Equipment.findByIdAndDelete(equipment.id);
};

export const addLog = async (
  id: string,
  adminId: string,
  category: string,
  description: string
) => {
  const equipment = await Equipment.findById(id);
  if (!equipment) {
    const error = new Error("Add log failed. Id not found");
    error.name = "NotFound";
    throw error;
  }

  return await EquipmentLog.create({
    category,
    description,
    admin: adminId,
    equipment: id,
  });
};

export const getLog = async (id: string) =>
  await EquipmentLog.findById(id)
    .populate({ path: "adminDetail", select: "name profile" })
    .populate("equipmentDetail", "name image");

export const getLogs = async (query?: { equipmentId?: string }) => {
  const filter: { equipment?: string } = {};

  if (query?.equipmentId) filter.equipment = query.equipmentId;
  return await EquipmentLog.find(filter)
    .sort({ createdAt: -1 })
    .populate({ path: "adminDetail", select: "name profile" })
    .populate("equipmentDetail", "name image");
};

export default {
  getEquipments,
  getEquipment,
  addEquipment,
  updateEquipment,
  deleteEquipment,
  addLog,
  getLog,
  getLogs,
};
