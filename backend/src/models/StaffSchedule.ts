import { model, Schema, Types } from "mongoose";

export interface IStaffSchedule extends Document {
  staffId: Types.ObjectId;
  timeStart: number;
  timeEnd: number;
  day: [number];
  deletedAt?: Date;
}

const staffScheduleSchema = new Schema<IStaffSchedule>(
  {
    staffId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    timeStart: {
      type: Number,
      required: true,
    },
    timeEnd: {
      type: Number,
      required: true,
    },
    day: {
      type: [Number],
      default: [],
    },
    deletedAt: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true }
);

const StaffSchedule = model("StaffSchedule", staffScheduleSchema);

export default StaffSchedule;
