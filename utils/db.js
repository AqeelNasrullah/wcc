import mongoose from "mongoose";
import { db } from "./config";

mongoose.set("strictQuery", false);

mongoose
  .connect(`${db.protocol}://${db.host}:${db.port}/${db.name}`)
  .then((resp) => console.log(`Connected with "${resp.connection.host}"`))
  .catch((err) => console.log("Mongoose Error: ", err));
