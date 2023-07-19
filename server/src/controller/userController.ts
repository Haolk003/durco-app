import { NextFunction, Request, Response } from "express";
import userService from "../service/userService";
import { userSuc } from "../utils/responseMessage";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body;
  try {
    const newUser = await userService.createUser(data);
    res
      .status(200)
      .json({ status: 200, data: newUser, message: userSuc.SUC_1 });
  } catch (err) {
    next(err);
  }
};
export const getAllUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userService.getAllUser();
    res.status(200).json({ status: 200, data: users, message: userSuc.SUC_2 });
  } catch (err) {
    next(err);
  }
};
export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const user = await userService.getUserById(id);
    res
      .status(200)
      .json({ status: 200, data: userService, message: userSuc.SUC_3 });
  } catch (err) {
    next(err);
  }
};
export const updateUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body;
  const { id } = req.params;
  try {
    const user = await userService.updateUserById(id, data);
    res.status(200).json({ status: 200, data: user, message: userSuc.SUC_4 });
  } catch (err) {
    next(err);
  }
};
export const deleteUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const user = await userService.deleteUserById(id);
    res.status(200).json({ status: 200, data: user, message: userSuc.SUC_5 });
  } catch (err) {
    next(err);
  }
};
