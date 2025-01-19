import express from "express";
import {
  createEmployee,
  deleteEmployee,
  getAllEmployees,
  updateEmployee,
  getEmployee,
} from "../../controllers/employeesController.js";
import { USER_ROLES } from "../../config/roles_list.js";
import verifyRoles from "../../middleware/verifyRoles.js";

const employeesRouter = express.Router();

employeesRouter
  .route("/")
  .get(getAllEmployees)
  .post(verifyRoles(USER_ROLES.ADMIN, USER_ROLES.EDITOR), createEmployee)
  .put(verifyRoles(USER_ROLES.ADMIN, USER_ROLES.EDITOR), updateEmployee)
  .delete(verifyRoles(USER_ROLES.ADMIN), deleteEmployee);

employeesRouter.route("/:id").get(getEmployee);

export default employeesRouter;
