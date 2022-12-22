import axios from "axios";
import { app } from "./config";

const servers = {
  dev: app.appUrlDev + "/api",
  staging: app.appUrlStaging + "/api",
  production: app.appUrlProduction + "/api",
};

export const end_points = {
  regsiter: "/auth/register",
};

export const backendCall = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: servers.dev,
});
