import User from "models/user";
import { authVerify, verifyEndPoint } from "utils/middlewares";
import profileHandler from "utils/serverRouter";

profileHandler.get(authVerify, async (req, res, next) => {
  try {
    const user = await User.findById(req?.session?.id);
    res.status(200).json(user);
  } catch (error) {
    console.log("Auth/Profile Error: ", error);
    next(error);
  }
});

profileHandler.put(authVerify, async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req?.session?.id,
      { ...req.body },
      { new: true }
    );
    res.status(200).json(user);
  } catch (error) {
    console.log("api > auth > profile | PUT | Error: ", error);
    next(error);
  }
});

export default profileHandler;
