import { Router } from "express";
import {
  addEmployee,
  getAllEmployees,
  getDetailEmployee,
  updateEmployee,
  addEmployeeValidationRules,
  updateEmployeeValidationRules,
} from "../controllers/employeeController";

import validate from "../utils/validationRules";
const route = Router();

route.get("/", getAllEmployees);
route.post("/", addEmployeeValidationRules(), validate, addEmployee);
route.get("/:id", getDetailEmployee);
route.post("/:id", updateEmployeeValidationRules(), validate, updateEmployee);

export default route;
