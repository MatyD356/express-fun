import express from "express";
import { handleLogout } from "../../controllers/logoutController.js";

const logoutRouter = express.Router();

logoutRouter.route("/").get(handleLogout);

export default logoutRouter;
