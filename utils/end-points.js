import axios from "axios";
import { app } from "./config";

export const end_points = {
  regsiter: "/auth/register",
  change_password: "/auth/change-password",
  profile: "/auth/profile",
  forgot_password: "/auth/forgot-password",
  upload_single: "/upload/single",
  reset_password: "/auth/reset-password/",
  users: "/users",
  users_add: "/users/add",
  users_single: "/users/",
};

export const backendCall = axios.create({
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: app.appUrl + "/api",
});
