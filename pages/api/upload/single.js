import singleUploadHandler from "utils/serverRouter";
import { authVerify } from "utils/middlewares";
import upload from "utils/uploader";

singleUploadHandler.post(authVerify, upload.single("file"), (req, res) => {
  res.status(200).json(req.file);
});

export default singleUploadHandler;

export const config = {
  api: {
    bodyParser: false,
  },
};
