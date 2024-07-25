import { Document, model, Schema, Types } from "mongoose";

export interface IEquipmentLog extends Document {
  equipmentId: Types.ObjectId;
  adminId: Types.ObjectId;
  description: string;
  category: string;
  qty: number;
}

const equipmentLogSchema = new Schema<IEquipmentLog>(
  {
    equipmentId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Equipment",
    },
    adminId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["maintenance", "return", "sell", "buy"],
    },
    qty: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);

const EquipmentLog = model("EquipmentLog", equipmentLogSchema);
export default EquipmentLog;
