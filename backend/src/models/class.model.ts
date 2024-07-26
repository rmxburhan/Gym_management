import { model, Schema, Types } from "mongoose";

export interface IClassSchema extends Document {
  name: string;
  description: string;
  trainer: Types.ObjectId;
  date: Date;
  deletedAt?: Date;
}

const classSchema = new Schema<IClassSchema>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    trainer: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    date: {
      type: Date,
      required: true,
    },
    deletedAt: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

classSchema.virtual("trainerDetail", {
  ref: "User",
  localField: "trainer",
  foreignField: "_id",
});

const Class = model("Class", classSchema);
export default Class;
