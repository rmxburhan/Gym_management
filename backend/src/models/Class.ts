import { model, Schema, Types } from "mongoose";

export interface IClassSchema extends Document {
  name: string;
  description: string;
  trainerId: Types.ObjectId;
  date: Date;
  maxParticipant: number;
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
    trainerId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    date: {
      type: Date,
      required: true,
    },
    maxParticipant: {
      type: Number,
      required: true,
    },
    deletedAt: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

classSchema.virtual("trainerDetails", {
  ref: "User",
  localField: "trainerId",
  foreignField: "_id",
});

const Class = model("Class", classSchema);
export default Class;
