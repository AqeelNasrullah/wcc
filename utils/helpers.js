import bcrypt from "bcryptjs";

export const hashPassword = async (pass) => {
  const hashedPassword = await bcrypt.hash(pass, 12);
  return hashedPassword;
};

export const verifyPassword = async (hashed, pass) => {
  const verify = await bcrypt.compare(pass, hashed);
  return verify;
};
