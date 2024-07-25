import { model, Schema, Types } from "mongoose";

export interface IStaffAttendance extends Document {
  staffId: Types.ObjectId;
  checkInTime: number;
  lateTime: number;
  checkOutTIme: number;
  checkOutTime: number;
  deletedAt?: Date;
}

const staffAttendanceSchema = new Schema<IStaffAttendance>(
  {
    staffId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    checkInTime: {
      type: Number,
      required: true,
    },
    lateTime: {
      type: Number,
      required: true,
    },
    checkOutTime: {
      type: Number,
      required: false,
    },
    deletedAt: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true }
);

const StaffAttendance = model("StaffAttendance", staffAttendanceSchema);
export default StaffAttendance;
