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
      required: false,
    },
    lat: {
      type: String,
      required: false,
    },
    lng: {
      type: String,
      required: false,
    },
    timezone: {
      type: String,
      required: false,
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
