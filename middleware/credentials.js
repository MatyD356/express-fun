import { WHITE_LIST } from "../config/allowedOrigins.js";

const credentials = (req, res, next) => {
  const origin = req.headers.origin;
  if (WHITE_LIST.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  next();
};

export default credentials;
