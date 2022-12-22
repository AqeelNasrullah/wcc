import axios from "axios";

const servers = {
  dev: "http://localhost:3000/api",
  staging: "",
  production: "",
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
