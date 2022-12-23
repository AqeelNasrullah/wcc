import nc from "next-connect";

const handler = nc({
  onError: (err, req, res, next) => {
    console.log("Internal Server Error: ", err);
    res.status(500).json({ message: "Internal server error." });
  },
  onNoMatch: (req, res) => {
    res.status(200).json({ message: "Route Not found." });
  },
}).all((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

export default handler;
