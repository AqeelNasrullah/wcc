import singleUploadHandler from "utils/serverRouter";
import { authVerify } from "utils/middlewares";

singleUploadHandler.post(authVerify, (req, res) => {
  res.status(200).json({ message: "working." });
});

export default singleUploadHandler;
