import { configDotenv } from "dotenv";
configDotenv();

import express from "express";
import path from "path";
import { logger } from "./middleware/logEvents.js";
import cors from "cors";
import errorHandler from "./middleware/errorHandler.js";
import { fileURLToPath } from "url";
import rootRouter from "./routes/root.js";
import employeesRouter from "./routes/api/employees.js";
import { corsOptions } from "./config/corsOptions.js";
import registerRouter from "./routes/api/register.js";
import authRouter from "./routes/api/auth.js";
import verifyJWT from "./middleware/verifyJWT.js";
import cookieParser from "cookie-parser";
import refreshTokenRouter from "./routes/api/refresh.js";
import logoutRouter from "./routes/api/logout.js";
import credentials from "./middleware/credentials.js";
import mongoose from "mongoose";
import connectDB from "./config/dbConnection.js";

connectDB();

const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(credentials);

app.use(logger);

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

app.use("/", rootRouter);
app.use("/register", registerRouter);
app.use("/auth", authRouter);
app.use("/refresh", refreshTokenRouter);
app.use("/logout", logoutRouter);
app.use(verifyJWT);
app.use("/employees", employeesRouter);

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  }
  if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  }
  res.type("txt").send("404 Not Found");
});

app.use(errorHandler);

mongoose.connection.on("connected", () => console.log("connected to DB"));
mongoose.connection.on("open", () => console.log("Connection to Db is Open "));
mongoose.connection.on("disconnected", () =>
  console.log("disconnected from Db")
);
mongoose.connection.on("reconnected", () => console.log("reconnected to DB"));
mongoose.connection.on("disconnecting", () =>
  console.log("disconnecting from DB")
);
mongoose.connection.on("close", () => console.log("Connection to DB is close"));

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
