import { Request } from "express";
import { IUser } from "../models/user.model";

export interface RequestAuth extends Request {
  user: IUser;
}
