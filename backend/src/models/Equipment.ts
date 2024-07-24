import { model, Schema } from "mongoose";

export interface IEquipment extends Document {
  name: string;
  qty: number;
  image?: string;
  deletedAt?: Date;
}

const equipmentSchema = new Schema<IEquipment>(
  {
    name: {
      type: String,
      required: true,
    },
    qty: {
      type: Number,
      required: true,
      default: 0,
    },
    image: {
      type: String,
      required: false,
    },
    deletedAt: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true }
);

equipmentSchema.virtual("equipmentLogs", {
  ref: "EquipmentLog",
  localField: "_id",
  foreignField: "equipmentId",
});

const Equipment = model("Equipment", equipmentSchema);

export default Equipment;
