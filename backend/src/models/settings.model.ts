import { Schema, model } from "mongoose";

export interface ISettings extends Document {
  app_name: string;
  logo: string;
  lat: string;
  lng: string;
  timezone: string;
}

export const settingsSchema = new Schema<ISettings>(
  {
    app_name: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
    lat: {
      type: String,
      required: true,
    },
    lng: {
      type: String,
      required: true,
    },
    timezone: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

const Settings = model<ISettings>("Settings", settingsSchema);
export default Settings;
