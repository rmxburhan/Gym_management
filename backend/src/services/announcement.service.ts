import { exists, existsSync, unlink, unlinkSync } from "fs";
import Announcement from "../models/announcements.model";
import path from "path";

export const getAnnouncements = async () => {
  return await Announcement.find().sort({ createdAt: -1 });
};

export const getAnnouncement = async (id: string) => {
  return await Announcement.findById(id);
};

export const postAnnouncement = async (
  title: string,
  images?: Express.Multer.File[]
) => {
  const newAnnouncement = new Announcement({
    title,
  });

  if (images) {
    newAnnouncement.attachments = images.map((x) => x.path.split("/public")[1]);
  }

  return await newAnnouncement.save();
};

export const updateAnnouncement = async (
  id: string,
  title?: string,
  files?: Express.Multer.File[]
) => {
  const announcement = await Announcement.findById(id);
  if (!announcement) {
    const error = new Error("Update announcement failed. Id not found");
    error.name = "NotFound";
    throw error;
  }

  if (title) announcement.title = title;
  if (files) {
    if (announcement.attachments.length > 0) {
      for (const filePath of announcement.attachments) {
        const fullPath = path.join(process.cwd(), filePath);
        if (existsSync(fullPath)) unlinkSync(fullPath);
      }
    }
    const filesPath = files.map((x) => x.path.split("/public")[1]);
    announcement.attachments = filesPath;
  }

  return await announcement.save();
};

export const deleteAnnouncement = async (id: string) =>
  await Announcement.findByIdAndDelete(id);

export default {
  getAnnouncements,
  getAnnouncement,
  postAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
};
