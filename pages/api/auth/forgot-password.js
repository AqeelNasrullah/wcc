import { transporter } from "utils/transporters";
import forgotPasswordHandler from "utils/serverRouter";
import { forgotPassword } from "utils/mailTemplates";
import { randomString } from "utils/helpers";
import ForgotPassword from "models/forgotPassword";
import User from "models/user";
import { app, mail } from "utils/config";
import "utils/db";

forgotPasswordHandler.post(async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = randomString(15);
      const dt = new Date();
      dt.setHours(dt.getHours() + 1);
      await ForgotPassword.create({
        userId: user._id,
        email: user.email,
        token,
        expiry: dt,
      });

      const link = app.appUrl + "/reset-password/" + token;

      transporter.sendMail(
        {
          from: `WCC Security <${mail.username}>`,
          to: user.email,
          subject: "Reset Password",
          html: forgotPassword(link),
          text: "Use this link to reset password: " + link,
        },
        (err, info) => {
          if (err) {
            console.log(
              "api > auth > forgot-password > Send Mail Error: ",
              err
            );
          }
          if (info) {
            console.log(
              "api > auth > forgot-password > Send Mail Success: ",
              info
            );
          }
        }
      );

      res.status(200).json({
        message: "Email sent. Follow instructions to reset password.",
      });
    } else {
      res.status(400).json({ message: "Email not registered." });
    }
  } catch (error) {
    console.log("api > auth > forgot-password Error: ", error);
    next(error);
  }
});

export default forgotPasswordHandler;
