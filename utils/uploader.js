import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const extList = file.originalname.split(".");
    const ext = extList[extList.length - 1];
    if (
      ["png", "jpg", "jpeg", "gif", "PNG", "JPG", "JPEG", "GIF"].includes(ext)
    ) {
      cb(null, true);
    } else {
      cb(
        new Error("Only png, jpg, jpeg and gif file types are allowed"),
        false
      );
    }
  },
});

export default upload;
