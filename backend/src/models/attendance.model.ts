import { model, Schema, Types } from "mongoose";

export interface IAttendance extends Document {
  userId: Types.ObjectId;
  checkInTime: Date;
  checkOutTime: Date;
}

const attendanceSchema = new Schema<IAttendance>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    checkInTime: {
      type: Date,
      required: true,
    },
    checkOutTime: {
 type: Date,
      required: false,
    },
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

attendanceSchema.virtual("member", {
  ref: "User",
  localField: "userId",
  foreignField: "_id",
});

const Attendance = model("Attendance", attendanceSchema);
export default Attendance;
