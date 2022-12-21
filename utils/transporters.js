import nodemailer from "nodemailer";
import { mail } from "./config";

export const transporter = nodemailer.createTransport({
  service: mail.service, // optional
  port: mail.port,
  host: mail.host,
  auth: {
    user: mail.username,
    pass: mail.password,
  },
  secure: true,
});
