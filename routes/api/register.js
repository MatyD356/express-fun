import express from "express";
import { handleNewUser } from "../../controllers/registerController.js";

const registerRouter = express.Router();

registerRouter.route("/").post(handleNewUser);

export default registerRouter;
