import { getSession } from "next-auth/react";

export const authVerify = async (req, res, next) => {
  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ message: "You are not authorized." });
    return false;
  }

  req.session = session;

  next();
};
