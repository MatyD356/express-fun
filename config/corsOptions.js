import { WHITE_LIST } from "./allowedOrigins.js";

export const corsOptions = {
  origin: (origin, callback) => {
    console.log(origin);
    if (WHITE_LIST.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};
