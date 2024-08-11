import { Schema, Types, model } from "mongoose";

export interface IAnnouncement extends Document {
  title: string;
  attachments: string[];
  admin: Types.ObjectId;
}

export const announcementSchema = new Schema<IAnnouncement>(
  {
    title: {
      type: String,
      required: true,
    },
    attachments: {
      type: [String],
      required: false,
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__vl;
      },
      virtuals: true,
    },
  }
);

const Announcement = model<IAnnouncement>("Announcement", announcementSchema);
export default Announcement;