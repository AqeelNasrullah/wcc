import { getSession } from "next-auth/react";

export const verifyEndPoint = async (req) => {
  const session = await getSession({ req });

  if (!session) {
    return { status: false, message: "Unauthorized" };
  }

  return { status: true, session };
};
