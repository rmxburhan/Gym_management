import { Router } from "express";

import {
  registerHandler,
  registerValidationRules,
  loginHandler,
  loginValidationRules,
} from "../controllers/authController";
import validate from "../utils/validationRules";
const route = Router();

route.post("/login", loginValidationRules(), validate, loginHandler);
route.post("/register", registerValidationRules(), validate, registerHandler);

export default route;
