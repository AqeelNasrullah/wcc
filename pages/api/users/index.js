import User from "models/user";
import { authVerify } from "utils/middlewares";
import usersRouter from "utils/serverRouter";
import "utils/db";
import { pagination } from "utils/config";

usersRouter.get(authVerify, async (req, res, next) => {
  try {
    const page = req.query.page || 1;

    const totalUsers = await User.find().countDocuments();
    const users = await User.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * pagination.length)
      .limit(pagination.length);
    const newUsers = [];

    for await (const usr of users) {
      delete usr._doc.password;
      newUsers.push(usr);
    }

    res.status(200).json({
      count: totalUsers,
      data: newUsers,
    });
  } catch (error) {
    console.log("api > users Error: ", error);
    next(error);
  }
});

export default usersRouter;
