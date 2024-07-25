import { model, Schema } from "mongoose";

export interface IAttendanceCode extends Document {
  code: string;
  expiresIn: Date;
  createdIn: Date;
}

const attendanceCodeSchema = new Schema<IAttendanceCode>(
  {
    code: {
      type: String,
      required: true,
    },
    expiresIn: {
      type: Date,
      required: true,
    },
    createdIn: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const AttendanceCode = model("AttendanceCode", attendanceCodeSchema);

export default AttendanceCode;
