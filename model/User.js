import mongoose from "mongoose";
import { Schema } from "mongoose";
import { USER_ROLES } from "../config/roles_list.js";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  roles: {
    User: {
      type: Number,
      default: USER_ROLES.USER,
    },
    Editor: {
      type: Number,
    },
    Admin: {
      type: Number,
    },
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
  },
});

export default mongoose.model("user", userSchema);
