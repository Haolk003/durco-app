import cookie from "cookie";
import CryptoJS from "crypto-js";

import userModel from "../models/userModel";
import cartModel from "../models/cartModel";
import tokenModel from "../models/tokenModel";
import { authError, authSuc } from "../utils/responseMessage";

import createError from "../utils/createError";
import createJwt from "../utils/createToken";
import { Response } from "express";
import checkToken from "../utils/checkToken";
import sendEmail from "../utils/sendEmail";
import { snakeCase } from "lodash";
import validateMongoId from "../validation/validateId";

interface registerProps {
  password: string;
  email: string;
  userName: string;
}
interface loginProps {
  userName: string;
  password: string;
}

const register = async (data: registerProps) => {
  const checkUser = await userModel.findOne({ userName: data.userName });
  if (checkUser) {
    throw createError(401, "username already exists");
  }
  const checkEmail = await userModel.findOne({ email: data.email });
  if (checkEmail) {
    throw createError(401, "Email already exists");
  }
  const newUser = await userModel.create(data);
  const newToken = await tokenModel.create({
    token: CryptoJS.lib.WordArray.random(64).toString(),
    userId: newUser._id,
  });
  const url = `${process.env.FRONTEND_HOST}/auth/verified/${newUser._id}/${newToken.token}`;
  await sendEmail({
    to: newUser.email,
    content: url,
    subject: "Verify Account",
  });
  return newUser;
};
const login = async (data: loginProps, res: Response) => {
  const user = await userModel.findOne({ userName: data.userName });
  if (!user) {
    throw createError(400, authError.ERR_1);
  }

  if (!user.isPasswordMatched(data.password)) {
    throw createError(400, authError.ERR_2);
  }

  const { accessToken, refeshToken } = await createJwt(
    `${user._id.toString()}`,
    user.role
  );
  const updateRefeshToken = await userModel.findByIdAndUpdate(
    user._id,
    { refeshToken: refeshToken },
    { new: true }
  );

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    maxAge: Date.now() + 60 * 60,
  });
  res.cookie("refeshToken", refeshToken, {
    httpOnly: true,
    maxAge: Date.now(),
  });

  return updateRefeshToken;
};
const handleRefeshToken = async (
  refeshToken: string | null | undefined,
  res: Response
) => {
  if (!refeshToken) {
    throw createError(400, authError.ERR_3);
  }
  const findUser = await userModel.findOne({ refeshToken: refeshToken });
  if (!findUser) throw createError(400, authError.ERR_4);
  const user = await checkToken(refeshToken);
  const { accessToken } = createJwt(findUser._id.toString(), findUser.role);
  res.setHeader("Set-Cookie", cookie.serialize("access-token", accessToken));
  return;
};
const forgotPassword = async (email: string) => {
  const checkEmail = await userModel.findOne({ email });
  if (!checkEmail) {
    throw createError(400, "Email is not exists");
  }

  const checkToken = await tokenModel.findOne({ userId: checkEmail._id });
  if (checkToken) {
    await tokenModel.findByIdAndDelete(checkToken._id);
  }
  const token = await tokenModel.create({
    token: CryptoJS.lib.WordArray.random(64).toString(),
    userId: checkEmail._id,
  });
  await sendEmail({
    to: email,
    subject: "Test",
    content: `${checkEmail._id}/${token.token}`,
  });
  return;
};
const resetPassword = async (
  token: string,
  userId: string,
  newPassword: string
) => {
  const checkToken = await tokenModel.findOne({ token, userId });
  if (!checkToken) {
    throw createError(401, authError.ERR_6);
  }
  const updatePassword = await tokenModel.findByIdAndUpdate(
    userId,
    { password: newPassword },
    { new: true }
  );
  await tokenModel.deleteOne({ _id: checkToken._id });
  return updatePassword;
};
const checkTokenVerifyEmail = async (userId: string, token: string) => {
  validateMongoId(userId);
  const findToken = await tokenModel.findOne({ userId: userId, token: token });
  if (!findToken) {
    throw createError(400, authError.ERR_7);
  }
  const updateUser = await userModel.findByIdAndUpdate(
    userId,
    { verify: true },
    { new: true }
  );
  if (!updateUser) {
    throw createError(400, authError.ERR_7);
  }
  await cartModel.create({ orderBy: userId });
  await tokenModel.deleteOne({ _id: findToken._id });
  return updateUser;
};

const userService = {
  register,
  login,
  handleRefeshToken,
  forgotPassword,
  resetPassword,

  checkTokenVerifyEmail,
};
export default userService;
