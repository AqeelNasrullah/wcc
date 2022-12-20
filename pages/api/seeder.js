import User from "models/user";
import "utils/db";
import { hashPassword } from "utils/helpers";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const data = {
      name: "WCC Admin",
      username: "admin",
      email: "admin@wcc.com",
      password: "password",
      isAdmin: true,
    };
    data.password = await hashPassword(data.password);
    const user = await User.findOne({ username: data.username });
    if (user) {
      res.status(200).json({ message: "Admin already exists." });
    } else {
      const result = await User.create(data);
      if (result) {
        res.status(200).json({ message: "Admin added successfully." });
      }
    }
  } else {
    res.status(404).json({ message: "Route not found" });
  }
};

export default handler;
