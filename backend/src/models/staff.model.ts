import { Schema, model } from "mongoose";

export interface IStaff extends Document {}

const staffSchema = new Schema<IStaff>({});
