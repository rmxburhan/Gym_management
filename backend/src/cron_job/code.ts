import cron from "node-cron";
import AttendanceCode from "../models/attendancecode.model";
import { addDays } from "date-fns";

const insertCodeAttendance = async () => {
  const code = await AttendanceCode.findOne({
    expiresIn: { $gte: new Date() },
  });
  if (!code) {
    const newCode = new AttendanceCode({
      code: generateRandomCode(),
      createdIn: new Date(),
      expiresIn: addDays(new Date().setHours(0, 0, 0, 0), 1),
    });
    await newCode.save();
  }
};

const generateRandomCode = (): string => {
  const raw = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";
  const charactersLength = raw.length;
  for (let i = 0; i < 6; i++) {
    result += raw.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export default () => {
  insertCodeAttendance();
  cron.schedule("0 0 * * *", () => {
    console.log("running cron job : insert code attendance");
    insertCodeAttendance();
  });
};
