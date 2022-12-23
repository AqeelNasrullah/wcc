import mongoose from "mongoose";
import { assets } from "utils/config";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    image: {
      type: String,
      default: assets.avatar,
      required: false,
    },
    name: {
      type: String,
      required: false,
      default: null,
    },
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: false,
      default: null,
    },
    verified: {
      type: Boolean,
      required: false,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
