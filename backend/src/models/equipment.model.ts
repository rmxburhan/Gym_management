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
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
    toObject: {
      virtuals: true,
    },
  }
);

equipmentSchema.virtual("log", {
  ref: "EquipmentLog",
  localField: "_id",
  foreignField: "equipment",
});

const Equipment = model("Equipment", equipmentSchema);
export default Equipment;
