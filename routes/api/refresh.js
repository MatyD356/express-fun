import express from "express";
import { handleRefresh } from "../../controllers/refreshTokenController.js";

const refreshTokenRouter = express.Router();

refreshTokenRouter.route("/").get(handleRefresh);

export default refreshTokenRouter;
