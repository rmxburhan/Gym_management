import { Document, model, Schema, Types } from "mongoose";

export interface IEquipmentLog extends Document {
  equipment: Types.ObjectId;
  admin: Types.ObjectId;
  description: string;
  category: string;
}

export const equipmentLogSchema = new Schema<IEquipmentLog>(
  {
    equipment: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Equipment",
    },
    admin: {
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
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);

equipmentLogSchema.virtual("adminDetail", {
  ref: "User",
  localField: "admin",
  foreignField: "_id",
});

equipmentLogSchema.virtual("equipmentDetail", {
  ref: "Equipment",
  localField: "equipment",
  foreignField: "_id",
});

const EquipmentLog = model("EquipmentLog", equipmentLogSchema);
export default EquipmentLog;
