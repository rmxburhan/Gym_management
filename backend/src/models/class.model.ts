import { model, Schema, Types } from "mongoose";

export interface IClass extends Document {
  name: string;
  description: string;
  trainer: Types.ObjectId;
  maxParticipant: number;
  participants: [Types.ObjectId];
  date: Date;
  deletedAt?: Date;
}

const classSchema = new Schema<IClass>(
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
    maxParticipant: {
      type: Number,
      required: true,
    },
    participants: {
      type: [Types.ObjectId],
      ref: "User",
      default: [],
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
