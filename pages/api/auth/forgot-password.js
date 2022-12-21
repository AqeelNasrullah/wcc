import { transporter } from "utils/transporters";

const handler = (req, res) => {
  transporter.sendMail(
    {
      from: "WCC Admin <service@wcc.com>",
      to: "stopthefake.fr@gmail.com",
      subject: "Reset Password Request",
      text: "Ok this is it.",
    },
    (err, info) => {
      if (err) {
        res.status(400).json(err);
      }
      if (info) {
        res.status(200).json(info);
      }
    }
  );
};

export default handler;
