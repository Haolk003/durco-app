import { Request, Response, NextFunction } from "express";
import userService from "../service/authService";
import { authSuc } from "../utils/responseMessage";
import cookie from "cookie";
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { password, email, userName } = req.body;
  try {
    const user = await userService.register({ password, email, userName });
    res.status(200).json({ status: 200, data: user, message: authSuc.SUC_1 });
  } catch (err) {
    next(err);
  }
};
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userName, password } = req.body;
  try {
    const user = await userService.login({ userName, password }, res);
    res.status(200).json({ status: 200, data: user, message: authSuc.SUC_2 });
  } catch (err) {
    next(err);
  }
};
export const refeshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const refeshToken = req.cookies.refeshToken;
  try {
    await userService.handleRefeshToken(refeshToken, res);
    res.status(200).json({ status: 200, data: [], message: authSuc.SUC_3 });
  } catch (err) {
    next(err);
  }
};
export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  try {
    await userService.forgotPassword(email);
    res
      .status(200)
      .json({ status: 200, data: null, message: "Send email successs" });
  } catch (err) {
    next(err);
  }
};
export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, token } = req.params;
  const { newPassword } = req.body;
  try {
    const user = await userService.resetPassword(token, userId, newPassword);
    res.status(200).json({ status: 200, data: user, message: authSuc.SUC_4 });
  } catch (err) {
    next(err);
  }
};
export const checkTokenVefifyAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id, token } = req.params;
  try {
    const user = await userService.checkTokenVerifyEmail(id, token);
    res.status(200).json({ status: 200, data: user, message: authSuc.SUC_5 });
  } catch (err) {
    next(err);
  }
};
