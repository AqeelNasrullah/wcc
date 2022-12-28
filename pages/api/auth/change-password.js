import User from "models/user";
import { hashPassword, verifyPassword } from "utils/helpers";
import { authVerify } from "utils/middlewares";
import changePasswordRouter from "utils/serverRouter";

changePasswordRouter.post(authVerify, async (req, res, next) => {
  const { old_password, new_password } = req.body;
  try {
    const user = await User.findById(req.session.id);
    if (user) {
      const verify = await verifyPassword(user.password, old_password);
      if (verify) {
        const password = await hashPassword(new_password);
        await user.update({ password });
        res.status(200).json({ message: "Password changed successfully." });
      } else {
        res.status(400).json({ message: "Old password is incorrect." });
      }
    }
  } catch (error) {
    console.log("api > auth > change-password Error: ", error);
    next(error);
  }
});

export default changePasswordRouter;
