import User from "models/user";
import "utils/db";
import { hashPassword } from "utils/helpers";
import { authVerify } from "utils/middlewares";
import addUserHandler from "utils/serverRouter";

addUserHandler.post(authVerify, async (req, res, next) => {
  try {
    const user = await User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    });

    if (user) {
      res.status(409).json({ message: "Username or Email is already in use." });
    } else {
      req.body.password = await hashPassword(req.body.password);
      await User.create(req.body);
      res.status(200).json({ message: "User added successfully." });
    }
  } catch (error) {
    console.log("api > users > add Error: ", error);
    next(error);
  }
});

export default addUserHandler;
