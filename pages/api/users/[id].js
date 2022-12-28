import "utils/db";
import User from "models/user";
import singleUserRouter from "utils/serverRouter";
import { authVerify } from "utils/middlewares";

singleUserRouter.get(authVerify, async (req, res, next) => {
  const id = req.query.id;

  try {
    const user = await User.findById(id);
    delete user?._doc.password;
    res.status(200).json(user);
  } catch (error) {
    console.log("api > users > [id] Error: ", error);
    next(error);
  }
});

export default singleUserRouter;
