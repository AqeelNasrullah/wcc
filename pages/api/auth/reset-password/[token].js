import ForgotPassword from "models/forgotPassword";
import User from "models/user";
import { hashPassword } from "utils/helpers";
import resetPasswordRouter from "utils/serverRouter";

resetPasswordRouter.post(async (req, res, next) => {
  const token = req.query.token;

  try {
    const forgot_password = await ForgotPassword.findOne({ token });
    if (forgot_password.isExpired) {
      res.status(400).json({ message: "Link is expired." });
    } else {
      const dt = new Date();
      if (dt > forgot_password.expiry) {
        await ForgotPassword.updateMany(
          { email: forgot_password.email },
          { isExpired: true }
        );
        res.status(400).json({ message: "Link is expired." });
      } else {
        req.body.password = await hashPassword(req.body.password);
        await User.findOneAndUpdate(
          { email: forgot_password.email },
          { password: req.body.password }
        );
        await ForgotPassword.updateMany(
          { email: forgot_password.email },
          { isExpired: true }
        );
        res.status(200).json({ message: "Password changed successfully." });
      }
    }
  } catch (error) {
    console.log("api > auth > reset-password > next Error: ", error);
    next(error);
  }
});

export default resetPasswordRouter;
