import { Types } from "mongoose";
import Class, { IClass } from "../models/class.model";
import dayjs from "dayjs";

export const addClass = async (
  name: string,
  description: string,
  trainer: string,
  date: Date,
  maxParticipant: number
) =>
  await Class.create({
    name,
    description,
    trainer,
    date,
    maxParticipant,
  });

export const updateClass = async (
  id: string,
  name?: string,
  description?: string,
  trainer?: string,
  date?: string,
  maxParticipant?: number
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
  if (maxParticipant) classData.maxParticipant = maxParticipant;
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
  await Class.findOne({ _id: id, deletedAt: undefined }).populate([
    { path: "trainer", select: "name profile" },
    { path: "participants", select: "name profile" },
  ]);

export const getClasses = async () =>
  await Class.find({ deletedAt: undefined }).populate({
    path: "trainer",
    select: "name profile id",
  });

export const getUpcomingClasses = async () => {
  return await Class.find({
    deletedAt: undefined,
    date: { $gte: dayjs().toDate() },
  })
    .select("name description date trainer")
    .sort({
      date: 1,
    })
    .populate({
      path: "trainer",
      select: "name profile id",
    });
};

export const registerClass = async (
  id: string,
  memberId: string
): Promise<IClass> => {
  const classData = await Class.findOne({ _id: id, deletedAt: undefined });
  if (!classData) {
    const error = new Error("Class not found");
    error.name = "NotFound";
    throw error;
  }

  if (classData.participants.includes(new Types.ObjectId(memberId))) {
    const error = new Error("You already registered");
    error.name = "BadRequest";
    throw error;
  }

  if (new Date(classData.date) < new Date()) {
    const error = new Error("You cannot register this class");
    error.name = "BadRequest";
    throw error;
  }

  if (classData.maxParticipant <= classData.participants.length) {
    const error = new Error("You cannot participate in this class. full");
    error.name = "BadRequest";
    throw error;
  }

  classData.participants.push(new Types.ObjectId(memberId));
  return await classData.save();
};

export const unregisterClass = async (classId: string, memberId: string) => {
  const classData = await Class.findOne({ _id: classId, deletedAt: undefined });
  if (!classData) {
    const error = new Error("Cancel class failed. id not found");
    error.name = "NotFound";
    throw error;
  }

  if (!classData.participants.includes(new Types.ObjectId(memberId))) {
    const error = new Error("You are not participating in the class");
    error.name = "BadRequest";
    throw error;
  }

  return await Class.findByIdAndUpdate(classData.id, {
    $pull: { participant: new Types.ObjectId(memberId) },
  });
};

export default {
  addClass,
  updateClass,
  deleteClass,
  getClass,
  getClasses,
  getUpcomingClasses,
  registerClass,
  unregisterClass,
};
