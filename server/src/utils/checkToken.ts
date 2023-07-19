import jwt from "jsonwebtoken";
import createError from "./createError";

const checkToken = async (token: string) => {
  const user = await jwt.verify(token, `${process.env.JWT_KEY}`);
  if (!user) {
    throw createError(500, "refeshToken has expired");
  }

  return user;
};
export default checkToken;
