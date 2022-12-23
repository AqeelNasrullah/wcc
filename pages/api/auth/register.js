import User from "models/user";
import { hashPassword } from "utils/helpers";
import profileHandler from "utils/serverRouter";

profileHandler.post(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    res.status(409).json({ message: "User already registered." });
  } else {
    req.body.password = await hashPassword(req.body.password);
    try {
      await User.create({
        username: req.body.email.split("@")[0],
        email: req.body.email,
        password: req.body.password,
      });
      res.status(200).json({
        message: "User registered successfully. Login to continue.",
      });
    } catch (error) {
      console.log("Register EndPoint Error: ", error);
      next(error);
    }
  }
});

export default profileHandler;
