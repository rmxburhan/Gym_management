import { model, Schema, Types } from "mongoose";

export interface IEmployeeDetail extends Document {
  employeeId: Types.ObjectId;
  employeeType: string;
  status: string;
  workSchedule: string;
}

const employeeDetailSchema = new Schema(
  {
    employeeId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    employeeType: {
      type: String,
      enum: ["trainer", "staff"],
    },
    status: {
      type: String,
      required: true,
      enum: ["active", "resign"],
    },
    workSchedule: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const EmployeeDetail = model("EmployeeDetail", employeeDetailSchema);

export default EmployeeDetail;
