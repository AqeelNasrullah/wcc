import User from "models/user";
import { verifyEndPoint } from "utils/middlewares";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const verified = await verifyEndPoint(req);

    if (!verified.status) {
      res.status(401).json({ message: "You are not authorized." });
    } else {
      try {
        const user = await User.findById(verified?.session?.id);
        res.status(200).json(user);
      } catch (error) {
        console.log("Auth/Profile Error: ", error);
      }
    }
  } else {
    res.status(400).json({ message: "Route not found." });
  }
};

export default handler;
