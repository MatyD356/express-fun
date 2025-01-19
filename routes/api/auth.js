import express from "express";
import { handleLogin } from "../../controllers/authControllet.js";

const authRouter = express.Router();

authRouter.route("/").post(handleLogin);

export default authRouter;
