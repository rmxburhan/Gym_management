import { Schema, model } from "mongoose";

export interface IStaff extends Document {}

export const staffSchema = new Schema<IStaff>({});
