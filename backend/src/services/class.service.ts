import { Types } from "mongoose";
import Class from "../models/class.model";
import dayjs from "dayjs";

export const addClass = async (
  name: string,
  description: string,
  trainer: string,
  date: Date
) =>
  await Class.create({
    name,
    description,
    trainer,
    date,
  });

export const updateClass = async (
  id: string,
  name?: string,
  description?: string,
  trainer?: string,
  date?: string
) => {
  const classData = await Class.findOne({ _id: id, deletedAt: undefined });

  if (!classData) {
    const error = new Error("Class not found");
    error.name = "NotFound";
    throw error;
  }

  if (name) classData.name = name;
  if (description) classData.description = description;
  if (trainer) classData.trainer = new Types.ObjectId(trainer);
  if (date) classData.date = new Date(date);
  return await classData.save();
};

export const deleteClass = async (id: string) => {
  const classData = await Class.findOne({ _id: id, deletedAt: undefined });
  if (!classData) {
    const error = new Error("Delete class failed. Id not found");
    error.name = "NotFound";
    throw error;
  }
  classData.deletedAt = dayjs().toDate();
  return await classData.save();
};

export const getClass = async (id: string) =>
  await Class.findOne({ _id: id, deletedAt: undefined }).populate(
    "trainer",
    "name profile"
  );

export const getClasses = async () =>
  await Class.find({ deletedAt: undefined }).populate({
    path: "trainer",
    select: "name profile id",
  });

export default {
  addClass,
  updateClass,
  deleteClass,
  getClass,
  getClasses,
};
