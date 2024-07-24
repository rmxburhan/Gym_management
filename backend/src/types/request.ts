import { Request } from "express";
import { IUser } from "../models/User";

export interface RequestAuth extends Request {
  user: IUser;
}
